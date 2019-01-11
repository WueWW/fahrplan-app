const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const path = require('path');
const serviceWorkerConfig = require('./webpack.config.service-worker');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        port: 3000,
        overlay: true,
        contentBase: path.join(__dirname, 'public'),
    },
    plugins: [serviceWorkerConfig(false)],
});
