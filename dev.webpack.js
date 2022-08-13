const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");

const config = (env) => {
  console.log(
    `CURRENT ENV:\n${JSON.stringify(dotenv.config().parsed, undefined, 2)}`
  );

  console.log(env);

  return {
    mode: "development",
    entry: path.resolve(__dirname, "./src/index"),
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: ["file-loader"],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: ["file-loader"],
        },
        {
          test: /\.css$/i,
          include: [/node_modules/],
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.module\.css$/i,
          exclude: [/node_modules/],
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin({
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: "./public/index.html",
      }),

      new webpack.DefinePlugin({
        "process.env": JSON.stringify(env), // it will automatically pick up key values from .env file
      }),
    ],

    output: {
      publicPath: "/",
      filename: "[name].[fullhash].js",
      path: path.resolve(__dirname, "./output/dev"),
    },

    resolve: {
      extensions: [
        ".wasm",
        ".ts",
        ".tsx",
        ".mjs",
        ".cjs",
        ".js",
        ".json",
        ".scss",
        ".css",
      ],
    },

    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, "./output/dev"),
      },
      open: true,
      port: 3001,
    },
  };
};

module.exports = config;
