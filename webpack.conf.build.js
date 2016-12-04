const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: ['babel-polyfill', './entry.js'],
  resolve:
  {
    extensions: ['', '.js', '.es6', '.css']
  },
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: "bundle.js",
    publicPath: '',
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('style.css')
  ],
  module:
  {
    loaders: [
    {
      test: /\.(es6|js)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
          presets: ['es2015']
      }
    },
    {
      test: /\.html$/,
      loader: "mustache"
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file-loader?name=[path][name].[ext]',
      ]
    },
    {
      test: /\.json?$/,
      loaders: ['json'],
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'file-loader?name=[path][name].[ext]'
    }],
  	colors: true,
  	progress: true,
  },
}
