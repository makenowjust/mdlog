'use strict';

// loading modules
var
prop    = require('./src/property'),
convert = require('./src/convert')(prop),
config  = require('./src/config');

// make mdlog function
var
mdlog = require('./src/mdlog')(convert, config);

// export other functions and `mdlog`
mdlog.convert = convert;
mdlog.config  = config;

module.exports = mdlog;
