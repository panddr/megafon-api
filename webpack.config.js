var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var config = require('config');

var isDev = (process.env.NODE_ENV === 'development');
var appEntry = './client/app';

var defineEnvPlugin = new webpack.DefinePlugin({
  __DEV__: isDev,
  "process.env": {
    BROWSER: JSON.stringify(true)
  }
});

var entryScripts = [ appEntry ];
var output = {
  path: path.join(__dirname, [ '/', config.get('buildDirectory') ].join('')),
  filename: 'bundle.js'
};

var plugins = [
  defineEnvPlugin,
  new ExtractTextPlugin('style.css'),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  new webpack.NoErrorsPlugin()
];

var moduleLoaders = [
  {
    test: /\.js$/,
    loaders: [ 'babel' ],
    exclude: /node_modules/,
    include: __dirname
  }, {
    test: /\.css?$/,
    loaders: [ ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'), 'raw' ],
    include: __dirname
  }, {
    test: /\.scss?$/,
    loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader']),
    include: __dirname
  }
];

if (isDev) {
  output.publicPath = 'http://192.168.0.101:3001/';
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entryScripts = [
    'webpack-dev-server/client?http://192.168.0.101:3001',
    'webpack/hot/only-dev-server',
    appEntry
  ];

  moduleLoaders = [
    {
      test: /\.js$/,
      loaders: [ 'react-hot', 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: [ 'style-loader', 'css-loader' ],
      include: __dirname
    }, {
      test: /\.scss?$/,
      loaders: [ 'style', 'css', 'sass', 'postcss-loader' ],
      include: __dirname
    }
  ];
}

module.exports = {
  devtool: 'eval',
  entry: entryScripts,
  output: output,
  plugins: plugins,
  module: {
    loaders: moduleLoaders
  },
  postcss: function () {
    return [autoprefixer];
  }
};
