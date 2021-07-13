<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-09-14
* Desc:
*/
-->
<template>
  <div
    class="bp-select"
    v-clickoutside="handleClose"
  >
    <div
      class="bp-select__main"
      :class="{
        'is-cascader': isCascader,
        'is-multiple': isMultiple,
        'is-single': isSingle,
      }"
      @click="onClickSelectMain"
      ref="reference"
    >
      <div class="bp-select__mainContain is-cascader" v-if="isCascader">
        <span class="bp-select__cascaderItem" v-for="(item, i) in selectedCascaderItems" :key="i">
          {{item.label}}
        </span>
        <i></i>
      </div>

      <div class="bp-select__mainContain is-multiple" v-else-if="isMultiple">
        <span class="bp-select__tag" v-for="(item, i) in selectedItems" :key="i">
          {{item.label}}
          <i @click.stop="onClickDelTag(item, i)"></i>
        </span>
        <i></i>
      </div>

      <div class="bp-select__mainContain is-single" v-else v-show="!isQueryShow" :class="singleCurrentLabel?'':'bp-select__mainContain__emptyOption'">
        <span>
          {{singleCurrentLabel||emptyLabel}}
        </span>
        <i></i>
      </div>

      <div class="bp-select__query" :class="{'is-single': isSingle, 'is-multiple': isMultiple}" v-if="isQueryShow">
        <input
          type="text"
          ref="queryInput"
          :placeholder="placeholder"
          :value="query"
          @blur="onQueryBlur"
          @focus="onQueryFocus"
          @input="onQueryInput"
          @keyup="onQueryKeyup"
          @change="onQueryChange">
      </div>
    </div>
    <bp-icon class="bp-select__arrowDown" :class="isDropdownShow?'bp-select__arrowDownR':''" width="12px" height="12px" color="#dcdfe6" name="bp-select_arrowDown" />

    <select-dropdown v-model="isDropdownShow" class="bp-select__dropdown" :class="{'is-cascader': isCascader}" :placement="placement">

      <template v-if="isCascader">
        <div style="display: flex;">
          <select-list :class="{'is-cascader': isCascader}" v-for="(items, index) in datasourceRenderList" :key="index">
            <div class="bp-select__option" :class="{'is-active': item[valueProperty] === selectedCascaderValue[index]}" v-for="(item, i) in items" :key="i" @click="onClickCascaderOption(item, index)"> {{item[labelProperty]}} </div>
          </select-list>
        </div>
      </template>

      <template v-else>
        <div style="display: flex;">
          <select-list>
            <template v-if="datasourceRenderList.length">
              <div class="bp-select__option" :class="{'is-active': isSingle ? item[valueProperty] === selectedValue : selectedValue.includes(item[valueProperty]) }" v-for="(item, index) in datasourceRenderList" :key="index" @click="onClickOption(item, index)"> {{item[labelProperty]}} </div>
            </template>
            <template class="bp-select__list" v-else>
              <div class="bp-select__option is-emptyOption">{{emptyText}}</div>
            </template>
          </select-list>
        </div>
      </template>

    </select-dropdown>
  </div>
</template>

<script>
import { isObject, isEqual } from './utils'
import clickoutside from './clickoutside'
import SelectDropdown from './selectDropdown.vue'
import SelectList from './selectList.vue'

