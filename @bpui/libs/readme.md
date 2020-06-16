
libs组件为系统提供基础的工具及基础样式, 如router, nativeScript, gesture等

## Plugins

提供vue插件完成一些任务, 在vue初始化时需要使用插件.

```js
import {VuePlugin as bpVuePlugin} from '@bpui/libs';

Vue.use(bpVuePlugin);
```

引入插件后能完成如下任务:

1. 内部初始化;
2. 非chrome浏览器的滚动动画polyfill
3. $timer对象初始化.
4. 所有 @bpui组件的插件安装.

## typescript

项目使用 ts 编写. js项目使用时, 需要配置相应webpack.