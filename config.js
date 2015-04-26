// loading default configuration
var
defaultConfig = require('./default_config');

// parse LCSV (Labeled Comma Separated Values)
function lcsv(string, def) {
  return string.split(',').map(function (item) {
    var
    idx = item.indexOf('=');
    if (idx === -1) {
      return [item, true];
    }
    return [item.slice(0, idx), item.slice(idx + 1)];
  }).reduce(function (lcsv, item) {
    lcsv[item[0]] = item[1];
    return lcsv;
  }, def);
}

module.exports = lcsv(process.env.MDLOG_CONFIG || '', defaultConfig);
