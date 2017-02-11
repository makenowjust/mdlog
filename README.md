# mdlog

[![Greenkeeper badge](https://badges.greenkeeper.io/MakeNowJust/mdlog.svg)](https://greenkeeper.io/)

Markdown on `console.log`

[![npm](https://img.shields.io/npm/v/mdlog.svg)](https://www.npmjs.com/package/mdlog)
[![Dependency Status](https://david-dm.org/MakeNowJust/mdlog.png)](https://david-dm.org/MakeNowJust/mdlog)


## What Is?

```javascript
require('mdlog/override');

console.log([
  '# Hello, *mdlog* World!',
  '',
  'You can use Markdown syntax on `console.log`.',
  '',
  '- Markdown is **powerfull**.',
  '- Markdown is **useful**.',
  '- Markdown is **readable**.',
  '',
  '> Markdown is a text-to-HTML conversion tool for web writers.',
  'Markdown allows you to write using an easy-to-read, easy-to-write plain text format,',
  'then convert it to structurally valid XHTML (or HTML).',
  '',
  'see <http://en.wikipedia.org/wiki/Markdown>.',
].join('\n'));
```

then terminal output is:

![output to terminal](https://raw.githubusercontent.com/MakeNowJust/mdlog/master/sample/readme-node.png)

and browser output is:

![output to browser console](https://raw.githubusercontent.com/MakeNowJust/mdlog/master/sample/readme-browser.png)


## Install

```console
$ npm install --save mdlog
```

`--save` option is optional.

## API

```javascript
mdlogBuilder = require('mdlog');
```

#### `mdlog = mdlogBuilder(colorScheme)`

`mdlogBuilder` is builder of `mdlog` function.

An argument `colorScheme` is color scheme `Object` (see [color directory](https://github.com/MakeNowJust/mdlog/tree/master/color)),
its default value is `colorScheme = require('mdlog/color/default.json')`.

It returns `mdlog` function.

- - -

#### `mdlog(markdown)`

`mdlog` output styled markdown text into `console`.

It uses `mdlogBuilder.conver` function to convert Markdown text into styled text.

It returns `undefined`.

- - -

#### `mdlogBuilder.convert(markdown, colorScheme)`

`convert` converts `markdown` text into styled text with `colorScheme`.

It uses [mdast](https://github.com/wooorm/mdast) as Markdown parser.

It returns an `Array` to pass into `console.log` as arguments.

- - -

#### `require('mdlog/override')`

`console.log` overrides `mdlog`. __This module pollutes global `console` object.__ You can use original `console.log` as `console._log`.


### License

MIT License. See <https://makenowjust.github.io/license/mit?2015>.
