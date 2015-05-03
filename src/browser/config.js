'use strict';

// loading packages and modules
var
_      = require('lodash'),
config = require('../default_config.json');

module.exports = _.clone(config);

// override configs
module.exports.browser = true;
module.exports.inlineCode_stringify = false;
