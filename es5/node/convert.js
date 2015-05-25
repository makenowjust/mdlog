'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _colorString = require('color-string');

var _colorString2 = _interopRequireDefault(_colorString);

var _convert = require('../convert');

var _convert2 = _interopRequireDefault(_convert);

function color256(c) {
  var r = ~ ~(c[0] * 6 / 256),
      g = ~ ~(c[1] * 6 / 256),
      b = ~ ~(c[2] * 6 / 256);

  return r * 36 + g * 6 + b + 16;
}

var PROPS = {
  bold: '1',
  italic: '3',
  box: '4',
  underline: '4',
  strike: '9' },
    BASIC_COLOR = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9ub2RlL2NvbnZlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7OzsyQkFFSyxjQUFjOzs7O3VCQUVaLFlBQVk7Ozs7QUFHaEMsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ25CLE1BQ0EsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQSxBQUFDO01BQ3RCLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUEsQUFBQztNQUN0QixDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFBLEFBQUMsQ0FBQzs7QUFFdkIsU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNoQzs7QUFFRCxJQUNBLEtBQUssR0FBRztBQUNOLE1BQUksRUFBRSxHQUFHO0FBQ1QsUUFBTSxFQUFFLEdBQUc7QUFDWCxLQUFHLEVBQUUsR0FBRztBQUNSLFdBQVMsRUFBRSxHQUFHO0FBQ2QsUUFBTSxFQUFFLEdBQUcsRUFDWjtJQUNELFdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7SUFFakUsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7Ozs7OztZQUFYLFdBQVc7O2VBQVgsV0FBVzs7V0FDaEIsd0JBQUMsS0FBSyxFQUFFOzs7QUFDcEIsVUFDQSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFZCxZQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUNuQyxZQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNmLGVBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDekI7T0FDRixDQUFDLENBQUM7O0FBRUgsT0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3hDLFlBQ0EsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDbkIsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEtBQUssWUFBWSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUEsQUFBQztZQUMzQyxLQUFLLFlBQUE7WUFBRSxDQUFDLFlBQUEsQ0FBQzs7QUFFVCxhQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQSxFQUFFO0FBQ3BELGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ3pCLE1BQU0sSUFBSSxDQUFDLEdBQUcseUJBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2xDLGVBQUssQ0FBQyxJQUFJLENBQUMsQUFBQyxHQUFHLEdBQUcsQ0FBQyxHQUFJLEdBQUcsSUFBSSxNQUFLLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUMsQ0FBQztTQUNoRyxNQUFNLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO0FBQ3ZDLGVBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkI7T0FDRixDQUFDLENBQUM7O0FBRUgsYUFBTyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDMUM7OztTQTNCa0IsV0FBVzs7O3FCQUFYLFdBQVciLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGNvbG9yIGZyb20gJ2NvbG9yLXN0cmluZyc7XG5cbmltcG9ydCBDb252ZXJ0IGZyb20gJy4uL2NvbnZlcnQnO1xuXG5cbmZ1bmN0aW9uIGNvbG9yMjU2KGMpIHtcbiAgbGV0XG4gIHIgPSB+fihjWzBdICogNiAvIDI1NiksXG4gIGcgPSB+fihjWzFdICogNiAvIDI1NiksXG4gIGIgPSB+fihjWzJdICogNiAvIDI1Nik7XG5cbiAgcmV0dXJuIHIgKiAzNiArIGcgKiA2ICsgYiArIDE2O1xufVxuXG5jb25zdFxuUFJPUFMgPSB7XG4gIGJvbGQ6ICcxJyxcbiAgaXRhbGljOiAnMycsXG4gIGJveDogJzQnLFxuICB1bmRlcmxpbmU6ICc0JyxcbiAgc3RyaWtlOiAnOScsXG59LFxuQkFTSUNfQ09MT1IgPSBbJ2JsYWNrJywgJ3JlZCcsICdncmVlbicsICd5ZWxsb3cnLCAnYmx1ZScsICdtYWdlbnRhJywgJ2N5YW4nLCAnd2hpdGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZUNvbnZlcnQgZXh0ZW5kcyBDb252ZXJ0IHtcbiAgYnVpbGRTdHlsZVRleHQoc3R5bGUpIHtcbiAgICBsZXRcbiAgICBwcm9wcyA9IFsnMCddO1xuXG4gICAgT2JqZWN0LmtleXMoUFJPUFMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmIChzdHlsZVtwcm9wXSkge1xuICAgICAgICBwcm9wcy5wdXNoKFBST1BTW3Byb3BdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFsnY29sb3InLCAnYmFja2dyb3VuZCddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGxldFxuICAgICAgdmFsdWUgPSBzdHlsZVtwcm9wXSxcbiAgICAgIG51bSA9IDMwICsgKHByb3AgPT09ICdiYWNrZ3JvdW5kJyA/IDEwIDogMCksXG4gICAgICBpbmRleCwgYztcblxuICAgICAgaWYgKGluZGV4ID0gQkFTSUNfQ09MT1IuaW5kZXhPZih2YWx1ZSksIGluZGV4ICE9PSAtMSkge1xuICAgICAgICBwcm9wcy5wdXNoKG51bSArIGluZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAoYyA9IGNvbG9yLmdldFJnYih2YWx1ZSkpIHtcbiAgICAgICAgcHJvcHMucHVzaCgobnVtICsgOCkgKyAnOycgKyAodGhpcy5ydWxlLmNvbnNvbGVSZ2IgPyAnMjsnICsgYy5qb2luKCc7JykgOiAnNTsnICsgY29sb3IyNTYoYykpKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwcm9wcy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAnXFx1MDAxYlsnICsgcHJvcHMuam9pbignOycpICsgJ20nO1xuICB9XG59XG4iXX0=