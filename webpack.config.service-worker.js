const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = isProdBuild => {
    const options = {
        swDest: 'sw.js',

        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
            {
                urlPattern: 'https://backend.timetable.wueww.de/export/session.json',
                handler: 'StaleWhileRevalidate',
                options: {
                    broadcastUpdate: { channelName: 'session-updates' },
                },
            },
        ],
    };

    if (!isProdBuild) {
        // don't apply pre-caching (during dev) at all
        options.include = [/this-file-better-not-exists/];
    }

    return new WorkboxWebpackPlugin.GenerateSW(options);
};
