import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: process.env.NODE_ENV || 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // Ваш исходный файл HTML
      inject: true, // Вставка в HTML
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Указываем хэш
    }),
  ],
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'), // Путь для сборки
    filename: '[name].[contenthash].js', // Имя JS файла
    publicPath: '', // Абсолютный путь
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
};
