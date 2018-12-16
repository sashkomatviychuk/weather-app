const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob-all');
const path = require('path');

function findSWPrecachePlugin(element) {
    return element.constructor.name === 'SWPrecacheWebpackPlugin'
}

const importScripts = [
    '/sw.js',
];

module.exports = function override(config, env) {
    if (env === "production") {
        const swPrecachePluginIndex = config.plugins.findIndex(findSWPrecachePlugin);

        if (swPrecachePluginIndex !== -1) {
            //
            const plugin = config.plugins[swPrecachePluginIndex];

            const overridenOptions = {
                ...plugin.workerOptions,
                importScripts,
            };

            config.plugins[swPrecachePluginIndex] = new SWPrecacheWebpackPlugin(
                overridenOptions
            );

            // change it
            config.plugins.push(
                new PurifyCSSPlugin({
                    paths: glob.sync(
                        [
                            path.join(__dirname, 'src/**/*.jsx'),
                        ]
                    ),
                })
            );
        }
    }

    return config;
}