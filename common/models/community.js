'use strict';
var moment = require('moment-timezone');
var crypto = require('crypto');
var logger = require('../logger');
var configCrypto = require('../../server/server').get('crypto');

module.exports = function(Community) {

	Community.PUBLIC = 'PUBLIC';
	Community.PRIVATE = 'PRIVATE';
	var types = [Community.PUBLIC, Community.PRIVATE];

	Community.validatesInclusionOf('type', { in : types });

	function encrypt(text){
	  var cipher = crypto.createCipher(configCrypto.algorithm,configCrypto.password);
	  var crypted = cipher.update(text,'utf8','hex');
	  crypted += cipher.final('hex');
	  return crypted;
	}

	function generateCommunityCode(string) {
		// Returns the "FNV-1a" hash of a string.
		var prime = 16777619;
		var hash = 2166136261;
		var data = new Buffer(string)
		for (var i = 0; i < data.length; i++) {
			hash = hash ^ data[i];
			hash = hash * prime;
		}
		return (hash >>> 0).toString(16).toUpperCase();
	};

	function createError(status, message, code) {
		var err = new Error(message);
		err.status = err.statusCode = status;
		err.name = code;
		err.description = message;
		return err;
	};

	/*Community.createOptionsFromRemotingContext = function(ctx) {
	  var base = this.base.createOptionsFromRemotingContext(ctx);
	  return {currentUserId: base.accessToken && base.accessToken.userId};
	};*/

	Community.observe('before save', function(ctx, next){
		if (ctx.isNewInstance){
			ctx.instance.type = ctx.instance.type.toUpperCase();
			var Category = Community.app.models.category;
			Category.findById(ctx.instance.categoryID, function(err, cat){
				if (err) next(err);
				else if (!cat) next(createError(422,'Invalid category id','INVALID_CATEGORY_ID'));
				else {
					if (ctx.instance.type === Community.PRIVATE && !ctx.instance.password){
						next(createError(422,'Private community must have a password','PRIVATE_COMMUNITY_NEED_PASSWORD'));
					} else {
						if (ctx.instance.type === Community.PRIVATE) {
							ctx.instance.password = encrypt(ctx.instance.password);
						}
						ctx.instance.created = moment().tz('Europe/Madrid');
						ctx.instance.code = generateCommunityCode(new Date() + ctx.instance.name + ctx.instance.type);
						logger.info('CREATE NEW COMMUNITY', ctx.instance);
						next();
					}
				}
			});
		} else {
			console.log("ctx.instance", ctx.instance, ctx.data);
			next();
		}
	});

	//
	// ─── PROTECCION ─────────────────────────────────────────────────────────────────
	//
	Community.disableRemoteMethodByName('create');

	Community.disableRemoteMethodByName('prototype.__count__comments');
	Community.disableRemoteMethodByName('prototype.__create__comments');
	Community.disableRemoteMethodByName('prototype.__destroyById__comments');
	Community.disableRemoteMethodByName('prototype.__findById__comments');
	Community.disableRemoteMethodByName('prototype.__updateById__comments');

	Community.disableRemoteMethodByName('prototype.__count__users');
	Community.disableRemoteMethodByName('prototype.__create__users');
	Community.disableRemoteMethodByName('prototype.__delete__users');
	Community.disableRemoteMethodByName('prototype.__destroyById__users');
	Community.disableRemoteMethodByName('prototype.__findById__users');
	Community.disableRemoteMethodByName('prototype.__updateById__users');
	// ─────────────────────────────────────────────────────────────────
};
