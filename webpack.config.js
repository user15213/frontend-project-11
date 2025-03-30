const path = require('path');

module.exports = {
  entry: './src/index.js', // Главный файл вашего проекта
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Для обработки CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // Для обработки SCSS
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
