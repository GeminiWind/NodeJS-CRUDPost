const path = require('path');
const webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";
var extractTextPlugin = require('extract-text-webpack-plugin;')
var extactPlugin = new extractTextPlugin({

})

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        app: './public/js/app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        },
        {
            test: /\.scss$/
            
        }]
    }
};