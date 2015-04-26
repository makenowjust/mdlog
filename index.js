var
util = require('util');

var
convert = require('./convert'),
config  = require('./config');

module.exports = function mdlog(markdown) {
  var
  string = convert(util.format.apply(null, arguments), config);

  process.stdout.write(string);
};
