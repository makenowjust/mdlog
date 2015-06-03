'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// import for `mdast.stringify`.

var _mdast = require('mdast');

var _mdast2 = _interopRequireDefault(_mdast);

// `escapeText` escapes specified text for `console.log`'s formatter.
function escapeText(text) {
  return text.replace(/%/g, '%%');
}

// `Convert` is internal class to convert Markdown into text styled for `console.log`'.

var Convert = (function () {

  // `constructor` is `Convert` constructor (calling implicitly via `new`).
  //
  // each of arguments description is:
  //
  //   - `rule` is `Object` as dictionary
  //     to specify translation rules for each Markdown's nodes.
  //   - `style` is `Object` as dictionary
  //     to specify styles (without color) for each Markdown's nodes.
  //   - `color` is `Object` as dictionary
  //     to specify color styles for each Markdown's nodes.
  //   - `mdast` is `Object` as dictionary
  //     to pass `mdast.stringify`.

  function Convert(rule, style, mdast, color) {
    _classCallCheck(this, Convert);

    // save arguments into instance.
    this.rule = rule;
    this.style = style;
    this.mdast = mdast;
    this.color = color;

    // set instance variables.
    this.styleStack = [{}];
    this.args = [];
  }

  _createClass(Convert, [{
    key: 'convert',

    // `convert` is converting entry point.
    //
    //  An argument `node` is Markdown's node.
    //
    //  It returns text styled for `console.log`.
    value: function convert(node) {
      // separate process by `node.type`.
      if ('convert_' + node.type in this) {
        return this['convert_' + node.type](node);
      } else {
        return this.convertDefault(node);
      }
    }
  }, {
    key: 'convert_text',

    // `convert_text` converts Markdown's text node into text for `console.log`.
    value: function convert_text(node) {
      return escapeText(node.value);
    }
  }, {
    key: 'convert_list',

    // `convert_list` converts Markdown's list node into text for `console.log`.
    //
    // Why this method is needed is Markdown's list nodes are difference in `Object` structure
    // (Markdown's list nodes __most__ contain listItem nodes as `node.children`.)
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

    // `convertDefault` converts Markdown's node into text for `console.log`.
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

    // `nodeRule` gets a rule specified `type`.
    value: function nodeRule(type) {
      var rule = this.rule[type] || {};

      if (typeof rule.stringify === 'undefined') {
        rule.stringify = true;
      }

      return rule;
    }
  }, {
    key: 'nodeStyle',

    // `nodeStyle` gets a rule specified `type`.
    value: function nodeStyle(type) {
      return this.style[type] || {};
    }
  }, {
    key: 'nodeColor',

    // `nodeColor` gets a rule specified `type`.
    value: function nodeColor(type) {
      return this.color[type] || {};
    }
  }, {
    key: 'styleTextPrefix',

    // `styleTextPrefix` makes styled text and update internal status.
    value: function styleTextPrefix(node) {
      var newStyle = this.updateStyle(node.type),
          result = undefined;

      this.styleStack.push(newStyle);

      return this.buildStyleText(newStyle);
    }
  }, {
    key: 'styleTextPostfix',

    // `styleTextPostfix` makes styled text and update internal status.
    value: function styleTextPostfix(node) {
      this.styleStack.pop();

      var oldStyle = this.styleStack[this.styleStack.length - 1];

      return this.buildStyleText(oldStyle);
    }
  }, {
    key: 'updateStyle',

    // `updateStyle` is implementation updating internal status.
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

    // `buildStyleText` is implementation making styled text (abstruct method).
    value: function buildStyleText(style) {
      throw new Error('Convert.prototype.buildStyleText is abstruct method. ' + 'Please implement in subclasses.');
    }
  }]);

  return Convert;
})();

