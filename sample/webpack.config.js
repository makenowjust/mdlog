module.exports = {
  context: __dirname,
  entry: "./readme.js",
  output: "./bundle.js",
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
    ],
  },
  resolve: {
    packageAlias: "browser",
  },
};
