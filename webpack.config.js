const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = (env) => {
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
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin({
        verbose: true,
      }),

      new webpack.DefinePlugin({
        "process.env": JSON.stringify(env),
      }),
    ],

    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "./dist/js"),
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
