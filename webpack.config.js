const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

const clientConfig = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: './index.js'
  },
  module: {
    rules: [
      { //resourse loaders
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset/resource'
      },
      { //css loader
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      { //js and jsx loader
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "client", "index.html")
    })
  ]
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: 'node',
  output: {
    path: __dirname,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    library: {
      type: 'commonjs2'
    }
  },
  externalsPresets: {
    node: true
  },
  externals: [
    NodeExternals(),
    ({context, request = ''}, cb) => {
      if (/database|environments|newrelic|benchmarking/.test(request)) {
        if (/..\//.test(request)) {
          return cb(null, `commonjs ${request.slice(request.lastIndexOf('../') + 1)}`);
        }
        return cb(null, `commonjs ${request}`);
      }
      cb();
    }
  ],
  module: {
    rules: [
      { //css loader
        test: /\.css$/i,
        use: ['ignore-loader'],
      },
      { //js and jsx loader
        test: /\.(js|jsx)$/,
        exclude: /node_modules|environments|database|newrelic|benchmarking/,
        use: ['babel-loader']
      }
    ]
  }
}


module.exports = [clientConfig, serverConfig];
