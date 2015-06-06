'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

// import superclass.

var _convert = require('../convert');

var _convert2 = _interopRequireDefault(_convert);

var
// `PROPS` is the CSS of styles properties.
PROPS = {
  bold: 'font-weight: bold',
  italic: 'font-style: italic',
  box: 'border: 1px solid #ccc; border-radius: 3px; padding: 1px'
};

// `BrowserConvert` is internal class and
// subclass of `Convert` specialized for browser JavaScript.

var BrowserConvert = (function (_Convert) {
  function BrowserConvert() {
    _classCallCheck(this, BrowserConvert);

    if (_Convert != null) {
      _Convert.apply(this, arguments);
    }
  }

  _inherits(BrowserConvert, _Convert);

  _createClass(BrowserConvert, [{
    key: 'buildStyleText',

    // `buildStyleText` is implementation to build styled text.
    value: function buildStyleText(style) {
      var css = [],

      // `deco` is css's `text-decoration` values.
      deco = [];

      Object.keys(PROPS).forEach(function (prop) {
        if (style[prop]) {
          css.push(PROPS[prop]);
        }
      });

      ['underline', 'strike'].forEach(function (prop) {
        if (style[prop]) {
          deco.push(prop === 'strike' ? 'line-through' : prop);
        }
      });
      if (deco.length > 0) {
        css.push('text-decoration: ' + deco.join(' '));
      }

      ['color', 'backgrund'].forEach(function (prop) {
        if (style[prop]) {
          css.push(prop + ': ' + style[prop]);
        }
      });

      if (style.style) {
        css = css.concat(style.style);
      }

      this.args.push(css.join('; '));
      return '%c';
    }
  }, {
    key: 'convert_inlineCode',

    // `convert_inlineCode` converts Markdown's inlineCode node into text for `console.log`.
    value: function convert_inlineCode(node) {
      var text = undefined;

      text = this.styleTextPrefix(node);
      text += node.value;
      text += this.styleTextPostfix(node);

      return text;
    }
  }, {
    key: 'styleTextPrefix',

    // `styleTextPrefix` overrides for changing font size of Markdown's heading node.
    value: function styleTextPrefix(node) {
      var newStyle = this.updateStyle(node.type),
          result = undefined;

      switch (node.type) {
        case 'heading':
          newStyle.style = (newStyle.style || []).concat(['font-size: ' + Math.pow(1.22, 4 - node.depth) * 100 + '%']);
          break;
      }

      this.styleStack.push(newStyle);

      return this.buildStyleText(newStyle);
    }
  }]);

  return BrowserConvert;
})(_convert2['default']);

