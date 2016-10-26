var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
      preLoaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
        }
     ],
        loaders: [
          {
            test: /\.html$/,
            loader: "html-loader"
          },
          { 
            test: /\.scss$/, 
            loaders: ["style", "css", "sass"] 
          },
          {
            test: /\.es6$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015'] 
            }
          },
          {
            test: /\.(jpg|png)$/,
            loader: 'url?limit=25000',
            include: __dirname+"/assets/img"
          },
          {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: 'file?name=assets/fonts/[name].[ext]'
          },
          { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]' },
          { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]' },
          { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]' },
          { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]' },
          { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]' }

        ]
     },
  resolve: {
      extensions: ['', '.js', '.es6']
    },
  devServer: {
      open: true,
      plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
      colors: true,
      progress: true,
  },
}