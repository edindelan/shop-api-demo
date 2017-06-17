const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    context: resolve(__dirname, 'src'),

    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        './index.js'
    ],

    devtool: 'source-map',

    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',

        publicPath: '/'
    },

    devServer: {
        hot: true,

        contentBase: resolve(__dirname, 'dist'),

        publicPath: '/',
        port: 3000,

    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "less-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.png|.jpg$/,
                exclude: /node_modules/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
};
