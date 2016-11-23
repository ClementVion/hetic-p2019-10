var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
require("babel-polyfill");

module.exports = {
    entry: ['babel-polyfill',"./entry.js"],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            Grapnel: "grapnel"
        }),
        new webpack.ProvidePlugin({
            underscore: 'underscore',
            gsap: 'gsap'
        })
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
        }],
        loaders: [{
            test: /\.html$/,
            loader: "mustache"
        },
        {
            test: /\.json$/,
            loader: "json"
        },
        {
            test: /\.scss$/,
            loaders: ["style", "css", 'postcss-loader', "sass"]
        },
        {
            test: /\.(es6|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.(jpg|png)$/,
            loader: 'url?limit=25000',
            include: __dirname + "/assets/img"
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    devServer: {
        open: true,
        historyApiFallback: true,
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        colors: true,
        progress: true,
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    }
};
