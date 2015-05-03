'use strict';
// browser's entry point

// loading modules
var
prop    = require('./property'),
convert = require('../convert')(prop),
config  = require('./config');

// make `mdlog` function
var
mdlog = require('../mdlog')(convert, config);

// export functions
mdlog.convert = convert;
mdlog.config  = config;

module.exports = mdlog;
