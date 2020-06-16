# dialog

```html
<bp-dialog :visible.sync="visible" title="title">
  dialog1 content
  <div slot="foot">
    <button @click="visible=false">close</button>
    <button>ok</button>
  </div>
</bp-dialog>
```


style

```css
/* scss */
import '@bpui/libs/style';
import '@bpui/dialog/style';

/* css */
<link href="~@bpui/dialog/dist/style.css" rel="stylesheet" type="text/css"/>
```