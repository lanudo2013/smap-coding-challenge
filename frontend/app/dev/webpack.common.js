


const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')



module.exports = {

    entry: {
        app: './src/main.js',
    },
    plugins: [
        //new webpack.HashedModuleIdsPlugin(),
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
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test:  /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
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