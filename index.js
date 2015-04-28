'use strict';

var
prop    = require('./src/property'),
convert = require('./src/convert')(prop),
config  = require('./src/config');

var
mdlog = require('./src/mdlog')(convert, config);

mdlog.convert = convert;
mdlog.config  = config;

module.exports = mdlog;
