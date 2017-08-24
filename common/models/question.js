'use strict';
var moment = require('moment-timezone');
var logger = require('../logger');

module.exports = function(Question) {

	Question.observe('before save', function(ctx, next){
		if (ctx.isNewInstance){
			ctx.instance.date = moment().tz('Europe/Madrid');
		}
		next();
	});


	//
	// ─── PROTECCION ─────────────────────────────────────────────────────────────────
	//
	Question.disableRemoteMethodByName('findOne');
	// ─────────────────────────────────────────────────────────────────
};
