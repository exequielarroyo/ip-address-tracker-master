const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ["./src/index.js", "./src/scss/style.scss"],
  mode: devMode ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    //   filename: "./index.html",
    // }),
    new MiniCssExtractPlugin({
      filename: "main.css",
      // chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        // options: { minimize: true },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // {
          //   loader: "style-loader",
          //   // options: {
          //   //   modules: true,
          //   // },
          // },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            // Use PostCSS to minify and autoprefix with vendor rules
            // for older browser compatibility
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // We instruct PostCSS to use postcss-preset-env
                // when in production mode, otherwise do nothing
                plugins: devMode
                  ? []
                  : [
                      [
                        'postcss-preset-env',
                        {
                          // Compile our CSS code to support browsers
                          // that are used in more than 1% of the
                          // global market browser share. You can modify
                          // the target browsers according to your needs
                          // by using supported queries.
                          // https://github.com/browserslist/browserslist#queries
                          browsers: ['>1%'],
                        },
                      ],
                    ],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    // port: 9000,
  },
};
