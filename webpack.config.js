const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'public');
const STYLES_DIR = path.resolve(__dirname, 'styles');
const APP_DIR = path.resolve(__dirname, 'app');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, include: APP_DIR, loader: 'babel-loader' },
      { test: /\.(scss|css)$/, include: STYLES_DIR, use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" }
      ]}
    ]
  }
}
