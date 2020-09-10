const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeadMeasurePlugin = require('speed-measure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const smp = new SpeadMeasurePlugin();

module.exports = smp.wrap({
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /(node_modules)/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  devServer: { hot: true }
})
