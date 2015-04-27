var
_    = require('lodash'),
util = require('util');

var
convert       = require('./convert'),
defaultConfig = require('./config');

var
log = console._log || console.log;

module.exports = function mdlog(markdown, config) {
  if (typeof config !== 'undefined') config = _.merge({}, defaultConfig, config);
  else config = defaultConfig;

  var
  string = convert(markdown, config);

  log(string);
};
