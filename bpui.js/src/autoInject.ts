'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 15:05
* Desc: 自动注册所有 @bpui 下的插件.
*/

export function install(vue, options) {
  // const requireComponent = require.context(
  //   // 其组件目录的相对路径
  //   '@bpui',
  //   // 是否查询其子目录
  //   true,
  //   // 匹配文件名的正则表达式
  //   /src\/vue\/plugins\/index\.(ts|js)$/
  // )

  // requireComponent.keys().forEach(fileName => {
  //   console.log(fileName);
  //   const module = requireComponent(fileName);
  //   if (module.default && typeof module.default.install === 'function') {
  //     module.default.install(vue, options);
  //   }
  // })
}
