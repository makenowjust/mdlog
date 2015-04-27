var
util  = require('util'),
mdlog = require('./index.js');

console._log = console.log;

console.log = function mdlog_log(format/*, ...args*/) {
  mdlog(util.format.apply(null, arguments));
};
