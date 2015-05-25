var
format = require('util').format,
mdlog = require('./')();

var
_log = console.log;

console.log = function mdlogOverrideLog() {
  _log.apply(console, mdlog(format.apply(null, arguments)));
};

console._log = _log;
