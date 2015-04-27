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

  this.config = _.clone(config);
  this.status = {};
}

Converter.prototype.convert = function convert(markdown) {
  return this.stringify(mdast.parse(markdown, mdastConfig(this.config)));
};

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

Converter.prototype.wrapList = function wrapList(node) {
  var
  _status = copyStatus(this.status),
  config = nodeConfig(this.config, node.type),
  string, esc;

  this.status.bold = typeof config.bold === 'undefined' ?  this.status.bold : config.bold;
  this.status.italic = typeof config.italic === 'undefined' ? this.status.italic : config.italic;
  this.status.underline = typeof config.underline === 'undefined' ? this.status.underline : config.underline;
  this.status.delete = typeof config.delete === 'undefined' ? this.status.delete : config.delete;
  this.status.color = config.color || this.status.color;

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

Converter.prototype.wrap = function wrap(node) {
  var
  _status = copyStatus(this.status),
  config = nodeConfig(this.config, node.type),
  string, esc, sep = config.block ? '\n\n' : '';

  this.status.bold = typeof config.bold === 'undefined' ?  this.status.bold : config.bold;
  this.status.italic = typeof config.italic === 'undefined' ? this.status.italic : config.italic;
  this.status.underline = typeof config.underline === 'undefined' ? this.status.underline : config.underline;
  this.status.delete = typeof config.delete === 'undefined' ? this.status.delete : config.delete;
  this.status.color = config.color || this.status.color;

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

function copyStatus(status) {
  return {
    bold: status.bold,
    italic: status.italic,
    underline: status.underline,
    delete: status.delete,
    color: status.color,
  };
}

function escCode(status, reset) {
  var
  flags = [];

  if (reset ||
      status.bold === false ||
      status.italic === false ||
      status.underline === false ||
      status.delete === false) flags.push('0');
  if (status.bold) flags.push('1');
  if (status.italic) flags.push('3');
  if (status.underline) flags.push('4');
  if (status.delete) flags.push('9');
  if (status.color) flags.push(status.color);

  return flags.length === 0 ? '' : '\u001b[' + flags.join(';') + 'm';
}

function bool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'undefined' || value === '') return undefined;
  return /^(?:t(?:rue)?|y(?:es)|on?)$/i.test(value);
}

module.exports = function convert(markdown, config) {
  var
  converter = new Converter(config);

  return converter.convert(markdown);
};
