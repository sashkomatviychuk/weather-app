const { GenerateSW } = require('workbox-webpack-plugin');

function findWorkboxPlugin(element) {
    return element.constructor.name === 'GenerateSW'
}

const importScripts = [
    '/sw.js',
];

module.exports = function override(config, env) {
    if (env === "production") {
        const workBoxPluginIndex = config.plugins.findIndex(findWorkboxPlugin);

        if (workBoxPluginIndex !== -1) {
            const plugin = config.plugins[workBoxPluginIndex];

            const overridenOptions = {
                ...plugin.config,
                importScripts,
            };

            config.plugins[workBoxPluginIndex] = new GenerateSW(
                overridenOptions
            );
        }
    }

    return config;
}