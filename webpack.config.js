const path = require('path');
const webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";
var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        'js/app': './resource/assets/js/app.js',
        'js/chat': './resource/assets/js/chat.js',
        'js/sendMsg': './resource/assets/js/sendMsg.js',
        'js/post': './resource/assets/js/post.js',
        'js/login': './resource/assets/js/login.js',
        'js/components/notfication/success_noti': './resource/assets/js/components/notfication/success.js',
        'js/components/notfication/error_noti': './resource/assets/js/components/notfication/error.js'
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
                    presets: ['es2015', 'stage-3']
                }
            }
        }, {
            test: /\.(css|scss)$/i,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?[\s\S]+)?$/,
            loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
        }, {
            test: /\.(png|gif|jpg|svg|jpeg)$/i,
            loader: "file-loader?name=images/[name].[ext]"
        }]
    },
    plugins: [
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),*/
        new CopyWebpackPlugin([{
            from: './resource/assets/js/common-scripts.js',
            to: './js/common-scripts.js'
        }, {
            from: './resource/assets/js/jquery.dcjqaccordion.2.7.js',
            to: './js/jquery.dcjqaccordion.2.7.js'
        }, {
            from: './resource/assets/img',
            to: './images'
        }]),
        new ExtractTextPlugin({
            filename: "/css/app.css",
            disable: false,
            allChunks: true
        })
    ]
};