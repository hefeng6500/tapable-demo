const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");

class DateTagPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("DateTagPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "DateTagPlugin",
        (data, cb) => {
          const dateTime = this.generateDateTime();
          const versionInfo = `Current Version Build At ${dateTime}`;

          data.html = data.html.replace(
            "</head>",
            `<script>console.log('${versionInfo}')</script></head>`
          );
          cb(null, data);
        }
      );
    });
  }

  generateDateTime() {
    const date = new Date();

    return (
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate() +
      " " +
      date.getUTCHours() +
      ":" +
      date.getUTCMinutes() +
      ":" +
      date.getUTCSeconds()
    );
  }
}

module.exports = DateTagPlugin;
