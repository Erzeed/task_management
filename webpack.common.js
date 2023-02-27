const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/app.js'),
    swFirebase: path.join(__dirname, './src/scripts/firebase-messaging-sw.js'),
  },
  output: {
    filename: pathData => {
      return pathData === 'swFirebase' ? 'firebase-messaging-sw.js' : '[name].bundle.js';
    },
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /styles/,
        use: ['to-string-loader', 'css-loader'],
      },
      {
        test: /\.css$/i,
        include: /styles/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(webp|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WebpackPwaManifest({
      id: 'wgether-task-management',
      name: 'wgther',
      short_name: 'Wgether',
      description: 'web app to manage skripsi',
      background_color: '#ffff',
      crossorigin: null,
      publicPath: './',
      filename: 'app.manifest.json',
      start_url: './index.html',
      icons: [
        {
          src: path.resolve('src/asset/img/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      maximumFileSizeToCacheInBytes: 26214400,
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      swDest: './sw.bundle.js'
    }),
  ],
};
