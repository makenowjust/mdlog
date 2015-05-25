'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mdast = require('mdast');

var _mdast2 = _interopRequireDefault(_mdast);

// escape text for `console.log`'s formatter.
function escapeText(text) {
  return text.replace(/%/g, '%%');
}

var Convert = (function () {
  function Convert(rule, style, mdast, color) {
    _classCallCheck(this, Convert);

    this.rule = rule;
    this.style = style;
    this.mdast = mdast;
    this.color = color;

    this.styleStack = [{}];
    this.args = [];
  }

  _createClass(Convert, [{
    key: 'convert',
    value: function convert(node) {
      if ('convert_' + node.type in this) {
        return this['convert_' + node.type](node);
      } else {
        return this.convertDefault(node);
      }
    }
  }, {
    key: 'convert_text',
    value: function convert_text(node) {
      return node.value;
    }
  }, {
    key: 'convert_list',
    value: function convert_list(node) {
      var _this = this;

      var prefix = undefined,
          text = undefined;

      prefix = this.styleTextPrefix(node);

      node.children.forEach(function (child) {
        child.children = [{
          type: 'text',
          value: _this.convert(child) }];
      });

      text = prefix + _mdast2['default'].stringify(node, this.mdast);
      text += this.styleTextPostfix(node);

      return text;
    }
  }, {
    key: 'convertDefault',
    value: function convertDefault(node) {
      var _this2 = this;

      var prefix = undefined,
          text = undefined,
          rule = this.nodeRule(node.type);

      prefix = this.styleTextPrefix(node);

      if (node.children) {
        text = node.children.map(function (child) {
          return _this2.convert(child);
        }).join(rule.separator || '');
      } else {
        text = escapeText(node.value || '');
      }

      if (rule.stringify) {
        node.children = [{
          type: 'text',
          value: text }];
        text = prefix + _mdast2['default'].stringify(node, this.mdast);
      } else {
        text = prefix + text;
      }

      text += this.styleTextPostfix(node);

      return text;
    }
  }, {
    key: 'nodeRule',
    value: function nodeRule(type) {
      var rule = this.rule[type] || {};

      if (typeof rule.stringify === 'undefined') {
        rule.stringify = true;
      }

      return rule;
    }
  }, {
    key: 'nodeStyle',
    value: function nodeStyle(type) {
      return this.style[type] || {};
    }
  }, {
    key: 'nodeColor',
    value: function nodeColor(type) {
      return this.color[type] || {};
    }
  }, {
    key: 'styleTextPrefix',
    value: function styleTextPrefix(node) {
      var newStyle = this.updateStyle(node.type),
          result = undefined;

      this.styleStack.push(newStyle);

      return this.buildStyleText(newStyle);
    }
  }, {
    key: 'styleTextPostfix',
    value: function styleTextPostfix(node) {
      this.styleStack.pop();

      var oldStyle = this.styleStack[this.styleStack.length - 1];

      return this.buildStyleText(oldStyle);
    }
  }, {
    key: 'updateStyle',
    value: function updateStyle(type) {
      var nodeStyle = this.nodeStyle(type),
          nodeColor = this.nodeColor(type),
          newStyle = Object.create(this.styleStack[this.styleStack.length - 1]);

      ['bold', 'italic', 'box', 'underline', 'strike'].forEach(function (prop) {
        if (typeof nodeStyle[prop] !== 'undefined') {
          newStyle[prop] = nodeStyle[prop];
        }
      });

      ['color', 'background'].forEach(function (prop) {
        if (typeof nodeColor[prop] !== 'undefined') {
          newStyle[prop] = nodeColor[prop];
        }
      });

      if (typeof nodeStyle.style !== 'undefined') {
        newStyle.style = (newStyle.style || []).concat(nodeStyle);
      }

      return newStyle;
    }
  }, {
    key: 'buildStyleText',

    // abstruct methods

    // style from text
    value: function buildStyleText(style) {
      throw new Error('Convert.prototype.buildStyleText is abstruct method. Please implement in subclasses.');
    }
  }]);

  return Convert;
})();

