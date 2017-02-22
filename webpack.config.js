var path = require('path');
module.exports = {
  entry: ['./source/index.js'],
  resolve: {
    root: [
      path.resolve('./source/modules')
    ],
    alias: {
      app: path.resolve('./source/app'),
      css: path.resolve('./source/app')
    },
    extensions: ['', '.js', '.jsx', '.css','.scss']
  },
  output: {
    path: './resources/',
    filename: 'bundled.js',
    libraryTarget: 'var',
    library: 'Reacted'
  },
  devtool: '#inline-source-map',
  module: {
    loaders: [{
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css!sass'
      },{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015','react','stage-2']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015','react','stage-2']
      }
    }]
  },
  plugins: [
        function() {
            this.plugin('watch-run', function(watching, callback) {
                console.log('\nTimeStamp ' + new Date());
                callback();
            })
        }
  ]
}
