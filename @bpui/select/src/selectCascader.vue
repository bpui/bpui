<!--
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: qiahao
* Date: 2020-09-14
* Desc:
*/
-->
<template>
  <div class="bp-select" ref="main" :class="{
      'bp-select__selected': visibleDropdown,
      'bp-select__multiple': isMultiple,
    }">

    <!-- main -->
    <div class="bp-select__main">
      <div class="bp-select__mainContain">
        <!-- isCascader -->
        <span :style="{
          'white-space': isMultiple?'initial':'nowrap'
        }">
          <template v-if="null !== selectedIndex && selectedIndex.length > 0">
            <template v-if="$slots.default">
              <template v-for="(iindex, index) in selectedIndex">
                <div v-if="isMultiple" class="bp-select__label bp-ellipsis">
                  <renderDom :vNode="$slots.default[iindex]"
                    :key="index"/>
                  <bp-icon class="bp-select_close" name="bp-select_close" @click.stop="onRemoveMultipleOption(index)"/>
                </div>
                <renderDom v-else :vNode="$slots.default[iindex]" class="bp-select__label" :key="index" />
              </template>
            </template>
            <template v-else-if="isMultiple">
              <template v-for="(iindex, index) in selectedIndex">
                <span :key="index"
                  class="bp-select__label">{{cascaderDatasource[0][selectedIndex[index]].label}}<bp-icon class="bp-select_close" name="bp-select_close" @click.stop="onRemoveMultipleOption(index)"/></span>
              </template>
            </template>
            <template v-else>
              <template v-for="(iindex, index) in selectedIndex">
                <span :key="index"
                  class="bp-select__label">{{cascaderDatasource[index][selectedIndex[index]].label}}</span>
                <span :key="index+'xx'" v-if="index < selectedIndex.length - 1"
                  class="bp-select__label_sep">&gt;</span>
              </template>
            </template>
          </template>
          <span v-else class="bp-select__mainContain_placeholder">
            {{placeholder||''}}
          </span>
        </span>
      </div>
    </div>

    <!-- arrow icon -->
    <bp-icon class="bp-select__arrowDown" :class="visibleDropdown?'bp-select__arrowDownR':''"
      name="bp-select_arrowDown" />

    <!-- dropdown -->
    <bp-popover class="bp-select__popover" :maskClose="false" :bind="$refs.main" trigger="click"
      :visible.sync="visibleDropdown">
      <div class="bp-select__dropdown">
        <template v-if="!realDatasourceItem0 || realDatasourceItem0.length == 0">
          <div class="bp-select__dropdownList bp-select__dropdownList__empty">
            <span>{{emptyText}}</span>
          </div>
        </template>
        <template v-else>
          <div class="bp-select__dropdownList" v-for="(items, index) in cascaderDatasource"
            :key="index">
            <div class="bp-select__dropdownList__scroller">
              <div class="bp-select__dropdownList__inner">
                <template v-if="$slots.default">
                  <template v-for="(item, i) in $slots.default">
                    <renderDom :vNode="item" class="bp-select__option bp-ellipsis" v-if="isMultiple"
                      :key="index+'_'+i" :class="{ 
                        'bp-select__option_active': (selectedIndex && selectedIndex.indexOf(i) >= 0),
                        'bp-select__option_disabled': !!cascaderDatasource[0][i].disabled
                      }" @click.stop="onClickOption(cascaderDatasource[0][i], index, i, false)"/>
                    <renderDom :vNode="item" class="bp-select__option bp-ellipsis" v-else :key="index+'_'+i" :class="{
                        'bp-select__option_active': (selectedValue && cascaderDatasource[0][i].value === selectedValue[index]) || (cascaderClickIndex && i === cascaderClickIndex[index]),
                        'bp-select__option_disabled': !!cascaderDatasource[0][i].disabled
                      }" @click="onClickOption(cascaderDatasource[0][i], index, i, true)" />
                  </template>
                </template>
                <template v-else>
                  <template v-for="(item, i) in items">
                    <div class="bp-select__option bp-ellipsis" v-if="isMultiple"
                      :key="index+'_'+i" :class="{ 
                        'bp-select__option_active': (selectedIndex && selectedIndex.indexOf(i) >= 0),
                        'bp-select__option_disabled': !!item.disabled
                      }" @click.stop="onClickOption(item, index, i, false)">{{item.label}}</div>
                    <div class="bp-select__option bp-ellipsis" v-else-if="item.children"
                      :key="index+'_'+i" :class="{ 
                        'bp-select__option_active': (selectedValue && item.value === selectedValue[index]) || (cascaderClickIndex && i === cascaderClickIndex[index]),
                        'bp-select__option_disabled': !!item.disabled
                      }" @click.stop="onClickOption(item, index, i, false)">{{item.label}}</div>
                    <div class="bp-select__option bp-ellipsis" v-else :key="index+'_'+i" :class="{
                        'bp-select__option_active': (selectedValue && item.value === selectedValue[index]) || (cascaderClickIndex && i === cascaderClickIndex[index]),
                        'bp-select__option_disabled': !!item.disabled
                      }" @click="onClickOption(item, index, i, true)">{{item.label}}</div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </template>

      </div>
    </bp-popover>
  </div>
