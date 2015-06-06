'use strict';

// import superclass.
import Convert from '../convert';

const
// `PROPS` is the CSS of styles properties.
PROPS = {
  bold: 'font-weight: bold',
  italic: 'font-style: italic',
  box: 'border: 1px solid #ccc; border-radius: 3px; padding: 1px'
};

// `BrowserConvert` is internal class and
// subclass of `Convert` specialized for browser JavaScript.
export default class BrowserConvert extends Convert {

  // `buildStyleText` is implementation to build styled text.
  buildStyleText(style) {
    let
    css = [],
    // `deco` is css's `text-decoration` values.
    deco = [];

    Object.keys(PROPS).forEach((prop) => {
      if (style[prop]) {
        css.push(PROPS[prop]);
      }
    });

    
    ['underline', 'strike'].forEach((prop) => {
      if (style[prop]) {
        deco.push(prop === 'strike' ? 'line-through' : prop);
      }
    });
    if (deco.length > 0) {
      css.push('text-decoration: ' + deco.join(' '));
    }

    ['color', 'backgrund'].forEach((prop) => {
      if (style[prop]) {
        css.push(prop + ': ' + style[prop]);
      }
    });

    if (style.style) {
      css = css.concat(style.style);
    }

    this.args.push(css.join('; '));
    return '%c';
  }

  // `convert_inlineCode` converts Markdown's inlineCode node into text for `console.log`.
  convert_inlineCode(node) {
    let
    text;

    text  = this.styleTextPrefix(node);
    text += node.value;
    text += this.styleTextPostfix(node);

    return text;
  }

  // `styleTextPrefix` overrides for changing font size of Markdown's heading node.
  styleTextPrefix(node) {
    let
    newStyle = this.updateStyle(node.type), result;
    
    switch (node.type) {
    case 'heading':
      newStyle.style = (newStyle.style || []).concat(['font-size: ' + Math.pow(1.22, 4 - node.depth) * 100 + '%']);
      break;
    }

    this.styleStack.push(newStyle);
    
    return this.buildStyleText(newStyle);
  }

}
