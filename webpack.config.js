const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') //自动删除dist中的文件
const webpack = require('webpack')
const config = {
    mode: 'development',
    entry: {
        index: `${__dirname}/src/index.js` //打包入口 
    },
    output: {
        path: `${__dirname}/dist` , //生成在项目根目录的dist文件夹中
        filename: '[name].js'
    },
    resolve: {
        alias: {
            '@': `${__dirname}/src` , //import 引入的别名
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    {
                        loader: 'less-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            if (process.env.NODE_ENV === 'development') {
                                return '[path][name].[ext]';
                            }

                            return '[hash].[ext]';
                        },
                         publicPath: 'assets/images',
                         outputPath: 'assets/images'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/index.html` //自动生成index.html模板地址会自动把打包后的index.js引入
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: `${__dirname}/dist` ,
        open: false,
        port: 8080,
        hot: true,
        hotOnly: true
    },
    optimization: {
        minimize: true
    },
    devtool: 'cheap-module-eval-source-map' //生成列文件路径，給各个模块也生成，使用eval方式进行编译打包，生成source-map文件。
}
module.exports = config