'use strict';
var moment = require('moment-timezone');
var logger = require('../logger');

module.exports = function(Comment) {

	Comment.observe('before save', function(ctx, next){
		if (ctx.isNewInstance){
			ctx.instance.created = moment().tz('Europe/Madrid');
		}
		next();
	});


	//
	// ─── PROTECCION ─────────────────────────────────────────────────────────────────
	//
	Comment.disableRemoteMethodByName('find');
	Comment.disableRemoteMethodByName('findById');
	Comment.disableRemoteMethodByName('findOne');
	// ─────────────────────────────────────────────────────────────────
};
