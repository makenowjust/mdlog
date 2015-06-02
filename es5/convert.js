'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
    //  A argument `node` is Markdown's node.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9jb252ZXJ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O3FCQUVLLE9BQU87Ozs7O0FBR3pCLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRTtBQUN4QixTQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2pDOzs7O0lBR29CLE9BQU87Ozs7Ozs7Ozs7Ozs7OztBQWNmLFdBZFEsT0FBTyxDQWNkLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTswQkFkcEIsT0FBTzs7O0FBZ0J4QixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7O0FBR25CLFFBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2QixRQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztHQUNoQjs7ZUF4QmtCLE9BQU87Ozs7Ozs7O1dBK0JuQixpQkFBQyxJQUFJLEVBQUU7O0FBRVosVUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDbEMsZUFBTyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUMzQyxNQUFNO0FBQ0wsZUFBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2xDO0tBQ0Y7Ozs7O1dBR1csc0JBQUMsSUFBSSxFQUFFO0FBQ2pCLGFBQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMvQjs7Ozs7Ozs7V0FNVyxzQkFBQyxJQUFJLEVBQUU7OztBQUNqQixVQUNBLE1BQU0sWUFBQTtV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Q0FBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7T0FDM0Q7O0FBRUQsYUFBTyxRQUFRLENBQUM7S0FDakI7Ozs7O1dBSWEsd0JBQUMsS0FBSyxFQUFFO0FBQ3BCLFlBQU0sSUFBSSxLQUFLLENBQ2IsdURBQXVELEdBQ3ZELGlDQUFpQyxDQUFDLENBQUM7S0FDdEM7OztTQWpMa0IsT0FBTzs7O3FCQUFQLE9BQU8iLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1kYXN0IGZyb20gJ21kYXN0JztcblxuLy8gYGVzY2FwZVRleHRgIGVzY2FwZXMgc3BlY2lmaWVkIHRleHQgZm9yIGBjb25zb2xlLmxvZ2AncyBmb3JtYXR0ZXIuXG5mdW5jdGlvbiBlc2NhcGVUZXh0KHRleHQpIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvJS9nLCAnJSUnKTtcbn1cblxuLy8gYENvbnZlcnRgIGlzIGludGVybmFsIGNsYXNzIHRvIGNvbnZlcnQgTWFya2Rvd24gaW50byB0ZXh0IHN0eWxlZCBmb3IgYGNvbnNvbGUubG9nYCcuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0IHtcblxuICAvLyBgY29uc3RydWN0b3JgIGlzIGBDb252ZXJ0YCBjb25zdHJ1Y3RvciAoY2FsbGluZyBpbXBsaWNpdGx5IHZpYSBgbmV3YCkuXG4gIC8vIFxuICAvLyBlYWNoIG9mIGFyZ3VtZW50cyBkZXNjcmlwdGlvbiBpczpcbiAgLy9cbiAgLy8gICAtIGBydWxlYCBpcyBgT2JqZWN0YCBhcyBkaWN0aW9uYXJ5XG4gIC8vICAgICB0byBzcGVjaWZ5IHRyYW5zbGF0aW9uIHJ1bGVzIGZvciBlYWNoIE1hcmtkb3duJ3Mgbm9kZXMuXG4gIC8vICAgLSBgc3R5bGVgIGlzIGBPYmplY3RgIGFzIGRpY3Rpb25hcnlcbiAgLy8gICAgIHRvIHNwZWNpZnkgc3R5bGVzICh3aXRob3V0IGNvbG9yKSBmb3IgZWFjaCBNYXJrZG93bidzIG5vZGVzLlxuICAvLyAgIC0gYGNvbG9yYCBpcyBgT2JqZWN0YCBhcyBkaWN0aW9uYXJ5XG4gIC8vICAgICB0byBzcGVjaWZ5IGNvbG9yIHN0eWxlcyBmb3IgZWFjaCBNYXJrZG93bidzIG5vZGVzLlxuICAvLyAgIC0gYG1kYXN0YCBpcyBgT2JqZWN0YCBhcyBkaWN0aW9uYXJ5XG4gIC8vICAgICB0byBwYXNzIGBtZGFzdC5zdHJpbmdpZnlgLlxuICBjb25zdHJ1Y3RvcihydWxlLCBzdHlsZSwgbWRhc3QsIGNvbG9yKSB7XG4gICAgLy8gc2F2ZSBhcmd1bWVudHMgaW50byBpbnN0YW5jZS5cbiAgICB0aGlzLnJ1bGUgPSBydWxlO1xuICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcbiAgICB0aGlzLm1kYXN0ID0gbWRhc3Q7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuXG4gICAgLy8gc2V0IGluc3RhbmNlIHZhcmlhYmxlcy5cbiAgICB0aGlzLnN0eWxlU3RhY2sgPSBbe31dO1xuICAgIHRoaXMuYXJncyA9IFtdO1xuICB9XG5cbiAgLy8gYGNvbnZlcnRgIGlzIGNvbnZlcnRpbmcgZW50cnkgcG9pbnQuXG4gIC8vXG4gIC8vICBBIGFyZ3VtZW50IGBub2RlYCBpcyBNYXJrZG93bidzIG5vZGUuXG4gIC8vXG4gIC8vICBJdCByZXR1cm5zIHRleHQgc3R5bGVkIGZvciBgY29uc29sZS5sb2dgLlxuICBjb252ZXJ0KG5vZGUpIHtcbiAgICAvLyBzZXBhcmF0ZSBwcm9jZXNzIGJ5IGBub2RlLnR5cGVgLlxuICAgIGlmICgnY29udmVydF8nICsgbm9kZS50eXBlIGluIHRoaXMpIHtcbiAgICAgIHJldHVybiB0aGlzWydjb252ZXJ0XycgKyBub2RlLnR5cGVdKG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0RGVmYXVsdChub2RlKTtcbiAgICB9XG4gIH1cblxuICAvLyBgY29udmVydF90ZXh0YCBjb252ZXJ0cyBNYXJrZG93bidzIHRleHQgbm9kZSBpbnRvIHRleHQgZm9yIGBjb25zb2xlLmxvZ2AuXG4gIGNvbnZlcnRfdGV4dChub2RlKSB7XG4gICAgcmV0dXJuIGVzY2FwZVRleHQobm9kZS52YWx1ZSk7XG4gIH1cblxuICAvLyBgY29udmVydF9saXN0YCBjb252ZXJ0cyBNYXJrZG93bidzIGxpc3Qgbm9kZSBpbnRvIHRleHQgZm9yIGBjb25zb2xlLmxvZ2AuXG4gIC8vXG4gIC8vIFdoeSB0aGlzIG1ldGhvZCBpcyBuZWVkZWQgaXMgTWFya2Rvd24ncyBsaXN0IG5vZGVzIGFyZSBkaWZmZXJlbmNlIGluIGBPYmplY3RgIHN0cnVjdHVyZVxuICAvLyAoTWFya2Rvd24ncyBsaXN0IG5vZGVzIF9fbW9zdF9fIGNvbnRhaW4gbGlzdEl0ZW0gbm9kZXMgYXMgYG5vZGUuY2hpbGRyZW5gLilcbiAgY29udmVydF9saXN0KG5vZGUpIHtcbiAgICBsZXRcbiAgICBwcmVmaXgsIHRleHQ7XG5cbiAgICBwcmVmaXggPSB0aGlzLnN0eWxlVGV4dFByZWZpeChub2RlKTtcbiAgICBcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZC5jaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICB2YWx1ZTogdGhpcy5jb252ZXJ0KGNoaWxkKSxcbiAgICAgICAgfVxuICAgICAgXTtcbiAgICB9KTtcblxuICAgIHRleHQgID0gcHJlZml4ICsgbWRhc3Quc3RyaW5naWZ5KG5vZGUsIHRoaXMubWRhc3QpO1xuICAgIHRleHQgKz0gdGhpcy5zdHlsZVRleHRQb3N0Zml4KG5vZGUpO1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICAvLyBgY29udmVydERlZmF1bHRgIGNvbnZlcnRzIE1hcmtkb3duJ3Mgbm9kZSBpbnRvIHRleHQgZm9yIGBjb25zb2xlLmxvZ2AuXG4gIGNvbnZlcnREZWZhdWx0KG5vZGUpIHtcbiAgICBsZXRcbiAgICBwcmVmaXgsIHRleHQsXG4gICAgcnVsZSA9IHRoaXMubm9kZVJ1bGUobm9kZS50eXBlKTtcblxuICAgIHByZWZpeCA9IHRoaXMuc3R5bGVUZXh0UHJlZml4KG5vZGUpO1xuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIHRleHQgPSBub2RlLmNoaWxkcmVuXG4gICAgICAgIC5tYXAoKGNoaWxkKSA9PiB0aGlzLmNvbnZlcnQoY2hpbGQpKVxuICAgICAgICAuam9pbihydWxlLnNlcGFyYXRvciB8fCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHQgPSBlc2NhcGVUZXh0KG5vZGUudmFsdWUgfHwgJycpO1xuICAgIH1cblxuICAgIGlmIChydWxlLnN0cmluZ2lmeSkge1xuICAgICAgbm9kZS5jaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgfVxuICAgICAgXTtcbiAgICAgIHRleHQgPSBwcmVmaXggKyBtZGFzdC5zdHJpbmdpZnkobm9kZSwgdGhpcy5tZGFzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHQgPSBwcmVmaXggKyB0ZXh0O1xuICAgIH1cblxuICAgIHRleHQgKz0gdGhpcy5zdHlsZVRleHRQb3N0Zml4KG5vZGUpO1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICAvLyBgbm9kZVJ1bGVgIGdldHMgYSBydWxlIHNwZWNpZmllZCBgdHlwZWAuXG4gIG5vZGVSdWxlKHR5cGUpIHtcbiAgICBsZXRcbiAgICBydWxlID0gdGhpcy5ydWxlW3R5cGVdIHx8IHt9O1xuXG4gICAgaWYgKHR5cGVvZiBydWxlLnN0cmluZ2lmeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJ1bGUuc3RyaW5naWZ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZTtcbiAgfVxuXG4gIC8vIGBub2RlU3R5bGVgIGdldHMgYSBydWxlIHNwZWNpZmllZCBgdHlwZWAuXG4gIG5vZGVTdHlsZSh0eXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuc3R5bGVbdHlwZV0gfHwge307XG4gIH1cblxuICAvLyBgbm9kZUNvbG9yYCBnZXRzIGEgcnVsZSBzcGVjaWZpZWQgYHR5cGVgLlxuICBub2RlQ29sb3IodHlwZSkge1xuICAgIHJldHVybiB0aGlzLmNvbG9yW3R5cGVdIHx8IHt9O1xuICB9XG5cbiAgLy8gYHN0eWxlVGV4dFByZWZpeGAgbWFrZXMgc3R5bGVkIHRleHQgYW5kIHVwZGF0ZSBpbnRlcm5hbCBzdGF0dXMuXG4gIHN0eWxlVGV4dFByZWZpeChub2RlKSB7XG4gICAgbGV0XG4gICAgbmV3U3R5bGUgPSB0aGlzLnVwZGF0ZVN0eWxlKG5vZGUudHlwZSksIHJlc3VsdDtcblxuICAgIHRoaXMuc3R5bGVTdGFjay5wdXNoKG5ld1N0eWxlKTtcbiAgICBcbiAgICByZXR1cm4gdGhpcy5idWlsZFN0eWxlVGV4dChuZXdTdHlsZSk7XG4gIH1cblxuICAvLyBgc3R5bGVUZXh0UG9zdGZpeGAgbWFrZXMgc3R5bGVkIHRleHQgYW5kIHVwZGF0ZSBpbnRlcm5hbCBzdGF0dXMuXG4gIHN0eWxlVGV4dFBvc3RmaXgobm9kZSkge1xuICAgIHRoaXMuc3R5bGVTdGFjay5wb3AoKTtcblxuICAgIGxldFxuICAgIG9sZFN0eWxlID0gdGhpcy5zdHlsZVN0YWNrW3RoaXMuc3R5bGVTdGFjay5sZW5ndGggLSAxXTtcblxuICAgIHJldHVybiB0aGlzLmJ1aWxkU3R5bGVUZXh0KG9sZFN0eWxlKTtcbiAgfVxuXG4gIC8vIGB1cGRhdGVTdHlsZWAgaXMgaW1wbGVtZW50YXRpb24gdXBkYXRpbmcgaW50ZXJuYWwgc3RhdHVzLlxuICB1cGRhdGVTdHlsZSh0eXBlKSB7XG4gICAgbGV0XG4gICAgbm9kZVN0eWxlID0gdGhpcy5ub2RlU3R5bGUodHlwZSksXG4gICAgbm9kZUNvbG9yID0gdGhpcy5ub2RlQ29sb3IodHlwZSksXG4gICAgbmV3U3R5bGUgPSBPYmplY3QuY3JlYXRlKHRoaXMuc3R5bGVTdGFja1t0aGlzLnN0eWxlU3RhY2subGVuZ3RoIC0gMV0pO1xuXG4gICAgWydib2xkJywgJ2l0YWxpYycsICdib3gnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygbm9kZVN0eWxlW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBuZXdTdHlsZVtwcm9wXSA9IG5vZGVTdHlsZVtwcm9wXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFsnY29sb3InLCAnYmFja2dyb3VuZCddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygbm9kZUNvbG9yW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBuZXdTdHlsZVtwcm9wXSA9IG5vZGVDb2xvcltwcm9wXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygbm9kZVN0eWxlLnN0eWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmV3U3R5bGUuc3R5bGUgPSAobmV3U3R5bGUuc3R5bGUgfHwgW10pLmNvbmNhdChub2RlU3R5bGUpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdTdHlsZTtcbiAgfVxuXG5cbiAgLy8gYGJ1aWxkU3R5bGVUZXh0YCBpcyBpbXBsZW1lbnRhdGlvbiBtYWtpbmcgc3R5bGVkIHRleHQgKGFic3RydWN0IG1ldGhvZCkuXG4gIGJ1aWxkU3R5bGVUZXh0KHN0eWxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0NvbnZlcnQucHJvdG90eXBlLmJ1aWxkU3R5bGVUZXh0IGlzIGFic3RydWN0IG1ldGhvZC4gJyArXG4gICAgICAnUGxlYXNlIGltcGxlbWVudCBpbiBzdWJjbGFzc2VzLicpO1xuICB9XG59XG5cbiJdfQ==