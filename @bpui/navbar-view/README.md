# navbarView

```html

<bp-navbar-view />

```

style

```css
/* scss */
import '@bpui/libs/style';
import '@bpui/navbar-view/style';

/* css */
<link href="~@bpui/navbar-view/dist/style.css" rel="stylesheet" type="text/css"/>
```

## inject

会自动注入 $router, $route 对象, 可以在程序入口处添加如下代码取消注入.

```js
import '@bpui/navbar-view/noInject';
import 'bpui.js/static';
```