exports['default'] = BrowserConvert;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9icm93c2VyL2NvbnZlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O3VCQUdPLFlBQVk7Ozs7QUFFaEM7O0FBRUEsS0FBSyxHQUFHO0FBQ04sTUFBSSxFQUFFLG1CQUFtQjtBQUN6QixRQUFNLEVBQUUsb0JBQW9CO0FBQzVCLEtBQUcsRUFBRSwwREFBMEQ7Q0FDaEUsQ0FBQzs7Ozs7SUFJbUIsY0FBYztXQUFkLGNBQWM7MEJBQWQsY0FBYzs7Ozs7OztZQUFkLGNBQWM7O2VBQWQsY0FBYzs7OztXQUduQix3QkFBQyxLQUFLLEVBQUU7QUFDcEIsVUFDQSxHQUFHLEdBQUcsRUFBRTs7O0FBRVIsVUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFVixZQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUNuQyxZQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNmLGFBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdkI7T0FDRixDQUFDLENBQUM7O0FBR0gsT0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3hDLFlBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUN0RDtPQUNGLENBQUMsQ0FBQztBQUNILFVBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDbkIsV0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7T0FDaEQ7O0FBRUQsT0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3ZDLFlBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsYUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO09BQ0YsQ0FBQyxDQUFDOztBQUVILFVBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNmLFdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUMvQjs7QUFFRCxVQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDL0IsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7V0FHaUIsNEJBQUMsSUFBSSxFQUFFO0FBQ3ZCLFVBQ0EsSUFBSSxZQUFBLENBQUM7O0FBRUwsVUFBSSxHQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsVUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDbkIsVUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFcEMsYUFBTyxJQUFJLENBQUM7S0FDYjs7Ozs7V0FHYyx5QkFBQyxJQUFJLEVBQUU7QUFDcEIsVUFDQSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1VBQUUsTUFBTSxZQUFBLENBQUM7O0FBRS9DLGNBQVEsSUFBSSxDQUFDLElBQUk7QUFDakIsYUFBSyxTQUFTO0FBQ1osa0JBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdHLGdCQUFNO0FBQUEsT0FDUDs7QUFFRCxVQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFL0IsYUFBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3RDOzs7U0FqRWtCLGNBQWM7OztxQkFBZCxjQUFjIiwiZmlsZSI6ImNvbnZlcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIGltcG9ydCBzdXBlcmNsYXNzLlxuaW1wb3J0IENvbnZlcnQgZnJvbSAnLi4vY29udmVydCc7XG5cbmNvbnN0XG4vLyBgUFJPUFNgIGlzIHRoZSBDU1Mgb2Ygc3R5bGVzIHByb3BlcnRpZXMuXG5QUk9QUyA9IHtcbiAgYm9sZDogJ2ZvbnQtd2VpZ2h0OiBib2xkJyxcbiAgaXRhbGljOiAnZm9udC1zdHlsZTogaXRhbGljJyxcbiAgYm94OiAnYm9yZGVyOiAxcHggc29saWQgI2NjYzsgYm9yZGVyLXJhZGl1czogM3B4OyBwYWRkaW5nOiAxcHgnXG59O1xuXG4vLyBgQnJvd3NlckNvbnZlcnRgIGlzIGludGVybmFsIGNsYXNzIGFuZFxuLy8gc3ViY2xhc3Mgb2YgYENvbnZlcnRgIHNwZWNpYWxpemVkIGZvciBicm93c2VyIEphdmFTY3JpcHQuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcm93c2VyQ29udmVydCBleHRlbmRzIENvbnZlcnQge1xuXG4gIC8vIGBidWlsZFN0eWxlVGV4dGAgaXMgaW1wbGVtZW50YXRpb24gdG8gYnVpbGQgc3R5bGVkIHRleHQuXG4gIGJ1aWxkU3R5bGVUZXh0KHN0eWxlKSB7XG4gICAgbGV0XG4gICAgY3NzID0gW10sXG4gICAgLy8gYGRlY29gIGlzIGNzcydzIGB0ZXh0LWRlY29yYXRpb25gIHZhbHVlcy5cbiAgICBkZWNvID0gW107XG5cbiAgICBPYmplY3Qua2V5cyhQUk9QUykuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgaWYgKHN0eWxlW3Byb3BdKSB7XG4gICAgICAgIGNzcy5wdXNoKFBST1BTW3Byb3BdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFxuICAgIFsndW5kZXJsaW5lJywgJ3N0cmlrZSddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmIChzdHlsZVtwcm9wXSkge1xuICAgICAgICBkZWNvLnB1c2gocHJvcCA9PT0gJ3N0cmlrZScgPyAnbGluZS10aHJvdWdoJyA6IHByb3ApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChkZWNvLmxlbmd0aCA+IDApIHtcbiAgICAgIGNzcy5wdXNoKCd0ZXh0LWRlY29yYXRpb246ICcgKyBkZWNvLmpvaW4oJyAnKSk7XG4gICAgfVxuXG4gICAgWydjb2xvcicsICdiYWNrZ3J1bmQnXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICBpZiAoc3R5bGVbcHJvcF0pIHtcbiAgICAgICAgY3NzLnB1c2gocHJvcCArICc6ICcgKyBzdHlsZVtwcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoc3R5bGUuc3R5bGUpIHtcbiAgICAgIGNzcyA9IGNzcy5jb25jYXQoc3R5bGUuc3R5bGUpO1xuICAgIH1cblxuICAgIHRoaXMuYXJncy5wdXNoKGNzcy5qb2luKCc7ICcpKTtcbiAgICByZXR1cm4gJyVjJztcbiAgfVxuXG4gIC8vIGBjb252ZXJ0X2lubGluZUNvZGVgIGNvbnZlcnRzIE1hcmtkb3duJ3MgaW5saW5lQ29kZSBub2RlIGludG8gdGV4dCBmb3IgYGNvbnNvbGUubG9nYC5cbiAgY29udmVydF9pbmxpbmVDb2RlKG5vZGUpIHtcbiAgICBsZXRcbiAgICB0ZXh0O1xuXG4gICAgdGV4dCAgPSB0aGlzLnN0eWxlVGV4dFByZWZpeChub2RlKTtcbiAgICB0ZXh0ICs9IG5vZGUudmFsdWU7XG4gICAgdGV4dCArPSB0aGlzLnN0eWxlVGV4dFBvc3RmaXgobm9kZSk7XG5cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIC8vIGBzdHlsZVRleHRQcmVmaXhgIG92ZXJyaWRlcyBmb3IgY2hhbmdpbmcgZm9udCBzaXplIG9mIE1hcmtkb3duJ3MgaGVhZGluZyBub2RlLlxuICBzdHlsZVRleHRQcmVmaXgobm9kZSkge1xuICAgIGxldFxuICAgIG5ld1N0eWxlID0gdGhpcy51cGRhdGVTdHlsZShub2RlLnR5cGUpLCByZXN1bHQ7XG4gICAgXG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICBjYXNlICdoZWFkaW5nJzpcbiAgICAgIG5ld1N0eWxlLnN0eWxlID0gKG5ld1N0eWxlLnN0eWxlIHx8IFtdKS5jb25jYXQoWydmb250LXNpemU6ICcgKyBNYXRoLnBvdygxLjIyLCA0IC0gbm9kZS5kZXB0aCkgKiAxMDAgKyAnJSddKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuc3R5bGVTdGFjay5wdXNoKG5ld1N0eWxlKTtcbiAgICBcbiAgICByZXR1cm4gdGhpcy5idWlsZFN0eWxlVGV4dChuZXdTdHlsZSk7XG4gIH1cblxufVxuIl19