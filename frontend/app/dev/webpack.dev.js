
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports=merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: './dist'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new MinifyPlugin({},{test:  /[\\/]node_modules[\\/]/}),
        new HtmlWebpackPlugin({
            title: 'Vue App',
            template: path.resolve(__dirname, './src/index.html'),
            excludeChunks: ['vendors']
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module:{
        rules:[
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]',
                            context: path.resolve(__dirname, "./src/assets"),
                            outputPath: './assets',
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    {
                        loader:"sass-loader",
                        options:{
                            sourceMap: true,
                        },

                    } // compiles Sass to CSS, using Node Sass by default
                ]
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

});