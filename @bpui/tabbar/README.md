# switch

```js
import bpui from '@bpui/table-view';
bpui.bpTableView
```

```html
<bp-table-view tableTitle="常规">
  <bp-table-cell>
    <bp-table-cell-left><bp-icon name="heartFill"/></bp-table-cell-left>
    <bp-table-cell-center>center label</bp-table-cell-center>
    <bp-table-cell-right>right label</bp-table-cell-right>
  </bp-table-cell>
  <bp-table-cell nextArrow="true" @click="()=>{$bpWidget.showToast('click')}">
    <bp-table-cell-left></bp-table-cell-left>
    <bp-table-cell-center>nextArrow</bp-table-cell-center>
  </bp-table-cell>
  <bp-table-cell :disabled="true">
    <bp-table-cell-left></bp-table-cell-left>
    <bp-table-cell-center>disabled</bp-table-cell-center>
  </bp-table-cell>
</bp-table-view>
```

style

```css
/* scss */
import '@bpui/libs/style/class.scss';
import '@bpui/table-view/style';

/* css */
<link href="~@bpui/table-view/dist/style.css" rel="stylesheet" type="text/css"/>
```