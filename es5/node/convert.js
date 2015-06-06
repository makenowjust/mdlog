'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

// import for `color.getRgb`.

var _colorString = require('color-string');

var _colorString2 = _interopRequireDefault(_colorString);

// import superclass.

var _convert = require('../convert');

var _convert2 = _interopRequireDefault(_convert);

// `color256` converts RGB color into terminal 256 color.
function color256(c) {
  var r = ~ ~(c[0] * 6 / 256),
      g = ~ ~(c[1] * 6 / 256),
      b = ~ ~(c[2] * 6 / 256);

  return r * 36 + g * 6 + b + 16;
}

var
// `PROPS` is terminal escape sequence of styles properties.
PROPS = {
  bold: '1',
  italic: '3',
  box: '4',
  underline: '4',
  strike: '9' },
    BASIC_COLOR = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

// `BrowserConvert` is internal class and
// subclass of `Convert` specialized for node.js.

var NodeConvert = (function (_Convert) {
  function NodeConvert() {
    _classCallCheck(this, NodeConvert);

    if (_Convert != null) {
      _Convert.apply(this, arguments);
    }
  }

  _inherits(NodeConvert, _Convert);

  _createClass(NodeConvert, [{
    key: 'buildStyleText',

    // `buildStyleText` is implementation to build styled text.
    value: function buildStyleText(style) {
      var _this = this;

      var props = ['0'];

      Object.keys(PROPS).forEach(function (prop) {
        if (style[prop]) {
          props.push(PROPS[prop]);
        }
      });

      ['color', 'background'].forEach(function (prop) {
        var value = style[prop],
            num = 30 + (prop === 'background' ? 10 : 0),
            index = undefined,
            c = undefined;

        if ((index = BASIC_COLOR.indexOf(value), index !== -1)) {
          props.push(num + index);
        } else if (c = _colorString2['default'].getRgb(value)) {
          props.push(num + 8 + ';' + (_this.rule.consoleRgb ? '2;' + c.join(';') : '5;' + color256(c)));
        } else if (typeof value !== 'undefined') {
          props.push(value);
        }
      });

      return '\u001b[' + props.join(';') + 'm';
    }
  }]);

  return NodeConvert;
})(_convert2['default']);

