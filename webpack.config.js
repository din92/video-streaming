const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
    entry: path.join(__dirname, "/src/js/index.js"),
    output: {
          filename: "index.js",
     path: path.join(__dirname, "/src/dist")},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};