var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./entry.js",
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
            loaders: ["style", "css", "sass"]
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
        index: '/home',
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        colors: true,
        progress: true,
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    },
}
