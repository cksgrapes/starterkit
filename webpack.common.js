const path = require('path');
const fs = require('fs');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

/**
 * ローカルのファイル一覧を取得する
 * @param dir
 * @param files
 * @returns {Array|*}
 */
const getFileList = (dir, files = []) => {
  let paths = fs.readdirSync(dir);
  const dirs = [];

  paths = paths.filter(file => /^(?!_).*$/.test(file));

  for (const path of paths) {
    const stats = fs.statSync(`${dir}/${path}`);
    if (stats.isDirectory()) {
      dirs.push(`${dir}/${path}`);
    } else {
      files.push(`${dir}/${path}`);
    }
  }

  for (const d of dirs) {
    files = getFileList(d, files);
  }

  return files;
};

/**
 * HtmlWebpackPluginの処理を取得
 * @returns {HtmlWebpackPlugin[]}
 */
const getHtmlWebpackPlugins = () => {
  const dirPath = './src/pages';
  const list = getFileList(dirPath);
  const regExp = new RegExp( `${dirPath}/(.*).pug$`, "g" ) ;
  return list.map(path => {
    return new HtmlWebpackPlugin({
      filename: path.replace(regExp, "$1.html"),
      template: path,
      inject: false
    });
  });
};

/**
 * CopyWebpackPluginの処理を取得
 * @returns {(*|CopyPlugin)[]}
 */
const getCopyWebpackPlugin = () => {
  return [
    new CopyWebpackPlugin([
      { from: 'src/files', to: 'assets' },
    ])
  ];
};

/**
 * ImageminPluginの処理を種t区
 * @returns {(ImageminWebpackPlugin | *)[]}
 */
const getImageminPlugin = () => {
  return [
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      externalImages: {
        context: 'src/images',
        sources: glob.sync('src/images/**/*'),
        destination: 'public/assets/images',
        fileName: '[path][name].[ext]'
      },
      pngquant: {
        quality: '95-100'
      },
      plugins: [
        imageminMozjpeg({
          quality: 80,
          progressive: true
        })
      ]
    })
  ];
};

/**
 * プラグイン設定
 * @returns {*[]}
 */
const allPluginsSettings = () => {
  let plugins = [];

  plugins = plugins.concat(getHtmlWebpackPlugins());
  plugins = plugins.concat(getCopyWebpackPlugin());
  plugins = plugins.concat(getImageminPlugin());

  return plugins;
};

module.exports = {
  entry: ['./src/scripts/common.js','./src/styles/common.scss'],
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'assets/scripts/common.js',
    sourceMapFilename: 'maps/[file].map',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/styles/[name].css',
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require('fibers'),
              },
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: require('postcss-comment')
            }
          }
        ]
      }
    ]
  },
  plugins: allPluginsSettings()
};
