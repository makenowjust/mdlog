'use strict';

module.exports = function prop(name, value, config) {
  switch (name) {
  case 'bold':
    return 'font-weight: bold';
  case 'italic':
    return 'font-style: italic';
  case 'underline':
    return 'border-bottom: 1px solid';
  case 'delete':
    return 'text-decoration: line-through';
  case 'color':
  case 'background':
    return name + ': ' + value;
  case 'style':
    return value;
  default:
    return '';
  }
};
