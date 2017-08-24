'use strict';
var moment = require('moment-timezone');

var logger = require('../logger');

module.exports = function(Category) {

	function createError(status, message, code) {
		var err = new Error(message);
		err.status = err.statusCode = status;
		err.name = code;
		err.description = message;
		return err;
	};

	Category.observe('before save', function(ctx, next){
		if (ctx.isNewInstance){
			ctx.instance.created = moment().tz('Europe/Madrid');
			next();
		} else {
			next();
		}
	});

	//
	// ─── PROTECCION ─────────────────────────────────────────────────────────────────
	//
	Category.disableRemoteMethodByName('prototype.__create__communities');
	Category.disableRemoteMethodByName('prototype.__delete__communities');
	Category.disableRemoteMethodByName('prototype.__destroyById__communities');
	Category.disableRemoteMethodByName('prototype.__findById__communities');
	Category.disableRemoteMethodByName('prototype.__updateById__communities');

	Category.disableRemoteMethodByName('prototype.__delete__questions');
	Category.disableRemoteMethodByName('prototype.__destroyById__questions');
	Category.disableRemoteMethodByName('prototype.__findById__questions');
	// ─────────────────────────────────────────────────────────────────
};
