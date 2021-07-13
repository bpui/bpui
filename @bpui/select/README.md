# select

```js
import bpui from '@bpui/select';

// use this vue component.
bpui.bpSelect
```

```vue
<template>
  <div>
    <bp-select v-model="value1" :datasource="selectdatasource1"/> 
    <bp-select v-model="value2" :datasource="selectdatasource2" multiple/>
    <bp-select v-model="value3" :datasource="selectdatasource3"/>
    <bp-select v-model="value4" :datasource="selectdatasource4"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectdatasource1: [],
      selectdatasource2: [],
      selectdatasource3: [],
      selectdatasource4: [],
      value1: '',
      value2: [],
      value3: '',
      value4: []
    }
  },
  methods: {
  }
}
</script>


```

style

```css
/* scss */
import '@bpui/select/style';

/* css */
<link href="~@bpui/select/dist/style.css" rel="stylesheet" type="text/css"/>
```
