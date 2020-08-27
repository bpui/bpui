"use strict";

/**
 * Copyright (c) 2017 Copyright bp All Rights Reserved.
 * Author: lipengxiang
 * Date: 2019-06-14 17:18
 * Desc:
 */
const path = require("path");
const config = require("./config");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "_dist",
  publicPath: "/bpui",
  filenameHashing: true,
  devServer: {
    host: config.Host,
    port: config.Port,
    proxy: config.Proxy
  },
  css: {
    loaderOptions: {
      sass: {
        alias: {
          "@": resolve("./src")
        }
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        // data: `@import "~@/components/style/index";`
      },
      stylus: {
        alias: {
          "@": resolve("./src")
        }
      }
    }
  },
  transpileDependencies: [
    // '@bpui/libs',
    // '@bpui/navbar-view',
    // 'bpui.js',
  ],
  // configureWebpack: {},
  chainWebpack: config => {
    config.resolve.alias
      .set("febs", "febs-browser")
      .set("assets", resolve("src/assets"))
      .set("@", resolve("./src"))
      .set("ext", resolve("./ext"))
      .set("bpui.js", resolve("./src/bpui"))
      .set("@bpui", resolve("./@bpui"))
      .set("@bpui/navbar-view", resolve("../components/navbar-view"))
      .set("./bpui.components", resolve("./bpui.js/src/bpui.components.dev"));
  }
};
