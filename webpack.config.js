const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.NODE_DEBUG': JSON.stringify(false)
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { 
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "util": require.resolve("util/"),
        "url": require.resolve("url/"),
        "path": require.resolve("path-browserify"),
        "timers": require.resolve("timers-browserify")
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist.browser'),
    library: 'HuaweiLteApi'
  },
};