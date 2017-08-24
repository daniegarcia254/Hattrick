'use strict';
var moment = require('moment-timezone');
var logger = require('../logger');

module.exports = function(Answer) {

	Answer.observe('before save', function(ctx, next){
		if (ctx.isNewInstance){
			ctx.instance.date = moment().tz('Europe/Madrid');
		}
		next();
	});


	//
	// ─── PROTECCION ─────────────────────────────────────────────────────────────────
	//
	Answer.disableRemoteMethodByName('find');
	Answer.disableRemoteMethodByName('findById');
	Answer.disableRemoteMethodByName('findOne');
	Answer.disableRemoteMethodByName('create');
	// ─────────────────────────────────────────────────────────────────
};
