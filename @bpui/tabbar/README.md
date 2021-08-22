# switch

```js
import bpui from '@bpui/table-view';
bpui.bpTabbar
bpui.bpTabbarItem
bpui.bpTabbarItemTitle
```

```html
<bp-tabbar routePath="/tabbar2">
  <bp-tabbar-item routePath="/_1">
    <bp-icon name="heartFill"></bp-icon>
    <bp-tabbar-item-title>dfdf</bp-tabbar-item-title>
  </bp-tabbar-item>
  <bp-tabbar-item routePath="/_2">
    <bp-icon active="true" name="heartFill"></bp-icon>
    <bp-icon active="false" name="heart"></bp-icon>
    <bp-tabbar-item-title>dfdf</bp-tabbar-item-title>
  </bp-tabbar-item>
  <bp-tabbar-item @click.stop="$router.push('/tabbar')">
    <bp-tabbar-item-title>to tabbar1</bp-tabbar-item-title>
  </bp-tabbar-item>
</bp-tabbar>
```

style

```css
/* scss */
import '@bpui/libs/style/class.scss';
import '@bpui/tabbar/style';

/* css */
<link href="~@bpui/tabbar/dist/style.css" rel="stylesheet" type="text/css"/>
```