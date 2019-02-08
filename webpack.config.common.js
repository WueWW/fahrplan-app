'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const cssnano = require('cssnano');

const cssLoaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    { loader: 'postcss-loader', options: { plugins: [cssnano()] } },
];

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: './app.js',
    },
    module: {
        rules: [
            { test: /\.tsx?/, loader: 'ts-loader' },
            {
                test: /\.less$/,
                use: [...cssLoaders, 'less-loader'],
            },
            {
                test: /\.css$/,
                use: cssLoaders,
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
                use: 'file-loader?name=[name].[ext]?[hash]',
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/fontwoff',
            },
        ],
    },
    resolve: {
        alias: {
            '../../theme.config$': path.join(__dirname, '/src/styling/theme.config.less'),
        },
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'WueWW App',
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
};
