const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const common = require("./webpack.common");
 
module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
        {
            test: /\.js$/i,
            exclude:/node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            }],
        }
    ]
  },
	plugins: [
		new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: "[path][base].gz",
    }),
	]
})