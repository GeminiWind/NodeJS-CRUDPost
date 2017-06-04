const path = require('path');
const webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        'js/app': './resource/js/app.js',
        'js/chat': './resource/js/chat.js',
        'js/post': './resource/js/post.js',
        'js/components/notfication/success_noti': './resource/js/components/notfication/success.js',
        'js/components/notfication/error_noti': './resource/js/components/notfication/error.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/'
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
            test: /\.(css|scss)$/i,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader","sass-loader"]
            })
        },
        {
            test: /\.(woff|woff2|ttf|eot|svg)(\?[\s\S]+)?$/,
            loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
        },
        {
            test: /\.(png|gif|jpg|svg|jpeg)$/i,
            loader: "file-loader?name=images/[name].[ext]"
        }]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "/css/app.css",
        disable: false,
        allChunks: true
      })
    ]
};