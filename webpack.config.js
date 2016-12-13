const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    app: [
      './app/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: isProduction ? '' : 'inline-source-map',
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/app/index.html')
    }),
  ],
  devServer: {
    port: 8888,
    contentBase: 'dist',
    proxy: {
      '/api/v2/**': {
        target: 'http://localhost:4200'
      }
    }
  }
};
