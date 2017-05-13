'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    path.join(__dirname, 'src/client/app.jsx')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devServer: {
    historyApiFallback: {
      index: '/assets/'
    },
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            secure: false
        }
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-2", "react-hmre"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader:"url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file"
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
