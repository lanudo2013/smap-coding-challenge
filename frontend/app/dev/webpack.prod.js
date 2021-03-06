

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var prefixPath='../static/';

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, prefixPath+'js'),
        chunkFilename: "[name].js",
        publicPath: '/static/'
    },
    optimization: {
        minimizer:[
            new OptimizeCSSAssetsPlugin({
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },

            }
        },
        runtimeChunk: 'single'
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
            chunkFilename: '../css/[name].css'
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin([prefixPath+'js',prefixPath+'css',prefixPath+'assets'], { allowExternal:true})

    ],
    module:{
        rules:[

            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            context: path.resolve(__dirname, "./src/assets"),
                            outputPath: '../assets/fonts',
                            publicPath: '/static/assets/fonts'
                        }
                    }
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
                            outputPath: '../assets',
                            publicPath: '/static/assets/'
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }


                ]
            }
        ]
    }

});