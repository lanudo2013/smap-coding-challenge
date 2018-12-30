


const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')



module.exports = {

    entry: {
        app: ['./src/main.js']
    },
    plugins: [
        new VueLoaderPlugin()

    ],
    resolve: {
        extensions: [  '.vue', '.js' ],
        alias: {
            'vue$': 'vue/dist/vue.js',
            'src': path.resolve(__dirname, './src'),
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components')
        }
    },

    module:{
        rules:[
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }


        ]
    },

};