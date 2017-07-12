var path = require('path');
module.exports = {
  entry: ['./source/index.js'],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'source/modules')
    ],
    // root: [
    //   path.resolve('./source/modules')
    // ],
    alias: {
      app: path.resolve('./source/app')
    },
    extensions: ['.js', '.jsx', '.css','.scss']
  },
  output: {
    path: path.resolve(__dirname, 'resources'),
    filename: 'bundled.js',
    libraryTarget: 'umd',
    library: 'Reacted'
  },
  devtool: '#inline-source-map',
  module: {
    rules: [
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
            loader: 'css-loader'
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

    // loaders: [{
    //     test: /\.less$/,
    //     loader: 'style!css!less'
    //   },
    //   {
    //     test: /\.scss$/,
    //     loader: 'style-loader!css!sass!'
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/,
    //     query: {
    //       presets: ['es2015','react','stage-2'],
    //       plugins: ['transform-class-properties']
    //     }
    //   }, {
    //     test: /\.css$/,
    //     loader: 'style-loader!css-loader'
    //   },{
    //     test: /\.jsx?$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/,
    //     query: {
    //       presets: ['es2015','react','stage-2'],
    //       plugins: ['transform-class-properties']
    //     }
    //   }
    // ]
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