</template>

<script>
  import popover from '@bpui/popover';
  import renderDom from './renderDom.jsx';
  import * as utils from './utils';

  export default {
    props: {
      value: {
        type: [Number, String, Array]
      },
      realDatasourceItem0: {
        type: [Array],
      },
      realDatasourceItem1: {
        type: [Array],
      },
      realDatasourceItem2: {
        type: [Array],
      },
      realDatasourceItem3: {
        type: [Array],
      },
      multiple: {
        type: Boolean
      },
      placeholder: {
        type: String,
      },
      emptyText: {
        type: String,
      }
    },
    data() {
      return {
        isMoreLayer: false,
        cascaderDatasource: null,
        cascaderClickIndex: null,
        visibleDropdown: false,
        selectedIndex: null,
        selectedValue: null,
      }
    },
    components: {
      bpPopover: popover.bpPopover,
      renderDom,
    },
    filters: {},
    directives: {},
    computed: {
      isMultiple() {
        return this.multiple && !this.isMoreLayer;
      }
    },
    watch: {
      visibleDropdown(newVal) {
        if (newVal) {
          if (this.selectedIndex) {
            this.cascaderClickIndex = this.selectedIndex.concat([]);
            if (this.isMultiple) {
              this.cascaderDatasource = [this.realDatasourceItem0];
            }
            else {
              if (this.cascaderDatasource && this.cascaderDatasource.length > this.cascaderClickIndex
                .length) {
                this.cascaderDatasource.length = this.cascaderClickIndex.length;
              } else {
                this.cascaderDatasource = [this.realDatasourceItem0];
              }
            }
          } else {
            this.cascaderClickIndex = null;
            this.cascaderDatasource = [this.realDatasourceItem0];
          } // if..else.
        }
      },
      selectedIndex(newVal) {
        if (null === newVal) {
          this.selectedValue = null;
          return;
        }

        let arr = [];
        let ds = this.cascaderDatasource;

        if (this.isMultiple) {
          for (let i = 0; i < newVal.length; i++) {
            if (ds[0].length <= newVal[i]) {
              break;
            }

            arr.push(ds[0][newVal[i]].value);
          }
        } else {
          for (let i = 0; i < newVal.length; i++) {
            if (ds[i].length <= newVal[i]) {
              break;
            }

            arr.push(ds[i][newVal[i]].value);
          }
        } // if..else.

        if (!utils.isEqual(this.selectedValue, arr)) {
          this.selectedValue = arr;
        }
      },
      selectedValue(newVal) {
        if (null === newVal) {
          this.oldValue = null;
          this.$emit('input', null);
          this.$emit('change', null);
          return;
        }

        if (this.isMoreLayer || this.isMultiple) {
          let value = this.selectedValue.concat([]);
          this.oldValue = value;
          this.$emit('input', value);
          this.$emit('change', value);
        } else {
          this.oldValue = this.selectedValue[0];
          this.$emit('input', this.selectedValue[0]);
          this.$emit('change', this.selectedValue[0]);
        }
      },
      value(newVal, o) {
        if (null === newVal) {
          this.oldValue = null;
          this.selectedIndex = null;
          return;
        }

        if (utils.isEqual(newVal, o) || utils.isEqual(newVal, this.oldValue)) {
          this.oldValue = null;
          return;
        }

        if (this.isMoreLayer) {

          let cascaderDs = [];
          let ds = {
            children: this.datasource
          };
          let arr = [];
          for (let i = 0; i < newVal.length; i++) {
            if (!ds.children) {
              break;
            }
            ds = ds.children;
            cascaderDs.push(ds);

            for (let j = 0; j < ds.length; j++) {
              if (ds[j].value == newVal[i]) {
                arr.push(j);
                ds = ds[j];
                break;
              }
            }
          }
          this.cascaderDatasource = cascaderDs;
          if (!utils.isEqual(this.selectedIndex, arr)) {
            this.selectedIndex = arr;
          }
        }
        else {
          if (this.isMultiple) {
            let arr = [];
            for (let i = 0; i < newVal.length; i++) {
              for (let j = 0; j < this.realDatasourceItem0.length; j++) {
                if (this.realDatasourceItem0[j].value == newVal[i]) {
                  arr.push(j);
                  break;
                }
              }
            }
            arr.sort();
            this.selectedIndex = arr;
          }
          else {
            for (let i = 0; i < this.realDatasourceItem0.length; i++) {
              if (this.realDatasourceItem0[i].value == newVal) {
                this.selectedIndex = [i];
                break;
              }
            }
          }
        } // if..else.
      },
      // 数据源更新时，更新label
      // 数据源更新时，更新renderList
      realDatasourceItem0: {
        handler(n, o) {
          this._updateDatasource();
        },
        deep: true
      },
      realDatasourceItem1: {
        handler(n, o) {
          this._updateDatasource();
        },
        deep: true
      },
      realDatasourceItem2: {
        handler(n, o) {
          this._updateDatasource();
        },
        deep: true
      },
      realDatasourceItem3: {
        handler(n, o) {
          this._updateDatasource();
        },
        deep: true
      },
    },
    created() {},
    beforeMount() {
      // this._updateDatasource();
    },
    mounted() {
      this._updateDatasource();
    },
    methods: {
      /**
       * @desc: 获得当前界面上选中的元素的值.
       * @param groupIndex: 明确指定后可以获得指定组的值.
       * @return 值.
       */
      getSelect(groupIndex = 0) {
        let data = this.cascaderDatasource;
        if (data && groupIndex < data.length) {
          if (!this.selectedIndex || this.selectedIndex.length <= groupIndex) {
            return {};
          }
          return data[groupIndex][this.selectedIndex[groupIndex]];
        } // if.

        return {};
      },
      _updateDatasource() {
        if (!this.realDatasourceItem0) {
          let cascaderDatasource = [];
          if (this.realDatasourceItem0) {
            cascaderDatasource.push(this.realDatasourceItem0);
          }
          this.cascaderDatasource = cascaderDatasource;

          return;
        } // if.

        let cascaderDatasource = [];
        if (this.realDatasourceItem0) {
          cascaderDatasource.push(this.realDatasourceItem0);
        }
        if (this.realDatasourceItem1) {
          cascaderDatasource.push(this.realDatasourceItem1);
        }
        if (this.realDatasourceItem2) {
          cascaderDatasource.push(this.realDatasourceItem2);
        }
        if (this.realDatasourceItem3) {
          cascaderDatasource.push(this.realDatasourceItem3);
        }
        this.cascaderDatasource = cascaderDatasource;
        this.selectedIndex = null;

        // is more then one layer
        for (let i = 0; i < this.realDatasourceItem0.length; i++) {
          let item = this.realDatasourceItem0[i];
          if (!!!item.disabled && item.children && item.children.length > 0) {
            this.isMoreLayer = true;
            break;
          }
        }
      },
      onClickOption(item, index, i, isEnd) {
        this.cascaderClickIndex = this.cascaderClickIndex || [];
        this.cascaderClickIndex.length = index + 1;
        this.cascaderClickIndex[index] = i;

        if (item.children && item.children.length > 0) {
          if (!!item.disabled) {
            return;
          }

          let arr = this.cascaderDatasource;
          arr.length = index + 1;
          let arr2 = item.children;
          arr.push(arr2);
          this.cascaderDatasource = this.cascaderDatasource.concat([]);
          this.cascaderClickIndex = this.cascaderClickIndex.concat([]);
        } else {
          if (this.isMultiple) {
            let arr = this.selectedIndex || [];
            let curIndex = arr.indexOf(i);
            if (curIndex < 0) {
              arr.push(i);
              arr.sort();
            } else {
              arr.splice(curIndex, 1);
            }
            this.selectedIndex = arr;
          } else {
            this.selectedIndex = this.cascaderClickIndex.concat([]);
          }
        } // if..else.

        if (isEnd) {
          if (this.isMultiple) {
            return;
          }

          this.visibleDropdown = false;
        }
      },
      onRemoveMultipleOption(index) {
        this.selectedIndex.splice(index, 1);
        this.selectedIndex = this.selectedIndex.concat([]);
      }
    },
  }
</script>
