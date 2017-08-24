'use strict';

var uuid = require('uuid');
var moment = require('moment-timezone');
var email = require('../email/email-service');

module.exports = function(ResetPasswordRequest) {

	function createError(status, message, code) {
		var err = new Error(message);
		err.status = err.statusCode = status;
		err.name = code;
		err.description = message;
		return err;
	};

	ResetPasswordRequest.observe('before save', function(ctx, next){
		if (ctx.isNewInstance){
			var User = ResetPasswordRequest.app.models.user;
			if (!ctx.instance.email || ctx.instance.email.length === 0) {
				next(createError(42, 'An email is required to generate a password reset', 'EMAIL_REQUIRED'));
			} else {
				User.find({where:{email:ctx.instance.email}}, function(err, user){
					if (err) next(err);
					else if (!user || user.length === 0) next(createError(404, 'User not found with the given email', 'USER_NOT_FOUND'));
					else {
						ctx.instance.userID = user[0].id;
						ctx.instance.key = uuid.v4();
						ctx.instance.created = moment().tz('Europe/Madrid');
						next();
					}
				});
			}
		} else {
			next();
		}
	});

	ResetPasswordRequest.observe('after save', function(ctx, next){
		if (ctx.isNewInstance){
			var User = ResetPasswordRequest.app.models.user;
			User.findById(ctx.instance.userID, function(err, user){
				email.resetPassword(user, ctx.instance.key);
				next();
			});
		} else {
			next();
		}
	});

	//
	// ─── PROTECCION ─────────────────────────────────────────────────────────────────
	//
	ResetPasswordRequest.disableRemoteMethodByName('find');
	ResetPasswordRequest.disableRemoteMethodByName('patchOrCreate');
	ResetPasswordRequest.disableRemoteMethodByName('find');
	ResetPasswordRequest.disableRemoteMethodByName('findOne');
	ResetPasswordRequest.disableRemoteMethodByName('findById');
	ResetPasswordRequest.disableRemoteMethodByName('delete');
	ResetPasswordRequest.disableRemoteMethodByName('destroyById');
	ResetPasswordRequest.disableRemoteMethodByName('updateById');
	ResetPasswordRequest.disableRemoteMethodByName('prototype.patchAttributes');
	ResetPasswordRequest.disableRemoteMethodByName('prototype.__get__user');
	// ─────────────────────────────────────────────────────────────────
};
