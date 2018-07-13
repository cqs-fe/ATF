/*
 * ATF 后期新页面 使用webpack打包
 * @Author: ZhuQingguang
 * @Date:   2018-06-20
 * @Last Modified by: ZhuQingguang
 * @Last Modified time: 2018-06-20
 */
const path = require('path');
const util = require('./util');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// vue-loader 参考：https://vue-loader.vuejs.org/guide/#vue-cli
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isDevelopment = 'development' === process.env.NODE_ENV;
const isProduction = 'production' === process.env.NODE_ENV;

const entryConfig = util.getEntryConfig('src/pages/**/*.html'); // 获得入口文件配置

const htmlPlugins = entryConfig.html.map(item => {
    return new HtmlWebpackPlugin({
        filename: item.filename,
        template: item.template,
        chunks: ['vendor', 'manifest', 'commons', 'common-css'].concat(item.chunks),
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    });
});
module.exports = {
    mode: 'none',
    entry: Object.assign(entryConfig.entry, {
        // other entries
    }),
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'static/js/[id].js',
        publicPath: isDevelopment ? '/' : '../../'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(bower_components|node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.s?css$/,
                include: /(src|node_modules\/element-ui\/lib)/,
                use: [
                    { 
                        loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
                    },
                    {   loader: 'css-loader', 
                        options: { 
                            url: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    fallback: 'file-loader',
                    name: 'static/img/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader:  'file-loader',
                options: {
                    name: 'static/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build'], { root: process.cwd() }),
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/style/[id].css'
        }),
        ...htmlPlugins,
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }], {})
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common-css',
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json', '.css', '.less']
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        publicPath: '/',
        port: 9000
    }
};
