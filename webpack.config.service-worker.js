const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = isProdBuild =>
    new WorkboxWebpackPlugin.GenerateSW({
        swDest: 'sw.js',

        // use "cdn" in case of dev-build, since the webpack-dev-server doesn't
        // ship workbox as needed otherwise
        importWorkboxFrom: isProdBuild ? 'local' : 'cdn',

        clientsClaim: true,
        skipWaiting: true,
    });