exports['default'] = Convert;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9jb252ZXJ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7cUJBR0ssT0FBTzs7Ozs7QUFHekIsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQ3hCLFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDakM7Ozs7SUFHb0IsT0FBTzs7Ozs7Ozs7Ozs7Ozs7O0FBY2YsV0FkUSxPQUFPLENBY2QsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFOzBCQWRwQixPQUFPOzs7QUFnQnhCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOzs7QUFHbkIsUUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0dBQ2hCOztlQXhCa0IsT0FBTzs7Ozs7Ozs7V0ErQm5CLGlCQUFDLElBQUksRUFBRTs7QUFFWixVQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtBQUNsQyxlQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzNDLE1BQU07QUFDTCxlQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDbEM7S0FDRjs7Ozs7V0FHVyxzQkFBQyxJQUFJLEVBQUU7QUFDakIsYUFBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9COzs7Ozs7OztXQU1XLHNCQUFDLElBQUksRUFBRTs7O0FBQ2pCLFVBQ0EsTUFBTSxZQUFB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QSxDQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUMzRDs7QUFFRCxhQUFPLFFBQVEsQ0FBQztLQUNqQjs7Ozs7V0FJYSx3QkFBQyxLQUFLLEVBQUU7QUFDcEIsWUFBTSxJQUFJLEtBQUssQ0FDYix1REFBdUQsR0FDdkQsaUNBQWlDLENBQUMsQ0FBQztLQUN0Qzs7O1NBakxrQixPQUFPOzs7cUJBQVAsT0FBTyIsImZpbGUiOiJjb252ZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBpbXBvcnQgZm9yIGBtZGFzdC5zdHJpbmdpZnlgLlxuaW1wb3J0IG1kYXN0IGZyb20gJ21kYXN0JztcblxuLy8gYGVzY2FwZVRleHRgIGVzY2FwZXMgc3BlY2lmaWVkIHRleHQgZm9yIGBjb25zb2xlLmxvZ2AncyBmb3JtYXR0ZXIuXG5mdW5jdGlvbiBlc2NhcGVUZXh0KHRleHQpIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvJS9nLCAnJSUnKTtcbn1cblxuLy8gYENvbnZlcnRgIGlzIGludGVybmFsIGNsYXNzIHRvIGNvbnZlcnQgTWFya2Rvd24gaW50byB0ZXh0IHN0eWxlZCBmb3IgYGNvbnNvbGUubG9nYCcuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0IHtcblxuICAvLyBgY29uc3RydWN0b3JgIGlzIGBDb252ZXJ0YCBjb25zdHJ1Y3RvciAoY2FsbGluZyBpbXBsaWNpdGx5IHZpYSBgbmV3YCkuXG4gIC8vIFxuICAvLyBlYWNoIG9mIGFyZ3VtZW50cyBkZXNjcmlwdGlvbiBpczpcbiAgLy9cbiAgLy8gICAtIGBydWxlYCBpcyBgT2JqZWN0YCBhcyBkaWN0aW9uYXJ5XG4gIC8vICAgICB0byBzcGVjaWZ5IHRyYW5zbGF0aW9uIHJ1bGVzIGZvciBlYWNoIE1hcmtkb3duJ3Mgbm9kZXMuXG4gIC8vICAgLSBgc3R5bGVgIGlzIGBPYmplY3RgIGFzIGRpY3Rpb25hcnlcbiAgLy8gICAgIHRvIHNwZWNpZnkgc3R5bGVzICh3aXRob3V0IGNvbG9yKSBmb3IgZWFjaCBNYXJrZG93bidzIG5vZGVzLlxuICAvLyAgIC0gYGNvbG9yYCBpcyBgT2JqZWN0YCBhcyBkaWN0aW9uYXJ5XG4gIC8vICAgICB0byBzcGVjaWZ5IGNvbG9yIHN0eWxlcyBmb3IgZWFjaCBNYXJrZG93bidzIG5vZGVzLlxuICAvLyAgIC0gYG1kYXN0YCBpcyBgT2JqZWN0YCBhcyBkaWN0aW9uYXJ5XG4gIC8vICAgICB0byBwYXNzIGBtZGFzdC5zdHJpbmdpZnlgLlxuICBjb25zdHJ1Y3RvcihydWxlLCBzdHlsZSwgbWRhc3QsIGNvbG9yKSB7XG4gICAgLy8gc2F2ZSBhcmd1bWVudHMgaW50byBpbnN0YW5jZS5cbiAgICB0aGlzLnJ1bGUgPSBydWxlO1xuICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcbiAgICB0aGlzLm1kYXN0ID0gbWRhc3Q7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuXG4gICAgLy8gc2V0IGluc3RhbmNlIHZhcmlhYmxlcy5cbiAgICB0aGlzLnN0eWxlU3RhY2sgPSBbe31dO1xuICAgIHRoaXMuYXJncyA9IFtdO1xuICB9XG5cbiAgLy8gYGNvbnZlcnRgIGlzIGNvbnZlcnRpbmcgZW50cnkgcG9pbnQuXG4gIC8vXG4gIC8vICBBbiBhcmd1bWVudCBgbm9kZWAgaXMgTWFya2Rvd24ncyBub2RlLlxuICAvL1xuICAvLyAgSXQgcmV0dXJucyB0ZXh0IHN0eWxlZCBmb3IgYGNvbnNvbGUubG9nYC5cbiAgY29udmVydChub2RlKSB7XG4gICAgLy8gc2VwYXJhdGUgcHJvY2VzcyBieSBgbm9kZS50eXBlYC5cbiAgICBpZiAoJ2NvbnZlcnRfJyArIG5vZGUudHlwZSBpbiB0aGlzKSB7XG4gICAgICByZXR1cm4gdGhpc1snY29udmVydF8nICsgbm9kZS50eXBlXShub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydERlZmF1bHQobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYGNvbnZlcnRfdGV4dGAgY29udmVydHMgTWFya2Rvd24ncyB0ZXh0IG5vZGUgaW50byB0ZXh0IGZvciBgY29uc29sZS5sb2dgLlxuICBjb252ZXJ0X3RleHQobm9kZSkge1xuICAgIHJldHVybiBlc2NhcGVUZXh0KG5vZGUudmFsdWUpO1xuICB9XG5cbiAgLy8gYGNvbnZlcnRfbGlzdGAgY29udmVydHMgTWFya2Rvd24ncyBsaXN0IG5vZGUgaW50byB0ZXh0IGZvciBgY29uc29sZS5sb2dgLlxuICAvL1xuICAvLyBXaHkgdGhpcyBtZXRob2QgaXMgbmVlZGVkIGlzIE1hcmtkb3duJ3MgbGlzdCBub2RlcyBhcmUgZGlmZmVyZW5jZSBpbiBgT2JqZWN0YCBzdHJ1Y3R1cmVcbiAgLy8gKE1hcmtkb3duJ3MgbGlzdCBub2RlcyBfX21vc3RfXyBjb250YWluIGxpc3RJdGVtIG5vZGVzIGFzIGBub2RlLmNoaWxkcmVuYC4pXG4gIGNvbnZlcnRfbGlzdChub2RlKSB7XG4gICAgbGV0XG4gICAgcHJlZml4LCB0ZXh0O1xuXG4gICAgcHJlZml4ID0gdGhpcy5zdHlsZVRleHRQcmVmaXgobm9kZSk7XG4gICAgXG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQuY2hpbGRyZW4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgdmFsdWU6IHRoaXMuY29udmVydChjaGlsZCksXG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgfSk7XG5cbiAgICB0ZXh0ICA9IHByZWZpeCArIG1kYXN0LnN0cmluZ2lmeShub2RlLCB0aGlzLm1kYXN0KTtcbiAgICB0ZXh0ICs9IHRoaXMuc3R5bGVUZXh0UG9zdGZpeChub2RlKTtcblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgLy8gYGNvbnZlcnREZWZhdWx0YCBjb252ZXJ0cyBNYXJrZG93bidzIG5vZGUgaW50byB0ZXh0IGZvciBgY29uc29sZS5sb2dgLlxuICBjb252ZXJ0RGVmYXVsdChub2RlKSB7XG4gICAgbGV0XG4gICAgcHJlZml4LCB0ZXh0LFxuICAgIHJ1bGUgPSB0aGlzLm5vZGVSdWxlKG5vZGUudHlwZSk7XG5cbiAgICBwcmVmaXggPSB0aGlzLnN0eWxlVGV4dFByZWZpeChub2RlKTtcblxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICB0ZXh0ID0gbm9kZS5jaGlsZHJlblxuICAgICAgICAubWFwKChjaGlsZCkgPT4gdGhpcy5jb252ZXJ0KGNoaWxkKSlcbiAgICAgICAgLmpvaW4ocnVsZS5zZXBhcmF0b3IgfHwgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0ID0gZXNjYXBlVGV4dChub2RlLnZhbHVlIHx8ICcnKTtcbiAgICB9XG5cbiAgICBpZiAocnVsZS5zdHJpbmdpZnkpIHtcbiAgICAgIG5vZGUuY2hpbGRyZW4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgICB0ZXh0ID0gcHJlZml4ICsgbWRhc3Quc3RyaW5naWZ5KG5vZGUsIHRoaXMubWRhc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0ID0gcHJlZml4ICsgdGV4dDtcbiAgICB9XG5cbiAgICB0ZXh0ICs9IHRoaXMuc3R5bGVUZXh0UG9zdGZpeChub2RlKTtcblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgLy8gYG5vZGVSdWxlYCBnZXRzIGEgcnVsZSBzcGVjaWZpZWQgYHR5cGVgLlxuICBub2RlUnVsZSh0eXBlKSB7XG4gICAgbGV0XG4gICAgcnVsZSA9IHRoaXMucnVsZVt0eXBlXSB8fCB7fTtcblxuICAgIGlmICh0eXBlb2YgcnVsZS5zdHJpbmdpZnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBydWxlLnN0cmluZ2lmeSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICAvLyBgbm9kZVN0eWxlYCBnZXRzIGEgcnVsZSBzcGVjaWZpZWQgYHR5cGVgLlxuICBub2RlU3R5bGUodHlwZSkge1xuICAgIHJldHVybiB0aGlzLnN0eWxlW3R5cGVdIHx8IHt9O1xuICB9XG5cbiAgLy8gYG5vZGVDb2xvcmAgZ2V0cyBhIHJ1bGUgc3BlY2lmaWVkIGB0eXBlYC5cbiAgbm9kZUNvbG9yKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvclt0eXBlXSB8fCB7fTtcbiAgfVxuXG4gIC8vIGBzdHlsZVRleHRQcmVmaXhgIG1ha2VzIHN0eWxlZCB0ZXh0IGFuZCB1cGRhdGUgaW50ZXJuYWwgc3RhdHVzLlxuICBzdHlsZVRleHRQcmVmaXgobm9kZSkge1xuICAgIGxldFxuICAgIG5ld1N0eWxlID0gdGhpcy51cGRhdGVTdHlsZShub2RlLnR5cGUpLCByZXN1bHQ7XG5cbiAgICB0aGlzLnN0eWxlU3RhY2sucHVzaChuZXdTdHlsZSk7XG4gICAgXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRTdHlsZVRleHQobmV3U3R5bGUpO1xuICB9XG5cbiAgLy8gYHN0eWxlVGV4dFBvc3RmaXhgIG1ha2VzIHN0eWxlZCB0ZXh0IGFuZCB1cGRhdGUgaW50ZXJuYWwgc3RhdHVzLlxuICBzdHlsZVRleHRQb3N0Zml4KG5vZGUpIHtcbiAgICB0aGlzLnN0eWxlU3RhY2sucG9wKCk7XG5cbiAgICBsZXRcbiAgICBvbGRTdHlsZSA9IHRoaXMuc3R5bGVTdGFja1t0aGlzLnN0eWxlU3RhY2subGVuZ3RoIC0gMV07XG5cbiAgICByZXR1cm4gdGhpcy5idWlsZFN0eWxlVGV4dChvbGRTdHlsZSk7XG4gIH1cblxuICAvLyBgdXBkYXRlU3R5bGVgIGlzIGltcGxlbWVudGF0aW9uIHVwZGF0aW5nIGludGVybmFsIHN0YXR1cy5cbiAgdXBkYXRlU3R5bGUodHlwZSkge1xuICAgIGxldFxuICAgIG5vZGVTdHlsZSA9IHRoaXMubm9kZVN0eWxlKHR5cGUpLFxuICAgIG5vZGVDb2xvciA9IHRoaXMubm9kZUNvbG9yKHR5cGUpLFxuICAgIG5ld1N0eWxlID0gT2JqZWN0LmNyZWF0ZSh0aGlzLnN0eWxlU3RhY2tbdGhpcy5zdHlsZVN0YWNrLmxlbmd0aCAtIDFdKTtcblxuICAgIFsnYm9sZCcsICdpdGFsaWMnLCAnYm94JywgJ3VuZGVybGluZScsICdzdHJpa2UnXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIG5vZGVTdHlsZVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbmV3U3R5bGVbcHJvcF0gPSBub2RlU3R5bGVbcHJvcF07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBbJ2NvbG9yJywgJ2JhY2tncm91bmQnXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIG5vZGVDb2xvcltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbmV3U3R5bGVbcHJvcF0gPSBub2RlQ29sb3JbcHJvcF07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIG5vZGVTdHlsZS5zdHlsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5ld1N0eWxlLnN0eWxlID0gKG5ld1N0eWxlLnN0eWxlIHx8IFtdKS5jb25jYXQobm9kZVN0eWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U3R5bGU7XG4gIH1cblxuXG4gIC8vIGBidWlsZFN0eWxlVGV4dGAgaXMgaW1wbGVtZW50YXRpb24gbWFraW5nIHN0eWxlZCB0ZXh0IChhYnN0cnVjdCBtZXRob2QpLlxuICBidWlsZFN0eWxlVGV4dChzdHlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdDb252ZXJ0LnByb3RvdHlwZS5idWlsZFN0eWxlVGV4dCBpcyBhYnN0cnVjdCBtZXRob2QuICcgK1xuICAgICAgJ1BsZWFzZSBpbXBsZW1lbnQgaW4gc3ViY2xhc3Nlcy4nKTtcbiAgfVxufVxuIl19