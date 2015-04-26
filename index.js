var
util = require('util');

var
convert = require('./convert'),
config  = require('./config');

var
log = console.log;

module.exports = function mdlog(markdown) {
  var
  string = convert(util.format.apply(null, arguments), config);

  log(string);
};
