


const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')



module.exports = {

    entry: {
        app: './src/main.js',
    },
    plugins: [
        new VueLoaderPlugin(),
        /*new webpack.ProvidePlugin({
            d3: ['d3']
        }),*/

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
                test:  /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            /*{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }*/
            /*{
                test: /\.json$/,
                use: ['raw-loader']
            },*/
           /* {
                test:  /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true
                        }
                    }
                ]
            }*/

        ]
    },
    /*vue:{
        loaders: [
            'vue-style-loader',
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    indentedSyntax: true
                }
            }
        ]
    }
   */
};