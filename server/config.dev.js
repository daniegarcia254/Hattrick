'use strict'

var logger = require('../common/logger');

module.exports = {
  port: process.env.APP_PORT || 10000,
  crypto: {
    algorithm: process.env.CRYPTO_ALG,
    password: process.env.CRYPTO_PWD
  },
  email: {
    host: process.env.APP_HOST,
    email: process.env.EMAIL_USER,
    password: process.env.EMAIL_PWD,
    service: process.env.EMAIL_SERVICE,
  },
  remoting: {
    errorHandler: {
      handler: function(err, req, res, next) {
        // custom error handling logic
        logger.error("Error", err);
        next();
      }
    }
  }
};
