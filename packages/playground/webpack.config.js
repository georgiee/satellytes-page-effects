const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const outputFolder = 'dist';
const env = process.env.NODE_ENV
const PROD = env === 'production';
let mode = 'development';

const additions = [
  // new BundleAnalyzerPlugin({
  //   openAnalyzer: false,
  //   analyzerMode: "static"
  // })
];

const devPlugins = [
  new HTMLWebpackPlugin({
    template: 'src/index.html'
  })
]

const prodPlugins = [
]


if(PROD) {
  mode = 'production';
  additions.push(...prodPlugins);
} else{
  additions.push(...devPlugins);
}


const plugins = [
  ...additions,
  new CleanWebpackPlugin(['dist'])
];

module.exports = {
  entry: {
    "preview": './src/playground.ts'
  },
  mode: mode,
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'images/[hash]-[name].[ext]'
              }
          }]
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
    extensions: [ '.tsx', '.ts', '.js' ],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    library: 'effects',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: '[name].js',
    path: path.resolve(__dirname, outputFolder) //path.resolve(__dirname, 'dist')
  }
};