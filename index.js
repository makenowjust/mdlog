var
util = require('util');

var
convert = require('./convert'),
config  = require('./config');

var
log = console.log;

module.exports = function mdlog(markdown/*, ...args*/) {
  var
  string = convert(util.format.apply(null, arguments), config);

  log(string);
};

module.exports.write = function write(markdown/*, ...args*/) {
  var
  string = convert(util.format.apply(null, arguments), config);

  process.stdout.write(string);
};
