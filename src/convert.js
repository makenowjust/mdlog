'use strict';

// loading package
var
_     = require('lodash'),
mdast = require('mdast');

// injection parameter
var
prop;

// ## class Converter
//
// this class is internal class, so it is not exported.
function Converter(config) {
  if (!(this instanceof Converter)) return new Converter(config);

  // set argument
  this.config = _.clone(config);
  
  // default value of status is `undefined`.
  this.status = {};
  this.status.bold = this.status.italic =
    this.status.underline = this.status.delete =
    this.status.color = this.status.background = undefined;
  this.status.style = '';

  // parameter is passing to browser's `console.log`.
  this.paramIndex = 0;
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
  _status = this.status,
  config = nodeConfig(this.config, node.type),
  string, esc, paramIndex = this.paramIndex;

  this.status = copyStatus(this.status);
  updateStatus(this.status, config);

  this.paramIndex += 1;

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

  esc = escCode(this.status, false, this.config, this.parameter, paramIndex);
  string = esc + mdast.stringify(node, mdastConfig(this.config)) + escCode(_status, !!esc, this.config, this.parameter, this.paramIndex++);

  this.status = _status;

  return string;
};

// wrap output string with styles
Converter.prototype.wrap = function wrap(node) {
  var
  _status = this.status,
  config = nodeConfig(this.config, node.type),
  string, esc, sep = config.block ? '\n\n' : '', paramIndex = this.paramIndex;

  this.status = copyStatus(this.status);
  updateStatus(this.status, config);

  this.paramIndex += 1;

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

  esc = escCode(this.status, false, this.config, this.parameter, paramIndex);
  string = esc + string + escCode(_status, !!esc, this.config, this.parameter, this.paramIndex++);

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
  nodeConfig.background = config[type + '_background'];
  nodeConfig.style = config[type + '_style'];

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
  status.background = config.background || status.background;
  status.style = status.style || '';
  if (typeof config.style !== 'undefined') status.style += ';' + config.style;
}

function copyStatus(status) {
  return {
    bold: status.bold,
    italic: status.italic,
    underline: status.underline,
    delete: status.delete,
    color: status.color,
    background: status.background,
    style: status.style,
  };
}

// get escape sequence from `status`
function escCode(status, reset, config, parameter, paramIndex) {
  var
  flags = [];

  // reset escape sequence when `reset` is `true` or style status is explicit `false`.
  if (reset ||
      status.bold === false ||
      status.italic === false ||
      status.underline === false ||
      status.delete === false) flags.push(prop('reset'));

  // set styles
  if (status.bold) flags.push(prop('bold'));
  if (status.italic) flags.push(prop('italic'));
  if (status.underline) flags.push(prop('underline'));
  if (status.delete) flags.push(prop('delete'));
  if (status.color) flags.push(prop('color', status.color, config));
  if (status.background) flags.push(prop('background', status.background, config));
  if (status.style) flags.push(prop('style', status.style, config));

  flags = flags.filter(Boolean);

  if (config.browser) {
    parameter[paramIndex] = flags.join(';');
    return '%c';
  } else {
    return flags.length === 0 ? '' : '\u001b[' + flags.filter(Boolean).join(';') + 'm';
  }
}

// convert string to bool
function bool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'undefined' || value === '') return undefined;
  // `true`, `yes` or `on` is `true`.
  return /^(?:t(?:rue)?|y(?:es)|on?)$/i.test(value);
}

// export `convert` maker function
module.exports = function convertMaker(_prop) {
  prop = _prop;

  return function convert(markdown, config) {
    var
    converter = new Converter(config);

    return [converter.convert(markdown)].concat(converter.parameter);
  };
};