exports['default'] = Convert;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Ozs7V0FNYSx3QkFBQyxLQUFLLEVBQUU7QUFDcEIsWUFBTSxJQUFJLEtBQUssQ0FBQyxzRkFBc0YsQ0FBQyxDQUFDO0tBQ3pHOzs7U0E5SWtCLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6ImNvbnZlcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtZGFzdCBmcm9tICdtZGFzdCc7XG5cbi8vIGVzY2FwZSB0ZXh0IGZvciBgY29uc29sZS5sb2dgJ3MgZm9ybWF0dGVyLlxuZnVuY3Rpb24gZXNjYXBlVGV4dCh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoLyUvZywgJyUlJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnZlcnQge1xuICBjb25zdHJ1Y3RvcihydWxlLCBzdHlsZSwgbWRhc3QsIGNvbG9yKSB7XG4gICAgdGhpcy5ydWxlID0gcnVsZTtcbiAgICB0aGlzLnN0eWxlID0gc3R5bGU7XG4gICAgdGhpcy5tZGFzdCA9IG1kYXN0O1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcblxuICAgIHRoaXMuc3R5bGVTdGFjayA9IFt7fV07XG4gICAgdGhpcy5hcmdzID0gW107XG4gIH1cblxuICBjb252ZXJ0KG5vZGUpIHtcbiAgICBpZiAoJ2NvbnZlcnRfJyArIG5vZGUudHlwZSBpbiB0aGlzKSB7XG4gICAgICByZXR1cm4gdGhpc1snY29udmVydF8nICsgbm9kZS50eXBlXShub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydERlZmF1bHQobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgY29udmVydF90ZXh0KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS52YWx1ZTtcbiAgfVxuXG4gIGNvbnZlcnRfbGlzdChub2RlKSB7XG4gICAgbGV0XG4gICAgcHJlZml4LCB0ZXh0O1xuXG4gICAgcHJlZml4ID0gdGhpcy5zdHlsZVRleHRQcmVmaXgobm9kZSk7XG4gICAgXG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQuY2hpbGRyZW4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgdmFsdWU6IHRoaXMuY29udmVydChjaGlsZCksXG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgfSk7XG5cbiAgICB0ZXh0ICA9IHByZWZpeCArIG1kYXN0LnN0cmluZ2lmeShub2RlLCB0aGlzLm1kYXN0KTtcbiAgICB0ZXh0ICs9IHRoaXMuc3R5bGVUZXh0UG9zdGZpeChub2RlKTtcblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgY29udmVydERlZmF1bHQobm9kZSkge1xuICAgIGxldFxuICAgIHByZWZpeCwgdGV4dCxcbiAgICBydWxlID0gdGhpcy5ub2RlUnVsZShub2RlLnR5cGUpO1xuXG4gICAgcHJlZml4ID0gdGhpcy5zdHlsZVRleHRQcmVmaXgobm9kZSk7XG5cbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgdGV4dCA9IG5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gdGhpcy5jb252ZXJ0KGNoaWxkKSkuam9pbihydWxlLnNlcGFyYXRvciB8fCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHQgPSBlc2NhcGVUZXh0KG5vZGUudmFsdWUgfHwgJycpO1xuICAgIH1cblxuICAgIGlmIChydWxlLnN0cmluZ2lmeSkge1xuICAgICAgbm9kZS5jaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgfVxuICAgICAgXTtcbiAgICAgIHRleHQgPSBwcmVmaXggKyBtZGFzdC5zdHJpbmdpZnkobm9kZSwgdGhpcy5tZGFzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHQgPSBwcmVmaXggKyB0ZXh0O1xuICAgIH1cblxuICAgIHRleHQgKz0gdGhpcy5zdHlsZVRleHRQb3N0Zml4KG5vZGUpO1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBub2RlUnVsZSh0eXBlKSB7XG4gICAgbGV0XG4gICAgcnVsZSA9IHRoaXMucnVsZVt0eXBlXSB8fCB7fTtcblxuICAgIGlmICh0eXBlb2YgcnVsZS5zdHJpbmdpZnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBydWxlLnN0cmluZ2lmeSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICBub2RlU3R5bGUodHlwZSkge1xuICAgIHJldHVybiB0aGlzLnN0eWxlW3R5cGVdIHx8IHt9O1xuICB9XG5cbiAgbm9kZUNvbG9yKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvclt0eXBlXSB8fCB7fTtcbiAgfVxuXG4gIHN0eWxlVGV4dFByZWZpeChub2RlKSB7XG4gICAgbGV0XG4gICAgbmV3U3R5bGUgPSB0aGlzLnVwZGF0ZVN0eWxlKG5vZGUudHlwZSksIHJlc3VsdDtcblxuICAgIHRoaXMuc3R5bGVTdGFjay5wdXNoKG5ld1N0eWxlKTtcbiAgICBcbiAgICByZXR1cm4gdGhpcy5idWlsZFN0eWxlVGV4dChuZXdTdHlsZSk7XG4gIH1cblxuICBzdHlsZVRleHRQb3N0Zml4KG5vZGUpIHtcbiAgICB0aGlzLnN0eWxlU3RhY2sucG9wKCk7XG5cbiAgICBsZXRcbiAgICBvbGRTdHlsZSA9IHRoaXMuc3R5bGVTdGFja1t0aGlzLnN0eWxlU3RhY2subGVuZ3RoIC0gMV07XG5cbiAgICByZXR1cm4gdGhpcy5idWlsZFN0eWxlVGV4dChvbGRTdHlsZSk7XG4gIH1cblxuICB1cGRhdGVTdHlsZSh0eXBlKSB7XG4gICAgbGV0XG4gICAgbm9kZVN0eWxlID0gdGhpcy5ub2RlU3R5bGUodHlwZSksXG4gICAgbm9kZUNvbG9yID0gdGhpcy5ub2RlQ29sb3IodHlwZSksXG4gICAgbmV3U3R5bGUgPSBPYmplY3QuY3JlYXRlKHRoaXMuc3R5bGVTdGFja1t0aGlzLnN0eWxlU3RhY2subGVuZ3RoIC0gMV0pO1xuXG4gICAgWydib2xkJywgJ2l0YWxpYycsICdib3gnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygbm9kZVN0eWxlW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBuZXdTdHlsZVtwcm9wXSA9IG5vZGVTdHlsZVtwcm9wXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFsnY29sb3InLCAnYmFja2dyb3VuZCddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygbm9kZUNvbG9yW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBuZXdTdHlsZVtwcm9wXSA9IG5vZGVDb2xvcltwcm9wXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygbm9kZVN0eWxlLnN0eWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmV3U3R5bGUuc3R5bGUgPSAobmV3U3R5bGUuc3R5bGUgfHwgW10pLmNvbmNhdChub2RlU3R5bGUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdTdHlsZTtcbiAgfVxuXG5cbiAgLy8gYWJzdHJ1Y3QgbWV0aG9kc1xuXG4gIC8vIHN0eWxlIGZyb20gdGV4dFxuICBidWlsZFN0eWxlVGV4dChzdHlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29udmVydC5wcm90b3R5cGUuYnVpbGRTdHlsZVRleHQgaXMgYWJzdHJ1Y3QgbWV0aG9kLiBQbGVhc2UgaW1wbGVtZW50IGluIHN1YmNsYXNzZXMuJyk7XG4gIH1cbn1cblxuIl19