# mdlog

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
mdlog = require('mdlog')
```

#### `mdlog(markdown, config = mdlog.config)`

`mdlog` is converting `markdown` text to output, and print it with `console.log`.  It can override `mdlog.config` by `config` (`mdlog.config` is immutable).

```javascript
mdlog('# Hello *mdlog* World!', { heading_color: 'darkviolet' });
```

- - -

#### `mdlog.convert(markdown, config)`

`convert` is converter from `markdown` text to output which is `Array` because it is `console.log`'s arguments.

Second argument is `config`.  This config is JavaScript object having such key/values:

  - `mdast_<mdast_option_name>` is passed to `mdast`'s API.
  - `stringify` is a default parameter of `config.<node_type>_stringify`.
  - `<node_type>_stringify` is flag for using `mdast.stringify`.
  - `<node_type>_{bold,italic,underline,delete,color,background,style}` is decoration style config.
  - `<node_type>_block` is flag whether `<node_type>` is block.

Default config is [here](https://github.com/MakeNowJust/mdlog/blob/master/src/default_config.json), please see.

```javascript
var
args = mdlog.convert('# Hello *mdlog* World!', mdlog.config);

console.log.apply(console, args);
```

- - -

#### `mdlog.config`

It is default `config`.  It is custamizable by environemt variable `MDLOG_CONFIG` (Of course, node.js only).

```console
$ env MDLOG_CONFIG='heading_color:darkviolet' node sample/readme.js
```

- - -


#### `mdlog = require('mdlog/override')`

`console.log` overrides `mdlog`. __This module pollutes global `console` object.__ And, you can use original `console.log` as `console._log`.  In addition to, this module returns `mdlog` module.


### License

MIT License. See <https://makenowjust.github.io/license/mit?2015>.
