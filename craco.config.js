const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.publicPath = 'auto';
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'shell',
          filename: 'remoteEntry.js',
          remotes: {
            product_remote: 'product_remote@http://localhost:3001/remoteEntry.js'
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: deps.react
            },
            'react-dom': {
              singleton: true,
              requiredVersion: deps['react-dom']
            },
            'react-router-dom': {
              singleton: true,
              requiredVersion: deps['react-router-dom']
            }
          }
        })
      );
      return webpackConfig;
    }
  }
};
