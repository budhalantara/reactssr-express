const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const development = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  output: {
    path: `${__dirname}/client`
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  mode: 'development'
}

const production = {
  entry: {
    "server/index": './server/production.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js"
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([{
      from: `build`, to: 'client'
    }])
  ],
  target: 'node',
  mode: 'production'
}

module.exports = (env) => {
  if(env === 'development') 
    return development;
  
  return production;
};