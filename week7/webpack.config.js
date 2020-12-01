const { resolve } = require('path');
const { sync } = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ASSET_PATH = process.env.ASSET_PATH;

const config = {
  entry: {
    index: '/src/js/index.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: './js/[name].bundle.js',
    // publicPath: process.env.production ? '/hexschool_css/week3/dist/' : '/'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader:  'pug-loader',
            options: {
              self: true, // 這個要加
              pretty: true,
            },
          },
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            // 配置 Babel 解析器 (第三步)
            presets: ['@babel/preset-env'],
          },
        },
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: '[name].css'
    }),
  ]
}

// 透過 glob 找出所有 pug 檔後用 for 迴圈寫入 plugins 裡面
sync('./src/pug/*.pug').forEach((path) => {
  const start = path.indexOf('/pug/') + 5;
  const end = path.length - 4;
  const name = path.slice(start, end);
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/pug/' + name + '.pug',
      filename: name + '.html',
      inject: true,
      minify: {
        sortAttributes: true,
        collapseWhitespace: false,
        collapseBooleanAttributes: true,
        removeComments: true
      }
    })
  );
});
// config.plugins.push()
module.exports = (env, argv) => {
  if (argv.mode == 'development') {}
  if (argv.mode == 'production') {

  }
  return config;
}