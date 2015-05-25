'use strict';

import mdast from 'mdast';

import mdastOpt     from '../config/mdast.json';
import rule         from '../config/rule.json';
import style        from '../config/style.json';
import defaultColor from '../color/default.json';

let
log = console.log;

export default function mdlogBuilderBuilder(Convert) {
  function mdlogBuilder(color) {
    return function mdlog(markdown) {
      log.apply(console, convert(markdown, color));
    };
  }

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

  mdlogBuilder.convert = convert;
  return mdlogBuilder;
};

