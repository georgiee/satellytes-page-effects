const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const DeclarationsWebpackPlugin = require('declaration-bundler-webpack-plugin');

const outputFolder = 'dist';

const env = process.env.NODE_ENV
const PROD = env === 'production';
let mode = 'development';

if(PROD) {
  mode = 'production';
} else{
}


const plugins = [
  new CleanWebpackPlugin([outputFolder])
];

module.exports = {
  entry: './src/main.ts',
  mode: mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          {
						loader: 'style-loader'
					},
          {
						loader: 'css-loader'
					},
          {
            loader: 'postcss-loader',
            options: {
							plugins: loader => [
								require('postcss-flexbugs-fixes'),
								autoprefixer({
									flexbox: 'no-2009',
								})
							],
							sourceMap: true,
						},
					},
          {
						loader: 'resolve-url-loader'
					},
          {
						loader: 'sass-loader'
					},
        ]
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    library: 'effect-star-wars',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: '[name].js',
    path: path.resolve(__dirname, outputFolder) //path.resolve(__dirname, 'lib')
  }
};