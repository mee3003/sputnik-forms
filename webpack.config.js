const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const config = (env) => {
  console.log(env);
  return {
    mode: "production",
    entry: path.resolve(__dirname, "./src/index"),
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },

        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: ["file-loader"],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(env),
      }),
      new CompressionPlugin(),
    ],

    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "./build"),
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
  };
};

module.exports = config;
