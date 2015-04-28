'use strict';

var
prop    = require('./property'),
convert = require('../convert')(prop),
config  = require('./config');

var
mdlog = require('../mdlog')(convert, config);

mdlog.convert = convert;
mdlog.config  = config;

module.exports = mdlog;
