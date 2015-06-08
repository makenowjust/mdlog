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
          // if `rule.consoleRgb` is true, it uses RGB color.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9ub2RlL2NvbnZlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUdLLGNBQWM7Ozs7Ozt1QkFHWixZQUFZOzs7OztBQUloQyxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDbkIsTUFDQSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFBLEFBQUM7TUFDdEIsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQSxBQUFDO01BQ3RCLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUEsQUFBQyxDQUFDOztBQUV2QixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ2hDOztBQUVEOztBQUVBLEtBQUssR0FBRztBQUNOLE1BQUksRUFBRSxHQUFHO0FBQ1QsUUFBTSxFQUFFLEdBQUc7QUFDWCxLQUFHLEVBQUUsR0FBRztBQUNSLFdBQVMsRUFBRSxHQUFHO0FBQ2QsUUFBTSxFQUFFLEdBQUcsRUFDWjtJQUNELFdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7SUFJakUsV0FBVztXQUFYLFdBQVc7MEJBQVgsV0FBVzs7Ozs7OztZQUFYLFdBQVc7O2VBQVgsV0FBVzs7OztXQUdoQix3QkFBQyxLQUFLLEVBQUU7OztBQUNwQixVQUNBLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVkLFlBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ25DLFlBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsZUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN6QjtPQUNGLENBQUMsQ0FBQzs7QUFFSCxPQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDeEMsWUFDQSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNuQixHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksS0FBSyxZQUFZLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQSxBQUFDO1lBQzNDLEtBQUssWUFBQTtZQUFFLENBQUMsWUFBQSxDQUFDOztBQUVULGFBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFBLEVBQUU7QUFDcEQsZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDekIsTUFBTSxJQUFJLENBQUMsR0FBRyx5QkFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7O0FBRWxDLGVBQUssQ0FBQyxJQUFJLENBQUMsQUFBQyxHQUFHLEdBQUcsQ0FBQyxHQUFJLEdBQUcsSUFBSSxNQUFLLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUMsQ0FBQztTQUNoRyxNQUFNLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO0FBQ3ZDLGVBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkI7T0FDRixDQUFDLENBQUM7O0FBRUgsYUFBTyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDMUM7OztTQTlCa0IsV0FBVzs7O3FCQUFYLFdBQVciLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8gaW1wb3J0IGZvciBgY29sb3IuZ2V0UmdiYC5cbmltcG9ydCBjb2xvciBmcm9tICdjb2xvci1zdHJpbmcnO1xuXG4vLyBpbXBvcnQgc3VwZXJjbGFzcy5cbmltcG9ydCBDb252ZXJ0IGZyb20gJy4uL2NvbnZlcnQnO1xuXG5cbi8vIGBjb2xvcjI1NmAgY29udmVydHMgUkdCIGNvbG9yIGludG8gdGVybWluYWwgMjU2IGNvbG9yLlxuZnVuY3Rpb24gY29sb3IyNTYoYykge1xuICBsZXRcbiAgciA9IH5+KGNbMF0gKiA2IC8gMjU2KSxcbiAgZyA9IH5+KGNbMV0gKiA2IC8gMjU2KSxcbiAgYiA9IH5+KGNbMl0gKiA2IC8gMjU2KTtcblxuICByZXR1cm4gciAqIDM2ICsgZyAqIDYgKyBiICsgMTY7XG59XG5cbmNvbnN0XG4vLyBgUFJPUFNgIGlzIHRlcm1pbmFsIGVzY2FwZSBzZXF1ZW5jZSBvZiBzdHlsZXMgcHJvcGVydGllcy5cblBST1BTID0ge1xuICBib2xkOiAnMScsXG4gIGl0YWxpYzogJzMnLFxuICBib3g6ICc0JyxcbiAgdW5kZXJsaW5lOiAnNCcsXG4gIHN0cmlrZTogJzknLFxufSxcbkJBU0lDX0NPTE9SID0gWydibGFjaycsICdyZWQnLCAnZ3JlZW4nLCAneWVsbG93JywgJ2JsdWUnLCAnbWFnZW50YScsICdjeWFuJywgJ3doaXRlJ107XG5cbi8vIGBCcm93c2VyQ29udmVydGAgaXMgaW50ZXJuYWwgY2xhc3MgYW5kXG4vLyBzdWJjbGFzcyBvZiBgQ29udmVydGAgc3BlY2lhbGl6ZWQgZm9yIG5vZGUuanMuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlQ29udmVydCBleHRlbmRzIENvbnZlcnQge1xuXG4gIC8vIGBidWlsZFN0eWxlVGV4dGAgaXMgaW1wbGVtZW50YXRpb24gdG8gYnVpbGQgc3R5bGVkIHRleHQuXG4gIGJ1aWxkU3R5bGVUZXh0KHN0eWxlKSB7XG4gICAgbGV0XG4gICAgcHJvcHMgPSBbJzAnXTtcblxuICAgIE9iamVjdC5rZXlzKFBST1BTKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICBpZiAoc3R5bGVbcHJvcF0pIHtcbiAgICAgICAgcHJvcHMucHVzaChQUk9QU1twcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBbJ2NvbG9yJywgJ2JhY2tncm91bmQnXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICBsZXRcbiAgICAgIHZhbHVlID0gc3R5bGVbcHJvcF0sXG4gICAgICBudW0gPSAzMCArIChwcm9wID09PSAnYmFja2dyb3VuZCcgPyAxMCA6IDApLFxuICAgICAgaW5kZXgsIGM7XG5cbiAgICAgIGlmIChpbmRleCA9IEJBU0lDX0NPTE9SLmluZGV4T2YodmFsdWUpLCBpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgcHJvcHMucHVzaChudW0gKyBpbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKGMgPSBjb2xvci5nZXRSZ2IodmFsdWUpKSB7XG4gICAgICAgIC8vIGlmIGBydWxlLmNvbnNvbGVSZ2JgIGlzIHRydWUsIGl0IHVzZXMgUkdCIGNvbG9yLlxuICAgICAgICBwcm9wcy5wdXNoKChudW0gKyA4KSArICc7JyArICh0aGlzLnJ1bGUuY29uc29sZVJnYiA/ICcyOycgKyBjLmpvaW4oJzsnKSA6ICc1OycgKyBjb2xvcjI1NihjKSkpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHByb3BzLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBwcm9wcy5qb2luKCc7JykgKyAnbSc7XG4gIH1cblxufVxuIl19