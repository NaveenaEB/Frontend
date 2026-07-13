const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: path.resolve(__dirname, 'src', 'main.jsx'),
  mode: 'development',
  devServer: {
    port: 3003,
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist')
  },
  output: {
    publicPath: 'auto'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'salaries_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './SalaryDashboard': './src/SalaryDashboard'
      },
      shared: {
        react: { singleton: true, eager: false, strictVersion: false, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, eager: false, strictVersion: false, requiredVersion: '^18.2.0' }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ]
};
