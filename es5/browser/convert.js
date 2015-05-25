'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _convert = require('../convert');

var _convert2 = _interopRequireDefault(_convert);

var PROPS = {
  bold: 'font-weight: bold',
  italic: 'font-style: italic',
  box: 'border: 1px solid #ccc; border-radius: 3px; padding: 1px'
};

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
    value: function buildStyleText(style) {
      var css = [],
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
    value: function convert_inlineCode(node) {
      var text = undefined;

      text = this.styleTextPrefix(node);
      text += node.value;
      text += this.styleTextPostfix(node);

      return text;
    }
  }, {
    key: 'styleTextPrefix',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9icm93c2VyL2NvbnZlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozt1QkFFTyxZQUFZOzs7O0FBRWhDLElBQ0EsS0FBSyxHQUFHO0FBQ04sTUFBSSxFQUFFLG1CQUFtQjtBQUN6QixRQUFNLEVBQUUsb0JBQW9CO0FBQzVCLEtBQUcsRUFBRSwwREFBMEQ7Q0FDaEUsQ0FBQzs7SUFFbUIsY0FBYztXQUFkLGNBQWM7MEJBQWQsY0FBYzs7Ozs7OztZQUFkLGNBQWM7O2VBQWQsY0FBYzs7V0FDbkIsd0JBQUMsS0FBSyxFQUFFO0FBQ3BCLFVBQ0EsR0FBRyxHQUFHLEVBQUU7VUFDUixJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVWLFlBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ25DLFlBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2YsYUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN2QjtPQUNGLENBQUMsQ0FBQzs7QUFHSCxPQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDeEMsWUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDZixjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3REO09BQ0YsQ0FBQyxDQUFDO0FBQ0gsVUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNuQixXQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztPQUNoRDs7QUFFRCxPQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDdkMsWUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDZixhQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckM7T0FDRixDQUFDLENBQUM7O0FBRUgsVUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ2YsV0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQy9COztBQUVELFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMvQixhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFaUIsNEJBQUMsSUFBSSxFQUFFO0FBQ3ZCLFVBQ0EsSUFBSSxZQUFBLENBQUM7O0FBRUwsVUFBSSxHQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsVUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDbkIsVUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFcEMsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBRWMseUJBQUMsSUFBSSxFQUFFO0FBQ3BCLFVBQ0EsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztVQUFFLE1BQU0sWUFBQSxDQUFDOztBQUUvQyxjQUFRLElBQUksQ0FBQyxJQUFJO0FBQ2pCLGFBQUssU0FBUztBQUNaLGtCQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUEsQ0FBRSxNQUFNLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3RyxnQkFBTTtBQUFBLE9BQ1A7O0FBRUQsVUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLGFBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN0Qzs7O1NBNURrQixjQUFjOzs7cUJBQWQsY0FBYyIsImZpbGUiOiJjb252ZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ29udmVydCBmcm9tICcuLi9jb252ZXJ0JztcblxuY29uc3RcblBST1BTID0ge1xuICBib2xkOiAnZm9udC13ZWlnaHQ6IGJvbGQnLFxuICBpdGFsaWM6ICdmb250LXN0eWxlOiBpdGFsaWMnLFxuICBib3g6ICdib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBib3JkZXItcmFkaXVzOiAzcHg7IHBhZGRpbmc6IDFweCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyb3dzZXJDb252ZXJ0IGV4dGVuZHMgQ29udmVydCB7XG4gIGJ1aWxkU3R5bGVUZXh0KHN0eWxlKSB7XG4gICAgbGV0XG4gICAgY3NzID0gW10sXG4gICAgZGVjbyA9IFtdO1xuXG4gICAgT2JqZWN0LmtleXMoUFJPUFMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmIChzdHlsZVtwcm9wXSkge1xuICAgICAgICBjc3MucHVzaChQUk9QU1twcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBcbiAgICBbJ3VuZGVybGluZScsICdzdHJpa2UnXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICBpZiAoc3R5bGVbcHJvcF0pIHtcbiAgICAgICAgZGVjby5wdXNoKHByb3AgPT09ICdzdHJpa2UnID8gJ2xpbmUtdGhyb3VnaCcgOiBwcm9wKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZGVjby5sZW5ndGggPiAwKSB7XG4gICAgICBjc3MucHVzaCgndGV4dC1kZWNvcmF0aW9uOiAnICsgZGVjby5qb2luKCcgJykpO1xuICAgIH1cblxuICAgIFsnY29sb3InLCAnYmFja2dydW5kJ10uZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgaWYgKHN0eWxlW3Byb3BdKSB7XG4gICAgICAgIGNzcy5wdXNoKHByb3AgKyAnOiAnICsgc3R5bGVbcHJvcF0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHN0eWxlLnN0eWxlKSB7XG4gICAgICBjc3MgPSBjc3MuY29uY2F0KHN0eWxlLnN0eWxlKTtcbiAgICB9XG5cbiAgICB0aGlzLmFyZ3MucHVzaChjc3Muam9pbignOyAnKSk7XG4gICAgcmV0dXJuICclYyc7XG4gIH1cblxuICBjb252ZXJ0X2lubGluZUNvZGUobm9kZSkge1xuICAgIGxldFxuICAgIHRleHQ7XG5cbiAgICB0ZXh0ICA9IHRoaXMuc3R5bGVUZXh0UHJlZml4KG5vZGUpO1xuICAgIHRleHQgKz0gbm9kZS52YWx1ZTtcbiAgICB0ZXh0ICs9IHRoaXMuc3R5bGVUZXh0UG9zdGZpeChub2RlKTtcblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgc3R5bGVUZXh0UHJlZml4KG5vZGUpIHtcbiAgICBsZXRcbiAgICBuZXdTdHlsZSA9IHRoaXMudXBkYXRlU3R5bGUobm9kZS50eXBlKSwgcmVzdWx0O1xuICAgIFxuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgY2FzZSAnaGVhZGluZyc6XG4gICAgICBuZXdTdHlsZS5zdHlsZSA9IChuZXdTdHlsZS5zdHlsZSB8fCBbXSkuY29uY2F0KFsnZm9udC1zaXplOiAnICsgTWF0aC5wb3coMS4yMiwgNCAtIG5vZGUuZGVwdGgpICogMTAwICsgJyUnXSk7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLnN0eWxlU3RhY2sucHVzaChuZXdTdHlsZSk7XG4gICAgXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRTdHlsZVRleHQobmV3U3R5bGUpO1xuICB9XG59XG4iXX0=