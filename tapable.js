const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require("tapable");

class Car {
  constructor() {
    this.hooks = {
      calculateRoutes: new AsyncParallelHook([
        "source",
        "target",
        "routesList",
      ]),
    };
  }

  tap() {
    this.hooks.calculateRoutes.tapAsync(
      "WarningLampPlugin",
      (source, target, routesList, callback) => {
        console.log(callback);
        setTimeout(() => {
          console.log("message: ", source, target, routesList);
          callback();
        }, 1000);
      }
    );

    this.hooks.calculateRoutes.tapPromise(
      "WarningLampPlugin",
      (source, target, routesList) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log("message2: ", source, target, routesList);
            resolve();
          }, 1000);
        });
      }
    );
  }
  start() {
    this.hooks.calculateRoutes.callAsync("数据1", "数据2", "数据3");
  }
}

const myCar = new Car();

myCar.tap();
myCar.start();
