const path = require("path");
const nodeExternals = require("webpack-node-externals");

const entryPoint = path.join(__dirname, "src", "index.ts");

const ExpressWebpackPlugin = require("../../build/index");

module.exports = {
  target: "node",
  entry: entryPoint,
  output: { filename: "index.js", path: path.join(__dirname, "build") },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [new ExpressWebpackPlugin()],
  resolve: { extensions: [".js", ".ts"] },
  externals: [nodeExternals()],
  stats: "none",
};
