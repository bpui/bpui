// @ts-nocheck

import "core-js/stable";
import "regenerator-runtime/runtime";

import "febs";
import "./registerHook";

import Vue from "vue";
import bpui from "bpui.js";

// __debug = process.env.NODE_ENV === "development";
// Vue.config.productionTip = false;

//--------------------------------------------------------
// dynamic load components.
//--------------------------------------------------------
bpui
  // load dynamic components
  .registerComponents(Vue)
  // app.
  .then(() => Promise.all([import("./app.vue"), import("./router")]))
  .then((modules: any) => {
    const App = modules[0].default;
    const router: any[] = modules[1].default;

    // 注册应用.
    bpui.registerApp({ routePath: router, basePath: "/bpui" });

    // 创建实例.
    new Vue({
      render: h => h(App)
    }).$mount("#app");
  })
  .catch(e => {
    console.error(e);
  });


// //--------------------------------------------------------
// // static load components.
// //--------------------------------------------------------

// import "bpui.js/static";
// import App from "./app.vue";
// import router from "./router";

// // 注册应用.
// bpui.registerApp({ routePath: router, basePath: "/bpui" });

// // 创建实例.
// export default new Vue({
//   render: h => h(App)
// }).$mount("#app");

// @ts-check