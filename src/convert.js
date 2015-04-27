'use strict';

// loading package
var
_     = require('lodash'),
mdast = require('mdast');

// ## class Converter
//
// this class is internal class, so it is not exported.
function Converter(config) {
  if (!(this instanceof Converter)) return new Converter(config);

  // set argument
  this.config = _.clone(config);
  
  // default value of status is `undefined`.
  this.status = {};

  // parameter is passing to browser's `console.log`.
  this.parameter = [];
}

// convert entry point
Converter.prototype.convert = function convert(markdown) {
  return this.stringify(mdast.parse(markdown, mdastConfig(this.config)));
};

// convert from Markdown to output string
Converter.prototype.stringify = function stringify(node) {
  switch (node.type) {
  case 'list':
    return this.wrapList(node);

  case 'text':
    return node.value;

  default:
    return this.wrap(node);
  }
};

// wrap output string with styles specialized for list node
Converter.prototype.wrapList = function wrapList(node) {
  var
  _status = copyStatus(this.status),
  config = nodeConfig(this.config, node.type),
  string, esc;

  updateStatus(this.status, config);

  // list must contain listItem.
  node.children = node.children.map(function loopChildren(node) {
    return {
      type: 'listItem',
      children: [
        {
          type: 'text',
          value: this.stringify(node),
        }
      ],
    };
  }.bind(this));

  esc = escCode(this.status);
  string = esc + mdast.stringify(node, mdastConfig(this.config)) + escCode(_status, !!esc);

  this.status = _status;

  return string;
};

// wrap output string with styles
Converter.prototype.wrap = function wrap(node) {
  var
  _status = copyStatus(this.status),
  config = nodeConfig(this.config, node.type),
  string, esc, sep = config.block ? '\n\n' : '';

  updateStatus(this.status, config);

  if (node.children) {
    string = node.children.map(function loopChildren(node) {
      return this.stringify(node);
    }.bind(this)).join(sep);
  } else {
    string = node.value || '';
  }

  if (config.stringify) {
    node.children = [
      {
        type: 'text',
        value: string,
      },
    ];
    string = mdast.stringify(node, mdastConfig(this.config));
  }

  esc = escCode(this.status);
  string = esc + string + escCode(_status, !!esc);

  this.status = _status;

  return string;
};


// ## internal functions

// get node config from `config` object
function nodeConfig(config, type) {
  if (config[type]) return config[type];

  var
  nodeConfig = {};

  nodeConfig.stringify = bool(
    (type + '_stringify') in config ?
      config[type + '_stringify'] : config.stringify);
  nodeConfig.block = bool(config[type + '_block']);
  nodeConfig.bold = bool(config[type + '_bold']);
  nodeConfig.italic = bool(config[type + '_italic']);
  nodeConfig.underline = bool(config[type + '_underline']);
  nodeConfig.delete = bool(config[type + '_delete']);
  nodeConfig.color = config[type + '_color'];

  return config[type] = nodeConfig;
}

// get mdast config from `config` object.
function mdastConfig(config) {
  if (config.mdast) return config.mdast;

  return config.mdast = Object.keys(config).reduce(function loopConfig(mdastConfig, key) {
    var
    match = key.match(/^mdast_(.+)$/);
    if (match) {
      mdastConfig[match[1]] = config[key];
    }

    return mdastConfig;
  }, {});
}

function updateStatus(status, config) {
  status.bold = typeof config.bold === 'undefined' ?  status.bold : config.bold;
  status.italic = typeof config.italic === 'undefined' ? status.italic : config.italic;
  status.underline = typeof config.underline === 'undefined' ? status.underline : config.underline;
  status.delete = typeof config.delete === 'undefined' ? status.delete : config.delete;
  status.color = config.color || status.color;
}

function copyStatus(status) {
  return {
    bold: status.bold,
    italic: status.italic,
    underline: status.underline,
    delete: status.delete,
    color: status.color,
  };
}

// get escape sequence from `status`
function escCode(status, reset) {
  var
  flags = [];

  // reset escape sequence when `reset` is `true` or style status is explicit `false`.
  if (reset ||
      status.bold === false ||
      status.italic === false ||
      status.underline === false ||
      status.delete === false) flags.push('0');

  // set styles
  if (status.bold) flags.push('1');
  if (status.italic) flags.push('3');
  if (status.underline) flags.push('4');
  if (status.delete) flags.push('9');
  if (status.color) flags.push(status.color);

  return flags.length === 0 ? '' : '\u001b[' + flags.join(';') + 'm';
}

// convert string to bool
function bool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'undefined' || value === '') return undefined;
  // `true`, `yes` or `on` is `true`.
  return /^(?:t(?:rue)?|y(?:es)|on?)$/i.test(value);
}

// export convert function
module.exports = function convert(markdown, config) {
  var
  converter = new Converter(config);

  return converter.convert(markdown);
};
