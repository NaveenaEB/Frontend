const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  // Entry MUST point to index.js which async-imports bootstrap
  // This is required for Webpack Module Federation shared module negotiation
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode: 'development',
  devServer: {
    port: 3003,
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist'),
    // CORS headers required so the shell host can fetch remoteEntry.js
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      // Name must EXACTLY match what the shell references: salaryRemote@http://...
      name: 'salaryRemote',
      filename: 'remoteEntry.js',
      exposes: {
        // Shell imports: import('salaryRemote/SalaryApp')
        './SalaryApp': './src/App',
      },
      shared: {
        react: {
          singleton: true,
          eager: false,
          strictVersion: false,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          eager: false,
          strictVersion: false,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
};
