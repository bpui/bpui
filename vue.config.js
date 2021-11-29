"use strict";

/**
 * Copyright (c) 2017 Copyright bpui All Rights Reserved.
 * Author: lipengxiang
 * Date: 2019-06-14 17:18
 * Desc:
 */
const path = require("path");
const config = require("./config");
const webpackSplitChunks = require('@bpui/build-cli/_scripts/webpack-splitChunks')
const webpackConfig = require('@bpui/build-cli/_scripts/webpack-config')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "_dist",
  publicPath: "/bpui",
  filenameHashing: true,
  productionSourceMap: process.env.NODE_ENV === 'development',
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
    if (process.env.NODE_ENV == 'development') {
      config.devtool('#cheap-module-eval-source-map');
    }
    
    webpackConfig.initResolveAlias(config);
    webpackConfig.initBundleAnalyzer(config);
    webpackConfig.initPluginPreload(config);

    config.resolve.alias
      .set("assets", resolve("src/assets"))
      .set("@", resolve("./src"))
      .set("ext", resolve("./ext"))
      .set("bpui.js", resolve("./bpui.js"))
      .set("@bpui", resolve("./@bpui"))
      .set("./dyn/bpui.components", resolve("./bpui.js/src/dyn/bpui.components.dev"))
      .set("../dyn/bpui.components", resolve("./bpui.js/src/dyn/bpui.components.dev"))
      .set("./static/bpui.components", resolve("./bpui.js/src/static/bpui.components.dev"))
      .set("../static/bpui.components", resolve("./bpui.js/src/static/bpui.components.dev"));
  }
};
