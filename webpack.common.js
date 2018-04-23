const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src', 'genesis.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  target: 'node',
  resolve: {
    modules: [ path.resolve(__dirname, 'src'), 'node_modules' ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      chunkFilename: '[path][name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'env' ],
              plugins: [
                ['transform-react-jsx', { pragma: "require('preact').h" }]
              ]
            }
          },
          'eslint-loader'
        ]
      },
      {
        test: /\.scss?$/,
        // webpack applies loaders from last to first
        use: [
          // MiniCss: builds multiple css files to into one big css file?
          MiniCssExtractPlugin.loader,
          // css-loader: interprets @import and url() like import/require() and will resolve them
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]_[local]___[hash:base64:5]',
              minimize: {
                autoprefixer: {
                  add: true,
                  remove: true,
                  browsers: ['last 2 versions']
                }
              }
            }
          },
          // handles sass!
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}
