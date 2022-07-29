class MyPlugin {
  apply(compiler) {
    compiler.hooks.initialize.tap("MyPlugin", () => {});

    compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
      console.log("start");
      setTimeout(() => {
        console.log("emit1");
        callback();
      }, 3000);
    });

    compiler.hooks.emit.tapPromise("MyPlugin", (compilation, callback) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("emit2");
          resolve();
        }, 4000);
      });
    });

    compiler.hooks.thisCompilation.tap("MyPlugin", (compilation) => {
      console.log("thisCompilation");
      compilation.hooks.seal.tap("MyPlugin", (compilation) => {
        console.log("seal");
      });
    });

    compiler.hooks.done.tap("MyPlugin", (compilation) => {
      console.log("done");
    });
  }
}

module.exports = MyPlugin;
