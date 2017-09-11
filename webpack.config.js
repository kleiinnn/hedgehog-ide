var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        app: './src/client/app/main.ts',
        vendor: './src/client/app/vendor.ts'
    },

    devtool: 'source-map',

    output: {
        path: path.join(__dirname, 'build/dist'),
        filename: '[name].[hash].js',
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader'
                    },
                    'angular2-template-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            /*{
                test: /\.css$/,
                exclude: './build/src/client/app',
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },*/
            {
                test: /\.css$/,
                use: 'raw-loader'
            },
            {
                test: /\.scss$/,
                loader: ['raw-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),

        new HtmlWebpackPlugin({
            template: './src/client/index.html'
        }),
        /*new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        }),*/
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery':'jquery',
            'window.jQuery':'jquery'
        }),
        new webpack.DefinePlugin({
            VERSION: "'" + require('./package.json').version + "'",
        })
    ]


};