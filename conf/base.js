'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var rootPath = path.resolve(__dirname, '..');     // 项目根目录
var srcPath = path.join(rootPath, 'src');             // 开发源码目录
var env = process.env.NODE_ENV.trim();            // 当前环境

var commonPath = {
  rootPath: rootPath,
  srcPath: srcPath,
  public: path.join(rootPath, 'public'),              // build 后输出目录
  indexHTML: path.join(srcPath, 'index.html'),        // 入口模板页面
  staticDir: path.join(rootPath, 'static')        // 不需编译的静态资源
};

module.exports = {
    commonPath: commonPath,
    entry: {
      app: path.join(srcPath, 'index.js'),
      vendor: [
        'history',
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'react-router-redux',
        'redux',
        'redux-thunk'
      ]
    },
    output: {
      path: commonPath.public,
      publicPath: '/static/'
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      alias: { }
    },
    module: {
      loaders: [
        {
          test: /\.js[x]?$/,
          loaders: ['react-hot', 'babel?cacheDirectory=true'],
          exclude: path.join(rootPath, 'node_modules')
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.html$/,
          loader: 'html'
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'url',
          query: {
            limit: 10240, // 10KB 以下使用 base64
            name: 'img/[name]-[hash:6].[ext]'
          }
        }, {
          test: /\.(woff2?|eot|ttf|otf)$/,
          loader: 'url-loader?limit=10240&name=[name]-[hash:6].[ext]'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'your app title',
        template: commonPath.indexHTML
      }),
      new webpack.DefinePlugin({
        __DEV__: env === 'development',
        __PROD__: env === 'production'
      })
    ]
};
