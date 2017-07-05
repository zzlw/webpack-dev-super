var webpack = require('webpack');
var config = require('./base');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * ouput config
 * @type {String}
 */
config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';

/**
 * devtool config
 * @type {String}
 */
config.devtool = "cheap-source-map";

/**
 * loaders config
 * @type {RegExp}
 */
config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css')
}, {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style', 'css!less')
});

/**
 * plugins config
 * @type {[type]}
 */
config.plugins.push(
  // stataic目录下静态资源的复制
  new CopyWebpackPlugin([ {
      context: config.commonPath.rootPath,
      from: 'static/*',
      ignore: ['*.md']
    }
  ]),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // 公共代码分离打包
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'mainifest']
  }),
  // 若要按需加载 CSS 则请注释掉该行
  new ExtractTextPlugin('[name].[contenthash:6].css', {
    allChunks : true
  })
);

module.exports = config;
