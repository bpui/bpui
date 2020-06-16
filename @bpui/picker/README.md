# picker

```html
<bp-picker 
  v-model="value" 
  :visible.sync="visible" 
  @confirm="onConfirm"  
  @change="onChange" 
  :datasource="[{label:'1',value:1}, {label:'2',value:2}]" />
```

style

```css
/* scss */
import '@bpui/libs/style';
import '@bpui/dialog/style';
import '@bpui/picker/style';

/* css */
<link href="~@bpui/picker/dist/style.css" rel="stylesheet" type="text/css"/>
```