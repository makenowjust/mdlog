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

function mdlogBuilderBuilder(Convert, rule) {

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
        convert = new Convert(rule, _configStyleJson2['default'], _configMdastJson2['default'], color),
        text = convert.convert(node);

    return [text].concat(convert.args);
  }

  // export `convert` in case.
  mdlogBuilder.convert = convert;

  return mdlogBuilder;
}

;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7cUJBa0JXLG1CQUFtQjs7Ozs7O3FCQWZ6QixPQUFPOzs7Ozs7K0JBR0Esc0JBQXNCOzs7OytCQUN0QixzQkFBc0I7Ozs7Z0NBQ3RCLHVCQUF1Qjs7OztBQUVoRDs7QUFFQSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztBQU1ILFNBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTs7Ozs7QUFLekQsV0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFO0FBQzNCLFdBQU8sU0FBUyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQzlCLFNBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUM5QyxDQUFDO0dBQ0g7Ozs7O0FBS0QsV0FBUyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtBQUNoQyxRQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtBQUNoQyxXQUFLLGdDQUFlLENBQUM7S0FDdEI7O0FBRUQsUUFDQSxJQUFJLEdBQUcsbUJBQU0sS0FBSyxDQUFDLFFBQVEsK0JBQVc7UUFDdEMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksOERBQW1CLEtBQUssQ0FBQztRQUNuRCxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFN0IsV0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDcEM7OztBQUdELGNBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztBQUUvQixTQUFPLFlBQVksQ0FBQztDQUNyQjs7QUFBQSxDQUFDIiwiZmlsZSI6ImJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIGltcG9ydCBmb3IgYG1kYXN0LnBhcnNlYC5cbmltcG9ydCBtZGFzdCBmcm9tICdtZGFzdCc7XG5cbi8vIGltcG9ydCBjb25maWd1cmF0aW9uIGZpbGVzLlxuaW1wb3J0IG1kYXN0T3B0ICAgICBmcm9tICcuLi9jb25maWcvbWRhc3QuanNvbic7XG5pbXBvcnQgc3R5bGUgICAgICAgIGZyb20gJy4uL2NvbmZpZy9zdHlsZS5qc29uJztcbmltcG9ydCBkZWZhdWx0Q29sb3IgZnJvbSAnLi4vY29sb3IvZGVmYXVsdC5qc29uJztcblxubGV0XG4vLyBzYXZlIG9yaWdpbmFsIGBjb25zb2xlLmxvZ2AgZm9yIG92ZXJyaWRpbmcgaXQuXG5sb2cgPSBjb25zb2xlLmxvZztcblxuLy8gYG1kbG9nQnVpbGRlckJ1aWxkZXJgIGlzIGEgbWV0YSBidWlsZGVyIGZ1bmN0aW9uIGZvciBgbWRsb2dCdWlsZGVyYC5cbi8vXG4vLyBBbiBhcmd1bWVudCBgQ29udmVydGAgaXMgdGhlIHN1YmNsYXNzIG9mIGBDb252ZXJ0YCBjbGFzc1xuLy8gKGUuZy4gYE5vZGVDb252ZXJ0YCBvciBgQnJvd3NlckNvbnZlcnRgLilcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1kbG9nQnVpbGRlckJ1aWxkZXIoQ29udmVydCwgcnVsZSkge1xuXG4gIC8vIGBtZGxvZ0J1aWxkZXJgIGlzIHRoZSBidWlsZGVyIGZvciBgbWRsb2dgIGZ1bmN0aW9uLlxuICAvL1xuICAvLyBBbiBhcmd1bWVudCBgY29sb3JgIGlzIGNvbG9yIHNjaGVtZSBgT2JqZWN0YCBhcyBkaWN0aW9uYXJ5LlxuICBmdW5jdGlvbiBtZGxvZ0J1aWxkZXIoY29sb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbWRsb2cobWFya2Rvd24pIHtcbiAgICAgIGxvZy5hcHBseShjb25zb2xlLCBjb252ZXJ0KG1hcmtkb3duLCBjb2xvcikpO1xuICAgIH07XG4gIH1cbiBcbiAgLy8gYGNvbnZlcnRgIGNvbnZlcnRzIE1hcmtkb3duIGludG8gYGNvbnNvbGUubG9nYCBzdHlsZWQgdGV4dCBhbmQgYXJndW1lbnRzLlxuICAvL1xuICAvLyBJdCByZXR1cm5zIGFuIGBBcnJheWAgZm9yIHBhc3NpbmcgYGNvbnNvbGUubG9nYC5cbiAgZnVuY3Rpb24gY29udmVydChtYXJrZG93biwgY29sb3IpIHtcbiAgICBpZiAodHlwZW9mIGNvbG9yID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29sb3IgPSBkZWZhdWx0Q29sb3I7XG4gICAgfVxuXG4gICAgbGV0XG4gICAgbm9kZSA9IG1kYXN0LnBhcnNlKG1hcmtkb3duLCBtZGFzdE9wdCksXG4gICAgY29udmVydCA9IG5ldyBDb252ZXJ0KHJ1bGUsIHN0eWxlLCBtZGFzdE9wdCwgY29sb3IpLFxuICAgIHRleHQgPSBjb252ZXJ0LmNvbnZlcnQobm9kZSk7XG5cbiAgICByZXR1cm4gW3RleHRdLmNvbmNhdChjb252ZXJ0LmFyZ3MpO1xuICB9XG5cbiAgLy8gZXhwb3J0IGBjb252ZXJ0YCBpbiBjYXNlLlxuICBtZGxvZ0J1aWxkZXIuY29udmVydCA9IGNvbnZlcnQ7XG5cbiAgcmV0dXJuIG1kbG9nQnVpbGRlcjtcbn07XG4iXX0=