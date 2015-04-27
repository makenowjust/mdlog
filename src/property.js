var
color = require('color-string');

function color256(c) {
  var
  r = ~~(c[0] * 6 / 256),
  g = ~~(c[1] * 6 / 256),
  b = ~~(c[2] * 6 / 256);

  return r * 36 + g * 6 + b + 16;
}

module.exports = function prop(name, value, config) {
  var
  i = 30, c;

  switch (name) {
  case 'reset':
    return '0';
  case 'bold':
    return '1';
  case 'italic':
    return '3';
  case 'underline':
    return '4';
  case 'delete':
    return '9';
  case 'background':
    i += 10;
  case 'color':
    switch (value) {
    case 'white':
      i += 1;
    case 'cyan':
      i += 1;
    case 'magenta':
      i += 1;
    case 'blue':
      i += 1;
    case 'yellow':
      i += 1;
    case 'green':
      i += 1;
    case 'red':
      i += 1;
    case 'black':
      return ''+i;
    }

    if (c = color.getRgb(value)) {
      return config.consoleRgb ? (i+8) + ';2;' + c.join(';') :  (i+8) + ';5;' + color256(c);
    }

    return value;

  default:
    return '';
  }
};
