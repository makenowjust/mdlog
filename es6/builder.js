'use strict';

// import for `mdast.parse`.
import mdast from 'mdast';

// import configuration files.
import mdastOpt     from '../config/mdast.json';
import style        from '../config/style.json';
import defaultColor from '../color/default.json';

let
// save original `console.log` for overriding it.
log = console.log;

// `mdlogBuilderBuilder` is a meta builder function for `mdlogBuilder`.
//
// An argument `Convert` is the subclass of `Convert` class
// (e.g. `NodeConvert` or `BrowserConvert`.)
export default function mdlogBuilderBuilder(Convert, rule) {

  // `mdlogBuilder` is the builder for `mdlog` function.
  //
  // An argument `color` is color scheme `Object` as dictionary.
  function mdlogBuilder(color) {
    return function mdlog(markdown) {
      log.apply(console, convert(markdown, color));
    };
  }
 
  // `convert` converts Markdown into `console.log` styled text and arguments.
  //
  // It returns an `Array` for passing `console.log`.
  function convert(markdown, color) {
    if (typeof color === 'undefined') {
      color = defaultColor;
    }

    let
    node = mdast.parse(markdown, mdastOpt),
    convert = new Convert(rule, style, mdastOpt, color),
    text = convert.convert(node);

    return [text].concat(convert.args);
  }

  // export `convert` in case.
  mdlogBuilder.convert = convert;

  return mdlogBuilder;
};
