'use strict'

var winston = require('winston');
var SyslogAin2 = require('winston-syslog-ain2').SyslogAin2;
winston.add(SyslogAin2, {});
var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)(),
    new(SyslogAin2)()
  ]
});

module.exports = {
  info: function (message, data) {
    logger.info(new Date(), 'message:', message, 'data:', data)
  },
  error: function (message, data) {
    logger.error(new Date(), 'message:', message, 'data:', data);
  },
  debug: function (message, data) {
    logger.debug(new Date(), 'message:', message, 'data:', data);
  },
  warn: function (message, data) {
    logger.warn(new Date(), 'message:', message, 'data:', data);
  }
};
