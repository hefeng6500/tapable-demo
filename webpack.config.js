const MyPlugin = require("./plugins/MyPlugin.js");
const DateTagPlugin = require("./plugins/DateTagPlugin.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    // new MyPlugin(),
    new HtmlWebpackPlugin(),
    new DateTagPlugin(),
  ],
};
