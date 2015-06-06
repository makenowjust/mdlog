'use strict';

// import for `color.getRgb`.
import color from 'color-string';

// import superclass.
import Convert from '../convert';


// `color256` converts RGB color into terminal 256 color.
function color256(c) {
  let
  r = ~~(c[0] * 6 / 256),
  g = ~~(c[1] * 6 / 256),
  b = ~~(c[2] * 6 / 256);

  return r * 36 + g * 6 + b + 16;
}

const
// `PROPS` is terminal escape sequence of styles properties.
PROPS = {
  bold: '1',
  italic: '3',
  box: '4',
  underline: '4',
  strike: '9',
},
BASIC_COLOR = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

// `BrowserConvert` is internal class and
// subclass of `Convert` specialized for node.js.
export default class NodeConvert extends Convert {

  // `buildStyleText` is implementation to build styled text.
  buildStyleText(style) {
    let
    props = ['0'];

    Object.keys(PROPS).forEach((prop) => {
      if (style[prop]) {
        props.push(PROPS[prop]);
      }
    });

    ['color', 'background'].forEach((prop) => {
      let
      value = style[prop],
      num = 30 + (prop === 'background' ? 10 : 0),
      index, c;

      if (index = BASIC_COLOR.indexOf(value), index !== -1) {
        props.push(num + index);
      } else if (c = color.getRgb(value)) {
        // if `rule.consoleRgb` is true, it uses RGB color.
        props.push((num + 8) + ';' + (this.rule.consoleRgb ? '2;' + c.join(';') : '5;' + color256(c)));
      } else if (typeof value !== 'undefined') {
        props.push(value);
      }
    });

    return '\u001b[' + props.join(';') + 'm';
  }

}
