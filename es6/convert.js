'use strict';

// import for `mdast.stringify`.
import mdast from 'mdast';

// `escapeText` escapes specified text for `console.log`'s formatter.
function escapeText(text) {
  return text.replace(/%/g, '%%');
}

// `Convert` is internal class to convert Markdown into text styled for `console.log`'.
export default class Convert {

  // `constructor` is `Convert` constructor (calling implicitly via `new`).
  // 
  // each of arguments description is:
  //
  //   - `rule` is `Object` as dictionary
  //     to specify translation rules for each Markdown's nodes.
  //   - `style` is `Object` as dictionary
  //     to specify styles (without color) for each Markdown's nodes.
  //   - `color` is `Object` as dictionary
  //     to specify color styles for each Markdown's nodes.
  //   - `mdast` is `Object` as dictionary
  //     to pass `mdast.stringify`.
  constructor(rule, style, mdast, color) {
    // save arguments into instance.
    this.rule = rule;
    this.style = style;
    this.mdast = mdast;
    this.color = color;

    // set instance variables.
    this.styleStack = [{}];
    this.args = [];
  }

  // `convert` is converting entry point.
  //
  //  An argument `node` is Markdown's node.
  //
  //  It returns text styled for `console.log`.
  convert(node) {
    // separate process by `node.type`.
    if ('convert_' + node.type in this) {
      return this['convert_' + node.type](node);
    } else {
      return this.convertDefault(node);
    }
  }

  // `convert_text` converts Markdown's text node into text for `console.log`.
  convert_text(node) {
    return escapeText(node.value);
  }

  // `convert_list` converts Markdown's list node into text for `console.log`.
  //
  // Why this method is needed is Markdown's list nodes are difference in `Object` structure
  // (Markdown's list nodes __most__ contain listItem nodes as `node.children`.)
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

  // `convertDefault` converts Markdown's node into text for `console.log`.
  convertDefault(node) {
    let
    prefix, text,
    rule = this.nodeRule(node.type);

    prefix = this.styleTextPrefix(node);

    if (node.children) {
      text = node.children
        .map((child) => this.convert(child))
        .join(rule.separator || '');
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

  // `nodeRule` gets a rule specified `type`.
  nodeRule(type) {
    let
    rule = this.rule[type] || {};

    if (typeof rule.stringify === 'undefined') {
      rule.stringify = true;
    }

    return rule;
  }

  // `nodeStyle` gets a rule specified `type`.
  nodeStyle(type) {
    return this.style[type] || {};
  }

  // `nodeColor` gets a rule specified `type`.
  nodeColor(type) {
    return this.color[type] || {};
  }

  // `styleTextPrefix` makes styled text and update internal status.
  styleTextPrefix(node) {
    let
    newStyle = this.updateStyle(node.type), result;

    this.styleStack.push(newStyle);
    
    return this.buildStyleText(newStyle);
  }

  // `styleTextPostfix` makes styled text and update internal status.
  styleTextPostfix(node) {
    this.styleStack.pop();

    let
    oldStyle = this.styleStack[this.styleStack.length - 1];

    return this.buildStyleText(oldStyle);
  }

  // `updateStyle` is implementation updating internal status.
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


  // `buildStyleText` is implementation making styled text (abstruct method).
  buildStyleText(style) {
    throw new Error(
      'Convert.prototype.buildStyleText is abstruct method. ' +
      'Please implement in subclasses.');
  }
}
