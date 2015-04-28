module.exports = function mdlogMaker(convert, defaultConfig) {
  'use strict';

  var
  _    = require('lodash'),
  util = require('util');

  var
  log = console._log || console.log;

  return function mdlog(markdown, config) {
    if (typeof config !== 'undefined') config = _.merge({}, defaultConfig, config);
    else config = defaultConfig;

    var
    string = convert(markdown, config);

    log.apply(console, string);
  }
};
