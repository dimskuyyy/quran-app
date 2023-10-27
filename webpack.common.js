const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  resolve: {
    roots: [path.resolve(__dirname, "assets")],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src/style"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ],
  },
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'dist'),
    },
    watchFiles:["src/*"],
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
  ],
};
