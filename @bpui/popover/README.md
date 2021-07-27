# Introduce

```html
<button ref="btn1">show</button>
<bp-popover :bind="$refs.btn1" trigger="hover">
  any content
</bp-popover>

<bp-popover :bind="$refs.btn3" direction="right" trigger="click">
  <div class="bp-popover__cell">cell 1</div>
  <div class="bp-popover__cell">cell 2</div>
  <div class="bp-popover__cell">cell 3</div>
  <div class="bp-popover__cell">cell 4</div>
  <div class="bp-popover__cellWarn">cell warn</div>
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