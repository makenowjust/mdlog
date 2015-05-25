'use strict';

import mdast from 'mdast';

// escape text for `console.log`'s formatter.
function escapeText(text) {
  return text.replace(/%/g, '%%');
}

export default class Convert {
  constructor(rule, style, mdast, color) {
    this.rule = rule;
    this.style = style;
    this.mdast = mdast;
    this.color = color;

    this.styleStack = [{}];
    this.args = [];
  }

  convert(node) {
    if ('convert_' + node.type in this) {
      return this['convert_' + node.type](node);
    } else {
      return this.convertDefault(node);
    }
  }

  convert_text(node) {
    return node.value;
  }

  convert_list(node) {
    let
    prefix, text;

    prefix = this.styleTextPrefix(node);
    
    node.children.forEach((child) => {
      child.children = [
        {
          type: 'text',
          value: this.convert(child),
        }
      ];
    });

    text  = prefix + mdast.stringify(node, this.mdast);
    text += this.styleTextPostfix(node);

    return text;
  }

  convertDefault(node) {
    let
    prefix, text,
    rule = this.nodeRule(node.type);

    prefix = this.styleTextPrefix(node);

    if (node.children) {
      text = node.children.map((child) => this.convert(child)).join(rule.separator || '');
    } else {
      text = escapeText(node.value || '');
    }

    if (rule.stringify) {
      node.children = [
        {
          type: 'text',
          value: text,
        }
      ];
      text = prefix + mdast.stringify(node, this.mdast);
    } else {
      text = prefix + text;
    }

    text += this.styleTextPostfix(node);

    return text;
  }

  nodeRule(type) {
    let
    rule = this.rule[type] || {};

    if (typeof rule.stringify === 'undefined') {
      rule.stringify = true;
    }

    return rule;
  }

  nodeStyle(type) {
    return this.style[type] || {};
  }

  nodeColor(type) {
    return this.color[type] || {};
  }

  styleTextPrefix(node) {
    let
    newStyle = this.updateStyle(node.type), result;

    this.styleStack.push(newStyle);
    
    return this.buildStyleText(newStyle);
  }

  styleTextPostfix(node) {
    this.styleStack.pop();

    let
    oldStyle = this.styleStack[this.styleStack.length - 1];

    return this.buildStyleText(oldStyle);
  }

  updateStyle(type) {
    let
    nodeStyle = this.nodeStyle(type),
    nodeColor = this.nodeColor(type),
    newStyle = Object.create(this.styleStack[this.styleStack.length - 1]);

    ['bold', 'italic', 'box', 'underline', 'strike'].forEach((prop) => {
      if (typeof nodeStyle[prop] !== 'undefined') {
        newStyle[prop] = nodeStyle[prop];
      }
    });

    ['color', 'background'].forEach((prop) => {
      if (typeof nodeColor[prop] !== 'undefined') {
        newStyle[prop] = nodeColor[prop];
      }
    });

    if (typeof nodeStyle.style !== 'undefined') {
      newStyle.style = (newStyle.style || []).concat(nodeStyle);
    }

    return newStyle;
  }


  // abstruct methods

  // style from text
  buildStyleText(style) {
    throw new Error('Convert.prototype.buildStyleText is abstruct method. Please implement in subclasses.');
  }
}

