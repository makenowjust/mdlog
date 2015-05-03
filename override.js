'use strict';

// loading packages
var
util  = require('util'),
mdlog = require('./.');

// backup `console.log`
console._log = console.log;

// override `console.log`
console.log = function mdlog_log(format/*, ...args*/) {
  mdlog(util.format.apply(null, arguments));
};

// re-export `mdlog`
module.exports = mdlog;
