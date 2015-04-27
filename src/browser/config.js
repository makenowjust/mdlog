'use strict';

var
_      = require('lodash'),
config = require('../default_config.json');

module.exports = _.clone(config);
module.exports.browser = true;
module.exports.inlineCode_stringify = false;
