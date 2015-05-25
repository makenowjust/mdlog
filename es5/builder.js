'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = mdlogBuilderBuilder;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mdast = require('mdast');

var _mdast2 = _interopRequireDefault(_mdast);

var _configMdastJson = require('../config/mdast.json');

var _configMdastJson2 = _interopRequireDefault(_configMdastJson);

var _configRuleJson = require('../config/rule.json');

var _configRuleJson2 = _interopRequireDefault(_configRuleJson);

var _configStyleJson = require('../config/style.json');

var _configStyleJson2 = _interopRequireDefault(_configStyleJson);

var _colorDefaultJson = require('../color/default.json');

var _colorDefaultJson2 = _interopRequireDefault(_colorDefaultJson);

var log = console.log;

function mdlogBuilderBuilder(Convert) {
  function mdlogBuilder(color) {
    return function mdlog(markdown) {
      log.apply(console, convert(markdown, color));
    };
  }

  function convert(markdown, color) {
    if (typeof color === 'undefined') {
      color = _colorDefaultJson2['default'];
    }

    var node = _mdast2['default'].parse(markdown, _configMdastJson2['default']),
        convert = new Convert(_configRuleJson2['default'], _configStyleJson2['default'], _configMdastJson2['default'], color),
        text = convert.convert(node);

    return [text].concat(convert.args);
  }

  mdlogBuilder.convert = convert;
  return mdlogBuilder;
}

;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9idWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7cUJBWVcsbUJBQW1COzs7O3FCQVZ6QixPQUFPOzs7OytCQUVBLHNCQUFzQjs7Ozs4QkFDdEIscUJBQXFCOzs7OytCQUNyQixzQkFBc0I7Ozs7Z0NBQ3RCLHVCQUF1Qjs7OztBQUVoRCxJQUNBLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUVILFNBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFFO0FBQ25ELFdBQVMsWUFBWSxDQUFDLEtBQUssRUFBRTtBQUMzQixXQUFPLFNBQVMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUM5QixTQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDOUMsQ0FBQztHQUNIOztBQUVELFdBQVMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDaEMsUUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7QUFDaEMsV0FBSyxnQ0FBZSxDQUFDO0tBQ3RCOztBQUVELFFBQ0EsSUFBSSxHQUFHLG1CQUFNLEtBQUssQ0FBQyxRQUFRLCtCQUFXO1FBQ3RDLE9BQU8sR0FBRyxJQUFJLE9BQU8sMEZBQXdCLEtBQUssQ0FBQztRQUNuRCxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFN0IsV0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDcEM7O0FBRUQsY0FBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDL0IsU0FBTyxZQUFZLENBQUM7Q0FDckI7O0FBQUEsQ0FBQyIsImZpbGUiOiJidWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbWRhc3QgZnJvbSAnbWRhc3QnO1xuXG5pbXBvcnQgbWRhc3RPcHQgICAgIGZyb20gJy4uL2NvbmZpZy9tZGFzdC5qc29uJztcbmltcG9ydCBydWxlICAgICAgICAgZnJvbSAnLi4vY29uZmlnL3J1bGUuanNvbic7XG5pbXBvcnQgc3R5bGUgICAgICAgIGZyb20gJy4uL2NvbmZpZy9zdHlsZS5qc29uJztcbmltcG9ydCBkZWZhdWx0Q29sb3IgZnJvbSAnLi4vY29sb3IvZGVmYXVsdC5qc29uJztcblxubGV0XG5sb2cgPSBjb25zb2xlLmxvZztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWRsb2dCdWlsZGVyQnVpbGRlcihDb252ZXJ0KSB7XG4gIGZ1bmN0aW9uIG1kbG9nQnVpbGRlcihjb2xvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBtZGxvZyhtYXJrZG93bikge1xuICAgICAgbG9nLmFwcGx5KGNvbnNvbGUsIGNvbnZlcnQobWFya2Rvd24sIGNvbG9yKSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnQobWFya2Rvd24sIGNvbG9yKSB7XG4gICAgaWYgKHR5cGVvZiBjb2xvciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbG9yID0gZGVmYXVsdENvbG9yO1xuICAgIH1cblxuICAgIGxldFxuICAgIG5vZGUgPSBtZGFzdC5wYXJzZShtYXJrZG93biwgbWRhc3RPcHQpLFxuICAgIGNvbnZlcnQgPSBuZXcgQ29udmVydChydWxlLCBzdHlsZSwgbWRhc3RPcHQsIGNvbG9yKSxcbiAgICB0ZXh0ID0gY29udmVydC5jb252ZXJ0KG5vZGUpO1xuXG4gICAgcmV0dXJuIFt0ZXh0XS5jb25jYXQoY29udmVydC5hcmdzKTtcbiAgfVxuXG4gIG1kbG9nQnVpbGRlci5jb252ZXJ0ID0gY29udmVydDtcbiAgcmV0dXJuIG1kbG9nQnVpbGRlcjtcbn07XG5cbiJdfQ==