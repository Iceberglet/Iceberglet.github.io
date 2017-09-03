var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: ['./source/index.js'],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'source/modules')
    ],
    alias: {
      app: path.resolve('./source/app'),
      resources: path.resolve('./resources')
    },
    extensions: ['.js', '.jsx', '.css','.scss']
  },
  output: {
    path: path.resolve(__dirname, 'resources'),
    filename: 'bundled.js',
    libraryTarget: 'umd',
    library: 'Reacted'
  },
  // devtool: 'eval-source-map', //'#inline-source-map',
  module: {
    rules: [
      // {
      //   test: /\.js?$/,
      //   loader: 'unicode-loader'
      // },
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader'
        }, {
            loader: 'less-loader'
        }]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015','react','stage-2'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader',
            options: { url: false }
        }, {
            loader: 'sass-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader'
        }]
      }
    ],
  },
  plugins: [
        function() {
            this.plugin('watch-run', function(watching, callback) {
                console.log('\nTimeStamp ' + new Date());
                callback();
            })
        },
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin()
  ]
}