const vkey = 'value';
const lkey = 'label';
const ckey = 'children';
export default {
  name: 'bpSelect',
  props: {
    value: {
      type: [Number, String, Array]
    },
    datasource: {
      type: [Array],
      required: true
    },
    multiple: {
      type: Boolean
    },
    cascader: {
      type: Boolean
    },
    filterable: {
      type: Boolean
    },
    filterhandler: {
      type: Function,
      default: function (item, keyword) {
        return item[this.labelProperty].indexOf(keyword) != -1;
      }
    },
    remote: {
      type: Boolean
    },
    remotehandler: {
      type: Function
    },
    valueProperty: {
      type: String,
      default: vkey
    },
    labelProperty: {
      type: String,
      default: lkey
    },
    childrenProperty: {
      type: String,
      default: ckey
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    emptyText: {
      type: String,
      default: '没有可选数据'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  data() {
    return {
      emptyLabel: '请选择',
      selectedValue: null,
      selectedItems: null, // 单个时selectedItems为对象类型
      selectedCascaderValue: [], // this.isCascader 保存选中的过渡value
      selectedCascaderItems: [], // this.isCascader 保存选中的过渡items
      datasourceRenderList: [], // 用于render的数据
      query: '', // 查询字段
      isQueryChangeNoEffect: '', // 查询字段改变时不触发filterhander和remotehandler
      isQueryShow: false,
      isDropdownShow: false,
      // 判断类型
      isCascader: false, // 联级选择
      isMultiple: false, // 多选
      isSingle: false, // 单选
      isRemote: false,
      isFilterable: false,
    }
  },
  components: {
    SelectDropdown,
    SelectList
  },
  filters: {},
  directives: {
    clickoutside
  },
  computed: {
    // datasource解析成map，优化取值
    datasourceMap() {
      return this.getMapFromList(this.datasource || [], this.isCascader);
    },
    singleCurrentLabel() {
      if (this.isSingle && this.selectedItems) {
        return this.selectedItems[this.labelProperty];
      } else {
        return null;
      }
    }

  },
  watch: {
    value (n, o) {
      if (n == o) {
        return
      }
      if (!isEqual(n, this.selectedValue) ) {
        this.selectedValue = this.value;
        this.updateSelectedItems();
        // 更新cascader选中状态
        if (this.isCascader && !isEqual(this.selectedValue, this.selectedCascaderValue)) {
          this.selectedCascaderValue = [...this.selectedValue];
          this.selectedCascaderItems = [...this.selectedItems];
          this.updateRenderList();
        }
      }
    },
    // 已选择的值更新时，更新已选择的items列表
    selectedValue (n, o) {
      if (!isEqual(n, o) || !isEqual(n, this.value)) {
        this.$emit('input', n);
      }
    },
    singleCurrentLabel (n) {
      // 单选 且 isFilterable || isRemote
      if (!this.isCascader && !this.isMultiple && this.isQueryShow) {
        const oq = this.query;
        this.query = n || '';
        if (oq !== this.query) {
          this.isQueryChangeNoEffect = true;
        }
      }
    },

    isDropdownShow(n, o){
      // isMultiple && (isFilterable || isRemote) 关闭dropdown时 清空query
      if (!n && this.isMultiple && ( this.isFilterable || this.isRemote)) {
        this.query = '';
      }

      // cascader 隐藏下拉框时，selectedValue 不等于 selectedCascaderValue时，更新selectedCascaderValue
      if (!n && this.isCascader && !isEqual(this.selectedValue, this.selectedCascaderValue)) {

        this.selectedCascaderValue = [...this.selectedValue];
      }
    },

    selectedCascaderValue: {
      handler(n) {
        if (n) {
          this.updateRenderList();
        }
      },
      deep: true
    },

    // 数据源更新时，更新label
    // 数据源更新时，更新renderList
    datasource: {
      handler(n, o) {
        // 先更新renderList再更新 selectedItemslabel
        // 顺便不能调
        this.updateRenderList();
        this.updateSelectedItemsLabel();
      },
      deep: true
    }
  },
  methods: {
    /**
     * 更新selectedItems数组
     * - value 改变时需要重置
     */
    updateSelectedItems() {
      const selectedValue = this.selectedValue;
      if (this.isCascader) {
        this.selectedItems = this.getCascaderItems(selectedValue);
      } else if (this.isMultiple) {
        this.selectedItems = this.getMultipleItems(selectedValue);
      } else {
        this.selectedItems = this.getSingleItem(selectedValue);
      }
    },

    /**
     * 更新selectedItems的label
     * 遍历selectedItems，匹配value相等的item：
     * 未匹配到的item不更新；
     * 匹配到 但label相同不更新；
     */
    updateSelectedItemsLabel() {
      const selectedValue = this.selectedValue;
      const selectedItems = this.selectedItems;
      if (this.isCascader) {
        const items = this.getCascaderItems(selectedValue);
        selectedItems.forEach((o, i) => {
          if (items[i] && !items[i]._isFakeLabel) {
            o.label = items[i].label;
          }
        });
      } else if (this.isMultiple) {
        const items = this.getMultipleItems(selectedValue);
        selectedItems.forEach((o, i) => {
          if (items[i] && !items[i]._isFakeLabel) {
            o.label = items[i].label;
          }
        });
      } else {
        if (selectedItems) {
          const item = this.getSingleItem(selectedValue);
          if (item && !item._isFakeLabel) {
            this.selectedItems.label = item.label;
          }
        }
      }
    },
    getCascaderItems(vals){
      const datasourceMap = this.datasourceMap;
      const items = vals.map((val) => {
        return this.getItemFromMap(datasourceMap, val);
      });
      return items;
    },
    getMultipleItems(vals){
      const datasourceMap = this.datasourceMap;
      const items = vals.map((val) => {
        return this.getItemFromMap(datasourceMap, val);
      });
      return items;
    },
    getSingleItem(val){
      return this.getItemFromMap(this.datasourceMap, val);
    },

    // 优化getMultipleItems & getSingleItem
    getItemFromMap(dsMap, val){
      if (val == null || val === '') {
        return null;
      }
      const {labelProperty} = this;
      const item = {
        value: val,
        label: val,
        _isFakeLabel: true
      }
      const obj = dsMap[val];
      if (obj && isObject(obj)) {
        if (labelProperty && obj[labelProperty]) {
          item.label = obj[labelProperty];
          item._isFakeLabel = false;
        }
      }

      return item;
    },
    // this.datasource解析成map
    getMapFromList(list, isCascader) {
      const {valueProperty, childrenProperty} = this;
      const map = {}

      loop(list);
      return map;

      function loop(list) {
        if (!Array.isArray(list) || !list.length) {
          return
        }
        list.forEach(item => {
          map[item[valueProperty]] = item;
          loop(item[childrenProperty]);
        });
      }
    },
    // 更新cascader的渲染数据列表
    updateRenderList(){
      if (this.isCascader) {
        this.updateCascaderRenderList();
      } else {
        this.datasourceRenderList = this.datasource;
      }
    },
    updateCascaderRenderList(){
      const {valueProperty, childrenProperty} = this;
      const vals = this.selectedCascaderValue;
      const result = [this.datasource];
      vals.forEach(val => {
        const item = this.datasourceMap[val] || {};
        const children = item[childrenProperty];
        if (Array.isArray(children) && children.length) {
          result.push(children);
        }
      });
      this.datasourceRenderList = result;
    },
    genItemFromOption(option) {
      const { valueProperty, labelProperty } = this;
      const value = item[valueProperty];
      const label = item[labelProperty];
      const item = {
        value: value,
        label: label || value,
        _isFakeLabel: !label
      }
      return item;
    },
    onClickSelectMain(e) {
      const node = e.target;
      const isClickTagClose = node.tagName.toLocaleLowerCase === 'i' && Array.prototype.includes.call(node.parentNode.classList, 'bp-select__tag');
      if (this.isQueryShow && !isClickTagClose) {
        this.isNoEffectBlur = true;
        this.$refs.queryInput.focus();
      }
      this.isDropdownShow = true;
    },
    // 点击multiple x 删除
    onClickDelTag(item, i) {
      this.selectedValue.splice(i, 1);
      this.selectedItems.splice(i, 1);
      this.isDropdownShow = false;
    },
    // 点击cascader option
    onClickCascaderOption(item, index) {
      // index：当前cascader列表的索引，不是item在list中的索引
      const { valueProperty, labelProperty } = this;
      const value = item[valueProperty];
      const label = item[labelProperty];
      const _item = {
        value: value,
        label: label || value,
        _isFakeLabel: !label
      }
      const l = this.selectedValue.length;
      if (index === 0) {
        // 重新选择
        this.selectedCascaderValue = [value];
        this.selectedCascaderItems = [_item];
      }else {
        this.selectedCascaderValue.splice(index, l - index, value);
        this.selectedCascaderItems.splice(index, l - index, _item);
      }
    },
    // 其他option
    onClickOption(item, index) {
      const { valueProperty, labelProperty, isSingle, isMultiple, isCascader } = this;
      const value = item[valueProperty];
      const label = item[labelProperty];
      const _item = {
        value: value,
        label: label || value,
        _isFakeLabel: !label
      }
      if (isMultiple) {
        const i = this.selectedValue.indexOf(value);
        if (i === -1) {
          this.selectedValue.push(value);
          this.selectedItems.push(_item);
        }
      } else {
        this.selectedValue = value;
        this.selectedItems = _item
      }

      // isSingle时 需要隐藏
      // isMultiple时 不需要隐藏
      if (isSingle) {
        this.$timer.setTimeout(() => {
          this.isDropdownShow = false;
          this.isQueryShow && this.updateRenderList();
        }, 100);
      } else {
        this.$refs.queryInput.focus();
      }
    },
    // input 事件
    onQueryBlur(e) {
      if (this.isSingle && this.query !== '' && this.query !== this.singleCurrentLabel) {
        this.$nextTick(() => {
          this.query = this.singleCurrentLabel;
          this.isQueryChangeNoEffect = true;
        })
      }

      this.$timer.setTimeout(() => {
        if (!this.isNoEffectBlur) {
          // 点击selectMain 会失去焦点再获取焦点
          this.isDropdownShow = false;
          this.isNoEffectBlur = false;
        }
      }, 10);
    },
    onQueryFocus(e) {
      this.isDropdownShow = true;
    },
    onQueryInput(e) {
      const keyword = e.target.value;
      this.query = keyword;
      this.queryChangeHandler(keyword);
      this.isQueryChangeNoEffect = false;
    },
    onQueryKeyup(e) {
    },
    onQueryChange(e) {
      this.isQueryChangeNoEffect = false;
      const keyword = e.target.value;
    },
    handleClose(){
      this.isDropdownShow = false;
    }
  },
  created() {
    if (!(this.datasource instanceof Array) ) {
      throw new Error('prop datasource must be array');
    }
    
    const {cascader, multiple, filterable, remote} = this;
    this.isCascader = cascader;
    this.isMultiple = multiple;
    this.isSingle = !multiple;
    this.isRemote = remote;
    this.isFilterable = remote ? false : filterable;
    // filerable或 remote时显示query input

    if (this.isCascader) {
      this.isMultiple = this.isSingle = this.isRemote = this.isFilterable = false;
      this.isQueryShow = false;
    } else if (!this.isMultiple) {
      this.isSingle = true;
    }

    if (!this.isCascader) {
      this.isQueryShow = this.isRemote || this.isFilterable;
    }

    if (this.isRemote && !this.remotehandler) {
      throw new Error('remotehandler is required when use prop remote');
    }

    if ((this.isMultiple || this.isCascader) && !(this.value instanceof Array)) {
      if (this.value == null) {
        this.selectedValue = [];
      } else {
        this.selectedValue = [this.value];
      }
      this.$emit('input', this.selectedValue);
    } else {
      this.selectedValue = this.value;
    }

    // 第一次更新赋值this.selectedItems
    this.updateSelectedItems(this.selectedValue);
    if (this.isCascader) {
      this.selectedCascaderValue = [...this.selectedValue];
      this.selectedCascaderItems = [...this.selectedItems];
    }
    // 第一次更新renderList，isCascader需要用到更新后的this.selectedCascaderValue，注意执行顺序
    this.updateRenderList();

    const queryChangeHandler = function (keyword) {
      if (this.isFilterable) {
        this.datasourceRenderList = this.datasource.filter((item, i) => {
          return this.filterhandler(item, keyword);
        })
      } else if (this.isRemote && typeof this.remotehandler === 'function') {
        this.remotehandler(keyword);
      }
    }

    function bounce(fn, tiem = 300) {
      let timer = null
      return function (...args) {
        if (timer) {
          this.$timer.clearTimeout(timer)
        }
        timer = this.$timer.setTimeout(function() {
          fn(...args);
        }, 300);
      }
    }
    this.queryChangeHandler = bounce(queryChangeHandler.bind(this));
  },
  mounted() {}
}
</script>
