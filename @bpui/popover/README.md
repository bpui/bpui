# Introduce

```html
<button ref="btn1">show</button>
<bp-popover :bind="$refs.btn1" trigger="hover">
  any content
</bp-popover>
```

style

```css
/* scss */
import '@bpui/libs/style';
import '@bpui/dialog/style';
import '@bpui/popover/style';

/* css */
<link href="~@bpui/popover/dist/style.css" rel="stylesheet" type="text/css"/>
```