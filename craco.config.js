const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const deps = require("./package.json").dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.publicPath = "auto";

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "shell",

          remotes: {
            product_remote:
              "product_remote@http://localhost:3001/remoteEntry.js",
            users_remote:
              "users_remote@http://localhost:3002/remoteEntry.js",
            salaries_remote:
              "salaries_remote@http://localhost:3003/remoteEntry.js",
          },

          shared: {
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
            "react-router-dom": {
              singleton: true,
              requiredVersion: deps["react-router-dom"],
            },
          },
        })
      );

      return webpackConfig;
    },
  },
};