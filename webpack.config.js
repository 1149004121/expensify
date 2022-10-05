const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      loader: "babel-loader",
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      //loader加载的顺序是规定的，是从右往左，所以style-loader要放在css-loader之前
      //css-loader以字符串形式读取CSS文件。style-loader获取这些样式并创建<style>页中的标记<head>包含这些样式的元素
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  }
}