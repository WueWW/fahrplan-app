const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = isProdBuild => {
    const options = {
        swDest: 'sw.js',

        importWorkboxFrom: 'local',

        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
            {
                urlPattern: 'https://wueww.github.io/fahrplan-2019/sessions.json',
                handler: 'staleWhileRevalidate',
                options: {
                    broadcastUpdate: { channelName: 'session-updates' },
                },
            },
        ],
    };

    if (!isProdBuild) {
        // use "cdn" in case of dev-build, since the webpack-dev-server doesn't
        // ship workbox as needed otherwise
        options.importWorkboxFrom = 'cdn';

        // don't apply pre-caching (during dev) at all
        options.include = [/this-file-better-not-exists/];
    }

    return new WorkboxWebpackPlugin.GenerateSW(options);
};
