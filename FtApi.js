'use strict';

var PathMapper = require('./lib/PathMapper.js'),
  Logger = require('./lib/Logger.js'),
  RequestManager = require('./lib/requestManager.js'),
  contentCalls = require('./lib/contentCalls.js'),
  notificationsCalls = require('./lib/notificationsCalls.js');

function FtApi (options) {
  options = options || {};
  if (typeof options.apiKey !== 'string' || options.apiKey === '') {
    throw new TypeError('The FT API constructor requires an API key, ' +
        'which must be a non-empty string');
  }

  if(!Array.isArray(options.featureFlags)) {
    options.featureFlags = [];
  }

  // Use v2 paths
  var apiVersion = options.apiVersion ? options.apiVersion : 1;

  this.pathMapper = new PathMapper(options.apiKey, {
    features: options.featureFlags,
    apiVersion: apiVersion
  });

  this.logger = new Logger();
  this.requestManager = new RequestManager(options);

  if (typeof options.logLevel === 'number') {
    this.setLogLevel(options.logLevel);
  }

  contentCalls.mixInTo(this);
  notificationsCalls.mixInTo(this);
}

/* LOGGING */
/* Note that this is not a per-instance level. Should instance-ise later */
FtApi.prototype.setLogLevel = function (logLevel) {
  this.logger.setLogLevel(logLevel);
};

FtApi.prototype.getLogLevel = function () {
  return this.logger.getLogLevel();
};


/* STATIC FLAGS */
FtApi.LOG_LEVEL_NONE = Logger.LOG_LEVEL_NONE;
FtApi.LOG_LEVEL_INFO = Logger.LOG_LEVEL_INFO;
FtApi.LOG_LEVEL_ERROR = Logger.LOG_LEVEL_ERROR;

module.exports = FtApi;
