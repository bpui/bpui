<!--
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Desc:
*/
-->
<template>
  <selectCascader ref="select" :class="{
      'bp-select__disabled': disabled,
      'bp-select__readonly': readonly,
    }" v-bind="$attrs" v-on="$listeners" :value="realValue"
    @input="_onUpdateValue" :groupCount="groupCount"
    :multiple="multiple" :placeholder="placeholder" :emptyText="emptyText">
    <template v-if="$slots.default">
      <slot name="default"/>
    </template>
  </selectCascader>
</template>

<script>
  import * as febs from 'febs-browser';
  import popover from '@bpui/popover';
  import selectCascader from './selectCascader.vue';
  import * as utils from './utils';

  import picker from '@bpui/picker';

  export default {
    name: 'bpSelect',
    components: {
      bpPopover: popover.bpPopover,
      selectCascader,
    },
    props: {
      value: {
        type: [Number, String, Array]
      },
      datasource: {
        type: [Array, Object],
      },
      multiple: {
        type: Boolean
      },
      readonly: {
        default: false,
        type: Boolean
      },
      disabled: {
        default: false,
        type: Boolean
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      emptyText: {
        type: String,
        default: '无数据'
      },
      sepText: {
        type: String,
        default: '>'
      }
    },
    data() {
      return {
        groupCount: 1,
        realValue: null,
        realDatasource: null,
        realDatasourceItem0: null,
        realDatasourceItem1: null,
        realDatasourceItem2: null,
        realDatasourceItem3: null,
        slotIndexs: [],
      }
    },
    filters: {},
    directives: {},
    computed: {},
    watch: {
      value(newVal, oldVal) {
        if (utils.isEqual(newVal, oldVal)) {
          return;
        }
        this.realValue = newVal;
      },
      datasource: function (val, oldVal) {
        if (val && oldVal) {
          if (utils.isArrayEqualByKey(val, oldVal, ['label', 'value', 'children'])) {
            return;
          }
        }

        this._initRealDatasource(val);
        this._refreshDatasource(true);
      },
    },
    created() {},
    beforeMount() {},
    mounted() {
      if (!this.datasource) {
        if (!this.$slots.default) {
          throw new Error('select must have datasource');
        }
      }
      this._initRealDatasource(this.datasource);
      this._refreshDatasource(false);
    },
    methods: {
      /**
       * @desc: 初始化真实datasource.
       */
      _initRealDatasource(datasource) {
        if (!datasource) {
          this.realDatasource = null;
          return;
        }

        if (Array.isArray(datasource)) {
          // 判断是几列数据.
          let colNum = 1;
          for (let i = 0; i < datasource.length; i++) {
            if (datasource[i].children && Array.isArray(datasource[i].children) && datasource[i].children.length > 0) {
              colNum = 2;

              let j = 0;
              for (j = 0; j < datasource[i].children.length; j++) {
                if (datasource[i].children[j].children && Array.isArray(datasource[i].children[j]
                    .children) && datasource[i].children[j].children.length > 0) {
                  colNum = 3;
                  break;
                }
              }
              if (j < datasource[i].children.length) {
                break;
              }
            }
          }

          let DatasourceClass;
          if (colNum == 1) DatasourceClass = picker.PickerSingleDatasource;
          else if (colNum == 2) DatasourceClass = picker.PickerDoubleDatasource;
          else DatasourceClass = picker.PickerThreeDatasource;

          this.realDatasource = new DatasourceClass(datasource);
        } else {
          this.realDatasource = datasource;
        }

        if (typeof this.realDatasource.picker_datasource_groups !== 'function' ||
          typeof this.realDatasource.picker_datasource !== 'function' ||
          typeof this.realDatasource.picker_changed !== 'function') {
          throw new Error(
            'select datasource class must have `picker_datasource_groups`, `picker_datasource`, `picker_changed` function'
          );
        }
      },
      /**
       * @desc: 重新获取整个数据.
       */
      _refreshDatasource(trigger = true) {
        if (this.realDatasource) {
          this.realDatasource.picker_datasource_groups((groupCount) => {
            if (groupCount <= 0 || groupCount > 4) {
              throw new Error('select group count must in [1,4]');
            }

            this.groupCount = groupCount;

            let p = new Promise((resolve) => resolve());

            for (let i = 0; i < groupCount; i++) {
              p = p.then(febs.utils.sleep(1).then(this.refreshDatasource(i, trigger)));
            }

            this.$nextTick(() => {
              p.then(() => {
                // this._bindEvent();
                this.$refs.select._updateDatasource();
              });
            });
          });
        } else {
          this.groupCount = 1;
          let p = febs.utils.sleep(1).then(this.refreshDatasource(0, trigger));

          this.$nextTick(() => {
            p.then(() => {
              // this._bindEvent();
              this.$refs.select._updateDatasource();
            });
          });
        }
      },
      /**
       * @desc: 重新获取指定组的数据源.
       * @return Promise. - resolve(value)
       */
      refreshDatasource(groupIndex, trigger = true) {

        // 使用solt的单数据源.
        if (!this.realDatasource) {
          if (!this.$slots.default) {
            throw new Error('select missing datasource or children cells');
          }

          return new Promise((resolve, reject) => {
            let value = this.value;
            let datasource = [];
            try {
              this.slotIndexs = [];
              for (let i = 0; i < this.$slots.default.length; i++) {
                let c = this.$slots.default[i];
                if (!c.tag) continue;
                if (c.tag.indexOf('bpSelectOption') >= 0) {
                  this.slotIndexs.push(i);
                  datasource.push({
                    value: c.componentOptions.propsData.value,
                    disabled: c.componentOptions.propsData.disabled,
                  });
                } else {
                  throw new Error('select children must be bp-select-option');
                }
              }

              this['realDatasourceItem' + 0] = datasource;
              this.$refs.select.slotIndexs = this.slotIndexs;
              resolve(value);
            } catch (e) {
              reject(e);
            }
          });
        }

        // 使用datasource的数据源.
        return new Promise((resolve, reject) => {
          let value;
          try {
            this.realDatasource.picker_datasource(groupIndex, this, (ds) => {
              try {
                value = ds.value;
                if (!Array.isArray(ds.datasource)) {
                  throw new Error('select datasource must is Array');
                }

                this['realDatasourceItem' + groupIndex] = ds.datasource;
              } catch (e) {
                reject(e);
              }

              this.$nextTick(() => {
                setTimeout(() => {
                  this.$refs.select._refreshRenderDatasource(groupIndex, value);
                  // this.setSelect(groupIndex, value, trigger);
                  resolve(value);
                  // this._bindEvent();
                }, 0);
              });
            });
          } catch (e) {
            reject(e);
          }
        });
      },
      _onUpdateValue(newVal) {
        this.realValue = newVal;
        if (utils.isEqual(newVal, this.value)) {
          return;
        }

        this.$emit('input', newVal);
      },
      show() {
        this.$refs.select.visibleDropdown = true;
      },
      hide() {
        this.$refs.select.visibleDropdown = false;
      },
      /**
       * @desc: 获得当前界面上选中的元素的值.
       * @param groupIndex: 明确指定后可以获得指定组的值.
       * @return 值.
       */
      getSelect(groupIndex = 0) {
        return this.$refs.select.getSelect(groupIndex);
      },
    },
  }
</script>
