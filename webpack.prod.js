const { merge } = require('webpack-merge');
const common = require('./webpack.common');
 
module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
        {
            test: /\.js$/i,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            }],
        }
    ]
  }
})