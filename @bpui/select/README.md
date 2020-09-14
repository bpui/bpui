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
    <bp-select v-model="value3" :datasource="selectdatasource3" filterable :filterhandler="filterhandler"/>
    <bp-select v-model="value4" :datasource="selectdatasource4" cascader/>
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
    filterhandler(key) {
      api.getDatasource().then(data => {
        this.selectdatasource4 = data || [];
      })
    }
  }
}
</script>


```

style

```css
/* scss */
import '@bpui/libs/style';
import '@bpui/select/style';

/* css */
<link href="~@bpui/select/dist/style.css" rel="stylesheet" type="text/css"/>
```

## props

| prop | 描述 | 默认值 |
| :- | :- | :- |
| value | value值；number/string/array；只在multiple和cascader时支持数组； | - |
| datasource | 数据源数组；select在移动端使用时，渲染picker组件，参见picker datasource | - |
| filterable | 可搜索 | false |
| filterhandler | 搜索函数；通过该函数改变datasource；filterable = true时有效 | - |
| multiple | 多选 | - |
| cascader | 联级 | - |

## events

| event | 描述 | 默认值 |
| :- | :- | :- |
| input | input | input: (value) => {} |
