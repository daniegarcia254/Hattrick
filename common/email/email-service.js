'use strict'
var EmailTemplates = require('swig-email-templates');
var nodemailer = require('nodemailer');
var path = require('path');
var logger = require('../logger');
var config = require('../../server/server').get('email');

const mailUser = config.email;
const pwd = config.password;
const service = config.service;

var transporter = nodemailer.createTransport({
	service: service,
	pool: true,
	secure: true,
	auth: {
		user: mailUser,
		pass: pwd
	}
});

var templatePath = path.resolve(__dirname, 'templates');
var templates = new EmailTemplates({
  root: templatePath,
});

module.exports = {
	welcome: function(user, community){
		logger.info("Sending welcome email to user ", user.username);
		var emailSubject = 'Welcome to Hattrick';
		var context = {
		  username: user.username,
		  subject: emailSubject
		};

		templates.render('welcome.html', context, function(err, html, text, subject) {
			if (err) logger.error("Error render email template", err);
			else {
				transporter.sendMail({
		      from: mailUser,
		      to: user.email,
		      subject: 'Welcome to Hattrick',
		      html: html,
		      text: text
			  }, function(err){
			  	if (err) {
			  		logger.error("Error sending welcome email to " + user.username, err);
			  	}
			  });
			}
		});
	},

	resetPassword: function(user, key){
		logger.info("Sending email for reset password to user ", user.username);
		var emailSubject = 'Hattrick account: reset password';
		var context = {
		  username: user.username,
		  support_mail: mailUser,
		  subject: emailSubject,
		  url: config.host + '/hattrick/email/reset/reset_password.html?key=' + key
		};

		templates.render('reset.html', context, function(err, html, text, subject) {
			if (err) logger.error("Error render email template", err);
			else {
				transporter.sendMail({
		      from: mailUser,
		      to: user.email,
		      subject: 'Hattrick account: reset password',
		      html: html,
		      text: text
			  }, function(err){
			  	if (err) {
			  		logger.error("Error sending reset password email to " + user.username, err);
			  	}
			  });
			}
		});
	}
}
