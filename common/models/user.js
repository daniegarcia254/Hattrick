'use strict';
var moment = require('moment-timezone');
var _ = require('underscore');
var crypto = require('crypto');
var logger = require('../logger');
var configCrypto = require('../../server/server').get('crypto');
var email = require('../email/email-service');

module.exports = function(User) {

	function createError(status, message, code) {
		var err = new Error(message);
		err.status = err.statusCode = status;
		err.name = code;
		err.description = message;
		return err;
	};

	function decrypt(text){
	  var decipher = crypto.createDecipher(configCrypto.algorithm,configCrypto.password);
	  var dec = decipher.update(text,'hex','utf8');
	  dec += decipher.final('utf8');
	  return dec;
	}

	User.observe('before save', function(ctx, next){
		if (ctx.isNewInstance) ctx.instance.created = moment().tz('Europe/Madrid');
		else ctx.currentInstance.update = moment().tz('Europe/Madrid');
		next();
	});

	User.observe('after save', function(ctx, next){
		if (ctx.isNewInstance) email.welcome(ctx.instance, null);
		next();
	});

	User.resetPassword = function(key, password, cb) {
		var ResetPasswordRequest = User.app.models.resetPasswordRequest;
		ResetPasswordRequest.find({where:{key: key}}, function(err, passwordRequest){
			if (err) cb(err);
			else if (!passwordRequest || passwordRequest.length===0) cb(createError(404, 'Key not found', 'KEY_NOT_FOUND'));
			else if (passwordRequest[0].used === true) cb(createError(422, 'Key already used', 'KEY_ALREADY_USED'));
			else {
				var diff = moment().tz('Europe/Madrid').diff(moment(passwordRequest[0].created).tz('Europe/Madrid'),'hours', true);
				if (diff > 24.0) cb(createError(422, 'Key has expired', 'KEY_EXPIRED'));
				else {
					User.findById(passwordRequest[0].userID, function(err,user){
						if (err) cb(err);
						if (!user) cb(createError(404, 'User not found', 'USER_NOT_FOUND'));
						else {
							User.beginTransaction({ isolationLevel: User.Transaction.SERIALIZABLE}, function (err, tx) {
								user.updateAttributes({password: password}, {transaction: tx}, function(err, userUpdated){
									if (err) tx.rollback(function(){cb(err);});
									else {
										passwordRequest[0].updateAttributes({used: true}, {transaction: tx}, function(err, requestUpdated){
											if (err) tx.rollback(function(){cb(err);});
											else tx.commit(function(){cb(err, userUpdated);});
										});
									}
								});
							});
						}
					});
				}
			}
		});
	};

	User.beforeRemote('prototype.__create__communities', function(ctx, _modelInstance_, next) {
		ctx.req.body.adminID = ctx.instance.id;
		next();
	});

	User.beforeRemote('prototype.__link__communities', function(ctx, _modelInstance_, next) {
		var Community = User.app.models.community,
			code = ctx.args.data.code;

		if (!code) return next(createError(422, 'Community code is required', 'COMMUNITY_CODE_REQUIRED'));

		Community.find({where:{code: code}}, function(err, communities){
			if (err) next(err);
			else if (!communities || communities.length===0){
				next(createError(404, 'Invalid community CODE', 'INVALID_COMMUNITY_CODE'));
			} else {
				var community = communities[0];
				if (community.type === Community.PRIVATE && !ctx.args.data.password) {
					next(createError(422, 'A password is needed to join a private community', 'PASSWORD_NEEDED'));
				} else {
					if (community.type === Community.PRIVATE){
						if (decrypt(community.password) !== ctx.args.data.password) {
							next(createError(422, 'The community password is incorrect', 'COMMUNITY_PASSWORD_INCORRECT'));
						} else {
							community.users(function(err, users){
								if (err) next(err);
								else {
									var userAlreadyExists = _.find(users, function(user){ return user.id===ctx.instance.id; });
									if (userAlreadyExists) {
										next(createError(422, 'User already belongs to the community', 'USER_ALREADY_EXISTS_ON_COMMUNITY'));
									} else {
										delete ctx.args.data.password;
										delete ctx.args.data.code;
										ctx.req.params.fk = ctx.args.fk = community.id;
										next();
									}
								}
							});
						}
					} else {
						community.users(function(err, users){
							if (err) next(err);
							else {
								var userAlreadyExists = _.find(users, function(user){ return user.id===ctx.instance.id; });
								if (userAlreadyExists) {
									next(createError(422, 'User already belongs to the community', 'USER_ALREADY_EXISTS_ON_COMMUNITY'));
								} else {
									delete ctx.args.data.code;
									ctx.req.params.fk = ctx.args.fk = community.id;
									next();
								}
							}
						});
					}
				}
			}
		});
	});

	User.beforeRemote('prototype.__create__comments', function(ctx, _modelInstance_, next) {
		var Community = User.app.models.community,
			communityID = ctx.args.data.communityID;

		Community.findById(communityID, {"include":["users"]}, function(err, community){
			if (err) next(err);
			else if (!community) next(createError(404, 'Community not found', 'COMMUNITY_NOT_FOUND'));
			else {
				var users = community.users();
				if (!users || users.length === 0) next(createError(422, 'User is not a memeber of the community', 'USER_NOT__COMMUNITY_MEMBER'));
				else {
					if (_.find(users, function(user){ return user.id === ctx.instance.id;})) {
						next();
					} else {
						next(createError(422, 'User is not a memeber of the community', 'USER_NOT__COMMUNITY_MEMBER'));
					}
				}
			}
		});
	});

	//
	// ─── PROTECCION ─────────────────────────────────────────────────────────────────
	//
	User.disableRemoteMethodByName('find');

	User.disableRemoteMethodByName('prototype.__count__accessTokens');
	User.disableRemoteMethodByName('prototype.__create__accessTokens');
	User.disableRemoteMethodByName('prototype.__delete__accessTokens');
	User.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
	User.disableRemoteMethodByName('prototype.__findById__accessTokens');
	User.disableRemoteMethodByName('prototype.__get__accessTokens');
	User.disableRemoteMethodByName('prototype.__updateById__accessTokens');

	User.disableRemoteMethodByName('prototype.__count__resetPasswordRequests');
	User.disableRemoteMethodByName('prototype.__create__resetPasswordRequests');
	User.disableRemoteMethodByName('prototype.__delete__resetPasswordRequests');
	User.disableRemoteMethodByName('prototype.__destroyById__resetPasswordRequests');
	User.disableRemoteMethodByName('prototype.__findById__resetPasswordRequests');
	User.disableRemoteMethodByName('prototype.__get__resetPasswordRequests');
	User.disableRemoteMethodByName('prototype.__updateById__resetPasswordRequests');

	User.disableRemoteMethodByName('prototype.__count__answers');
	User.disableRemoteMethodByName('prototype.__delete__answers');
	User.disableRemoteMethodByName('prototype.__destroyById__answers');
	User.disableRemoteMethodByName('prototype.__findById__answers');
	User.disableRemoteMethodByName('prototype.__updateById__answers');

	User.disableRemoteMethodByName('prototype.__count__comments');
	User.disableRemoteMethodByName('prototype.__delete__comments');
	User.disableRemoteMethodByName('prototype.__findById__comments');

	User.disableRemoteMethodByName('prototype.__count__communities');
	User.disableRemoteMethodByName('prototype.__delete__communities');
	User.disableRemoteMethodByName('prototype.__destroyById__communities');
	User.disableRemoteMethodByName('prototype.__findById__communities');
	User.disableRemoteMethodByName('prototype.__updateById__communities');
	// ─────────────────────────────────────────────────────────────────
};
