'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = mdlogBuilderBuilder;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import for `mdast.parse`.

var _mdast = require('mdast');

var _mdast2 = _interopRequireDefault(_mdast);

// import configuration files.

var _configMdastJson = require('../config/mdast.json');

var _configMdastJson2 = _interopRequireDefault(_configMdastJson);

var _configRuleJson = require('../config/rule.json');

var _configRuleJson2 = _interopRequireDefault(_configRuleJson);

var _configStyleJson = require('../config/style.json');

var _configStyleJson2 = _interopRequireDefault(_configStyleJson);

var _colorDefaultJson = require('../color/default.json');

var _colorDefaultJson2 = _interopRequireDefault(_colorDefaultJson);

var
// save original `console.log` for overriding it.
log = console.log;

// `mdlogBuilderBuilder` is a meta builder function for `mdlogBuilder`.
//
// An argument `Convert` is the subclass of `Convert` class
// (e.g. `NodeConvert` or `BrowserConvert`.)

function mdlogBuilderBuilder(Convert) {

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
      color = _colorDefaultJson2['default'];
    }

    var node = _mdast2['default'].parse(markdown, _configMdastJson2['default']),
        convert = new Convert(_configRuleJson2['default'], _configStyleJson2['default'], _configMdastJson2['default'], color),
        text = convert.convert(node);

    return [text].concat(convert.args);
  }

  // export `convert` in case.
  mdlogBuilder.convert = convert;

  return mdlogBuilder;
}

;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7cUJBbUJXLG1CQUFtQjs7Ozs7O3FCQWhCekIsT0FBTzs7Ozs7OytCQUdBLHNCQUFzQjs7Ozs4QkFDdEIscUJBQXFCOzs7OytCQUNyQixzQkFBc0I7Ozs7Z0NBQ3RCLHVCQUF1Qjs7OztBQUVoRDs7QUFFQSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztBQU1ILFNBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFFOzs7OztBQUtuRCxXQUFTLFlBQVksQ0FBQyxLQUFLLEVBQUU7QUFDM0IsV0FBTyxTQUFTLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDOUIsU0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzlDLENBQUM7R0FDSDs7Ozs7QUFLRCxXQUFTLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO0FBQ2hDLFFBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO0FBQ2hDLFdBQUssZ0NBQWUsQ0FBQztLQUN0Qjs7QUFFRCxRQUNBLElBQUksR0FBRyxtQkFBTSxLQUFLLENBQUMsUUFBUSwrQkFBVztRQUN0QyxPQUFPLEdBQUcsSUFBSSxPQUFPLDBGQUF3QixLQUFLLENBQUM7UUFDbkQsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTdCLFdBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3BDOzs7QUFHRCxjQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7QUFFL0IsU0FBTyxZQUFZLENBQUM7Q0FDckI7O0FBQUEsQ0FBQyIsImZpbGUiOiJidWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBpbXBvcnQgZm9yIGBtZGFzdC5wYXJzZWAuXG5pbXBvcnQgbWRhc3QgZnJvbSAnbWRhc3QnO1xuXG4vLyBpbXBvcnQgY29uZmlndXJhdGlvbiBmaWxlcy5cbmltcG9ydCBtZGFzdE9wdCAgICAgZnJvbSAnLi4vY29uZmlnL21kYXN0Lmpzb24nO1xuaW1wb3J0IHJ1bGUgICAgICAgICBmcm9tICcuLi9jb25maWcvcnVsZS5qc29uJztcbmltcG9ydCBzdHlsZSAgICAgICAgZnJvbSAnLi4vY29uZmlnL3N0eWxlLmpzb24nO1xuaW1wb3J0IGRlZmF1bHRDb2xvciBmcm9tICcuLi9jb2xvci9kZWZhdWx0Lmpzb24nO1xuXG5sZXRcbi8vIHNhdmUgb3JpZ2luYWwgYGNvbnNvbGUubG9nYCBmb3Igb3ZlcnJpZGluZyBpdC5cbmxvZyA9IGNvbnNvbGUubG9nO1xuXG4vLyBgbWRsb2dCdWlsZGVyQnVpbGRlcmAgaXMgYSBtZXRhIGJ1aWxkZXIgZnVuY3Rpb24gZm9yIGBtZGxvZ0J1aWxkZXJgLlxuLy9cbi8vIEFuIGFyZ3VtZW50IGBDb252ZXJ0YCBpcyB0aGUgc3ViY2xhc3Mgb2YgYENvbnZlcnRgIGNsYXNzXG4vLyAoZS5nLiBgTm9kZUNvbnZlcnRgIG9yIGBCcm93c2VyQ29udmVydGAuKVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWRsb2dCdWlsZGVyQnVpbGRlcihDb252ZXJ0KSB7XG5cbiAgLy8gYG1kbG9nQnVpbGRlcmAgaXMgdGhlIGJ1aWxkZXIgZm9yIGBtZGxvZ2AgZnVuY3Rpb24uXG4gIC8vXG4gIC8vIEFuIGFyZ3VtZW50IGBjb2xvcmAgaXMgY29sb3Igc2NoZW1lIGBPYmplY3RgIGFzIGRpY3Rpb25hcnkuXG4gIGZ1bmN0aW9uIG1kbG9nQnVpbGRlcihjb2xvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBtZGxvZyhtYXJrZG93bikge1xuICAgICAgbG9nLmFwcGx5KGNvbnNvbGUsIGNvbnZlcnQobWFya2Rvd24sIGNvbG9yKSk7XG4gICAgfTtcbiAgfVxuIFxuICAvLyBgY29udmVydGAgY29udmVydHMgTWFya2Rvd24gaW50byBgY29uc29sZS5sb2dgIHN0eWxlZCB0ZXh0IGFuZCBhcmd1bWVudHMuXG4gIC8vXG4gIC8vIEl0IHJldHVybnMgYW4gYEFycmF5YCBmb3IgcGFzc2luZyBgY29uc29sZS5sb2dgLlxuICBmdW5jdGlvbiBjb252ZXJ0KG1hcmtkb3duLCBjb2xvcikge1xuICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb2xvciA9IGRlZmF1bHRDb2xvcjtcbiAgICB9XG5cbiAgICBsZXRcbiAgICBub2RlID0gbWRhc3QucGFyc2UobWFya2Rvd24sIG1kYXN0T3B0KSxcbiAgICBjb252ZXJ0ID0gbmV3IENvbnZlcnQocnVsZSwgc3R5bGUsIG1kYXN0T3B0LCBjb2xvciksXG4gICAgdGV4dCA9IGNvbnZlcnQuY29udmVydChub2RlKTtcblxuICAgIHJldHVybiBbdGV4dF0uY29uY2F0KGNvbnZlcnQuYXJncyk7XG4gIH1cblxuICAvLyBleHBvcnQgYGNvbnZlcnRgIGluIGNhc2UuXG4gIG1kbG9nQnVpbGRlci5jb252ZXJ0ID0gY29udmVydDtcblxuICByZXR1cm4gbWRsb2dCdWlsZGVyO1xufTtcbiJdfQ==