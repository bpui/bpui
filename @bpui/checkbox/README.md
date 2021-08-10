# checkbox

```html
<bp-checkbox v-model="checked" >chk1</bp-checkbox>
<bp-checkbox checked="checked" >chk2</bp-checkbox>
<bp-checkbox disabled="disabled" >chk3</bp-checkbox>
<bp-checkbox :checked="true" disabled="disabled" >chk4</bp-checkbox>

<bp-checkbox-group v-model="groupValue" :disabled="groupDisable">
  <bp-checkbox labelValue="1">check1</bp-checkbox>
  <bp-checkbox labelValue="1">check2</bp-checkbox>
  <bp-checkbox labelValue="1">check3</bp-checkbox>
</bp-checkbox-group>
```


style

```css
/* scss */
import '@bpui/libs/style';
import '@bpui/checkbox/style';

/* css */
<link href="~@bpui/checkbox/dist/style.css" rel="stylesheet" type="text/css"/>
```