exports['default'] = NodeConvert;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9ub2RlL2NvbnZlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUdLLGNBQWM7Ozs7Ozt1QkFHWixZQUFZOzs7OztBQUloQyxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDbkIsTUFDQSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFBLEFBQUM7TUFDdEIsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQSxBQUFDO01BQ3RCLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUEsQUFBQyxDQUFDOztBQUV2QixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ2hDOztBQUVEOztBQUVBLEtBQUssR0FBRztBQUNOLE1BQUksRUFBRSxHQUFHO0FBQ1QsUUFBTSxFQUFFLEdBQUc7QUFDWCxLQUFHLEVBQUUsR0FBRztBQUNSLFdBQVMsRUFBRSxHQUFHO0FBQ2QsUUFBTSxFQUFFLEdBQUcsRUFDWjtJQUNELFdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7SUFJakUsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7Ozs7OztZQUFYLFdBQVc7O2VBQVgsV0FBVzs7OztXQUdoQix3QkFBQyxLQUFLLEVBQUU7OztBQUNwQixVQUNBLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVkLFlBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ25DLFlBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsZUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN6QjtPQUNGLENBQUMsQ0FBQzs7QUFFSCxPQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDeEMsWUFDQSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNuQixHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksS0FBSyxZQUFZLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQSxBQUFDO1lBQzNDLEtBQUssWUFBQTtZQUFFLENBQUMsWUFBQSxDQUFDOztBQUVULGFBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFBLEVBQUU7QUFDcEQsZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDekIsTUFBTSxJQUFJLENBQUMsR0FBRyx5QkFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDbEMsZUFBSyxDQUFDLElBQUksQ0FBQyxBQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUksR0FBRyxJQUFJLE1BQUssSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxDQUFDO1NBQ2hHLE1BQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7QUFDdkMsZUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQjtPQUNGLENBQUMsQ0FBQzs7QUFFSCxhQUFPLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUMxQzs7O1NBN0JrQixXQUFXOzs7cUJBQVgsV0FBVyIsImZpbGUiOiJjb252ZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBpbXBvcnQgZm9yIGBjb2xvci5nZXRSZ2JgLlxuaW1wb3J0IGNvbG9yIGZyb20gJ2NvbG9yLXN0cmluZyc7XG5cbi8vIGltcG9ydCBzdXBlcmNsYXNzLlxuaW1wb3J0IENvbnZlcnQgZnJvbSAnLi4vY29udmVydCc7XG5cblxuLy8gYGNvbG9yMjU2YCBjb252ZXJ0cyBSR0IgY29sb3IgaW50byB0ZXJtaW5hbCAyNTYgY29sb3IuXG5mdW5jdGlvbiBjb2xvcjI1NihjKSB7XG4gIGxldFxuICByID0gfn4oY1swXSAqIDYgLyAyNTYpLFxuICBnID0gfn4oY1sxXSAqIDYgLyAyNTYpLFxuICBiID0gfn4oY1syXSAqIDYgLyAyNTYpO1xuXG4gIHJldHVybiByICogMzYgKyBnICogNiArIGIgKyAxNjtcbn1cblxuY29uc3Rcbi8vIGBQUk9QU2AgaXMgdGVybWluYWwgZXNjYXBlIHNlcXVlbmNlIG9mIHN0eWxlcyBwcm9wZXJ0aWVzLlxuUFJPUFMgPSB7XG4gIGJvbGQ6ICcxJyxcbiAgaXRhbGljOiAnMycsXG4gIGJveDogJzQnLFxuICB1bmRlcmxpbmU6ICc0JyxcbiAgc3RyaWtlOiAnOScsXG59LFxuQkFTSUNfQ09MT1IgPSBbJ2JsYWNrJywgJ3JlZCcsICdncmVlbicsICd5ZWxsb3cnLCAnYmx1ZScsICdtYWdlbnRhJywgJ2N5YW4nLCAnd2hpdGUnXTtcblxuLy8gYEJyb3dzZXJDb252ZXJ0YCBpcyBpbnRlcm5hbCBjbGFzcyBhbmRcbi8vIHN1YmNsYXNzIG9mIGBDb252ZXJ0YCBzcGVjaWFsaXplZCBmb3Igbm9kZS5qcy5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGVDb252ZXJ0IGV4dGVuZHMgQ29udmVydCB7XG5cbiAgLy8gYGJ1aWxkU3R5bGVUZXh0YCBpcyBpbXBsZW1lbnRhdGlvbiB0byBidWlsZCBzdHlsZWQgdGV4dC5cbiAgYnVpbGRTdHlsZVRleHQoc3R5bGUpIHtcbiAgICBsZXRcbiAgICBwcm9wcyA9IFsnMCddO1xuXG4gICAgT2JqZWN0LmtleXMoUFJPUFMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmIChzdHlsZVtwcm9wXSkge1xuICAgICAgICBwcm9wcy5wdXNoKFBST1BTW3Byb3BdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFsnY29sb3InLCAnYmFja2dyb3VuZCddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGxldFxuICAgICAgdmFsdWUgPSBzdHlsZVtwcm9wXSxcbiAgICAgIG51bSA9IDMwICsgKHByb3AgPT09ICdiYWNrZ3JvdW5kJyA/IDEwIDogMCksXG4gICAgICBpbmRleCwgYztcblxuICAgICAgaWYgKGluZGV4ID0gQkFTSUNfQ09MT1IuaW5kZXhPZih2YWx1ZSksIGluZGV4ICE9PSAtMSkge1xuICAgICAgICBwcm9wcy5wdXNoKG51bSArIGluZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAoYyA9IGNvbG9yLmdldFJnYih2YWx1ZSkpIHtcbiAgICAgICAgcHJvcHMucHVzaCgobnVtICsgOCkgKyAnOycgKyAodGhpcy5ydWxlLmNvbnNvbGVSZ2IgPyAnMjsnICsgYy5qb2luKCc7JykgOiAnNTsnICsgY29sb3IyNTYoYykpKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwcm9wcy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAnXFx1MDAxYlsnICsgcHJvcHMuam9pbignOycpICsgJ20nO1xuICB9XG5cbn1cbiJdfQ==