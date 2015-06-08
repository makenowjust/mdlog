module.exports = require('./es5/builder')(require('./es5/node/convert'), (function getRule() {
  var
  rgb = process.env.MDLOG_RGB,
  rule = require('./config/rule.json');

  if (/true/i.test(rgb)) {
    rule.consoleRgb = true;
  }

  return rule;
})());
