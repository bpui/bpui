<!--
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Desc:
*/
-->
<template>
  <div class="bp-select" ref="main" :class="{
      'bp-select__selected': visibleDropdown,
      'bp-select__multiple': isMultiple,
    }" @mouseenter="isHover=true" @mouseleave="isHover=false">

    <!-- main -->
    <div class="bp-select__main">
      <div class="bp-select__mainContain">
        <!-- isCascader -->
        <span :style="{
          'white-space': isMultiple?'initial':'nowrap'
        }">
          <template v-if="null !== valueIndex && valueIndex.length > 0">
            <!-- custom slot -->
            <template v-if="$slots.default">
              <template v-for="(iindex, index) in valueIndex">
                <div v-if="isMultiple" class="bp-select__label bp-ellipsis">
                  <div v-html="_getSlotLabel(slotIndexs[iindex])" :key="index"/>
                  <bp-icon class="bp-select_close" name="bp-select_close" @click.stop="onRemoveMultipleOption(index)"/>
                </div>
                <template v-else>
                  <div v-html="_getSlotLabel(slotIndexs[iindex])" :key="index"/>
                </template>
              </template>
            </template>
            <!-- multiple -->
            <template v-else-if="isMultiple">
              <template v-for="(label, index) in valueLabels">
                <span :key="index"
                  class="bp-select__label">{{label}}<bp-icon class="bp-select_close" name="bp-select_close" @click.stop="onRemoveMultipleOption(index)"/></span>
              </template>
            </template>
            <template v-else>
              <template v-for="(label, index) in valueLabels">
                <span :key="index"
                  class="bp-select__label">{{label}}</span>
                <span :key="index+'xx'" v-if="index < valueLabels.length - 1"
                  class="bp-select__label_sep">{{$parent.sepText}}</span>
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
    <bp-icon v-if="showClearable" class="bp-select_clearable" name="bp-select_close" @click.stop="_updateValue(null)" />
    <bp-icon v-else class="bp-select__arrowDown" :class="visibleDropdown?'bp-select__arrowDownR':''"
      name="bp-select_arrowDown" />

    <!-- dropdown -->
    <bp-popover class="bp-select__popover" :maskClose="false" :bind="$refs.main" trigger="click"
      :visible.sync="visibleDropdown">
      <div class="bp-select__dropdown">
        <template v-if="!cascaderDatasource || cascaderDatasource.length == 0 || cascaderDatasource[0].length == 0">
          <div class="bp-select__dropdownList bp-select__dropdownList__empty">
            <span>{{emptyText}}</span>
          </div>
        </template>
        <template v-else>
          <div class="bp-select__dropdownList" v-for="(items, index) in cascaderDatasource"
            :key="index">
            <div class="bp-select__dropdownList__scroller">
              <div class="bp-select__dropdownList__inner">
                <!-- slot -->
                <template v-if="$slots.default">
                  <template v-for="(item, i) in cascaderDatasource[0]">
                    <renderDom v-if="isMultiple" :node="$slots.default[slotIndexs[i]]" class="bp-select__option bp-ellipsis" 
                      :key="index+'_'+i" :class="{ 
                        'bp-select__option_active': (selectedIndex && selectedIndex.indexOf(i) >= 0),
                        'bp-select__option_disabled': !!cascaderDatasource[0][i].disabled
                      }" @click.stop="onClickOption(cascaderDatasource[0][i], index, i, false)"/>
                    <renderDom v-else :node="$slots.default[slotIndexs[i]]" class="bp-select__option bp-ellipsis" :key="index+'_'+i" :class="{
                        'bp-select__option_active': (selectedValue && cascaderDatasource[0][i].value === selectedValue[index]) || (cascaderClickIndex && i === cascaderClickIndex[index]),
                        'bp-select__option_disabled': !!cascaderDatasource[0][i].disabled
                      }" @click.stop="onClickOption(cascaderDatasource[0][i], index, i, true)" />
                  </template>
                </template>
                <template v-else>
                  <template v-for="(item, i) in items">
                    <div class="bp-select__option bp-ellipsis" v-if="isMultiple"
                      :key="index+'_'+i" :class="{ 
                        'bp-select__option_active': (selectedIndex && selectedIndex.indexOf(i) >= 0),
                        'bp-select__option_disabled': !!item.disabled
                      }" @click.stop="onClickOption(item, index, i, false)">{{item.label}}</div>
                    <div class="bp-select__option bp-ellipsis" v-else
                      :key="index+'_'+i" :class="{ 
                        'bp-select__option_active': (selectedValue && item.value === selectedValue[index]) || (cascaderClickIndex && i === cascaderClickIndex[index]),
                        'bp-select__option_disabled': !!item.disabled
                      }" @click.stop="onClickOption(item, index, i, false)">{{item.label}}</div>
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
      groupCount: Number,
      multiple: {
        type: Boolean
      },
      placeholder: {
        type: String,
      },
      clearable: String,
      emptyText: {
        type: String,
      }
    },
    data() {
      return {
        slotIndexs: [],
        cascaderDatasource: null,
        cascaderClickIndex: null,
        visibleDropdown: false,
        selectedIndex: null,
        selectedValue: null,
        valueIndex: null,
        valueLabels: null,
        isHover: false,
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
        return this.multiple && this.groupCount == 1;
      },
      showClearable() {
        if (this.clearable != null) {

          if (this.valueIndex && this.valueIndex.length > 0 && this.isHover) {
            return true;
          }
        }

        return false;
      }
    },
    watch: {
      valueIndex(newVal, oldVal) {
        if (!utils.isEqual(newVal, oldVal)) {
          this._updateValueLabels();
        }
      },
      visibleDropdown(newVal) {
        if (newVal) {
          if (this.valueIndex) {
            this.cascaderClickIndex = [].concat(this.valueIndex);
            if (this.isMultiple) {
              this.cascaderDatasource = [this.$parent.realDatasourceItem0];
            }
            else {
              this.cascaderDatasource.length = this.cascaderClickIndex.length||1;
              for (let i = 0; i < this.cascaderDatasource.length; i++) {
                this.cascaderDatasource[i] = this.$parent['realDatasourceItem' + i];
              }
              this.cascaderDatasource = this.cascaderDatasource.concat([]);
            }
          } else {
            this.cascaderClickIndex = null;
            this.cascaderDatasource = [this.$parent.realDatasourceItem0];
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
      value(newVal, o) {
        if (null === newVal) {
          this.oldValue = null;
          this.selectedIndex = null;
          this.valueIndex = null;
          return;
        }

        if (utils.isEqual(newVal, o) || utils.isEqual(newVal, this.oldValue)) {
          this.oldValue = null;
          return;
        }

        if (this.groupCount > 1) {
          this.valueIndex = [];
          this.cascaderDatasource = [this.$parent.realDatasourceItem0];
          for (let i = 0; i < this.cascaderDatasource[0].length; i++) {
            if (this.cascaderDatasource[0][i].value == newVal[0]) {
              this.valueIndex = [i];
              break;
            }
          }
          if (this.valueIndex.length == 0) {
            return;
          }

          for (let i = 0; i < newVal.length-1; i++) {
            if (this.$parent.realDatasource) {
              this.$parent.realDatasource.picker_changed(i, this.$parent);
            }
          }
        }
        else {
          if (this.isMultiple) {
            let arr = [];
            for (let i = 0; i < newVal.length; i++) {
              for (let j = 0; j < this.$parent.realDatasourceItem0.length; j++) {
                if (this.$parent.realDatasourceItem0[j].value == newVal[i]) {
                  arr.push(j);
                  break;
                }
              }
            }
            arr.sort();
            this.selectedIndex = arr;
          }
          else {
            for (let i = 0; i < this.$parent.realDatasourceItem0.length; i++) {
              if (this.$parent.realDatasourceItem0[i].value == newVal) {
                this.selectedIndex = [i];
                break;
              }
            }
          }
          this.valueIndex = [].concat(this.selectedIndex);
        } // if..else.

      },
    },
    created() {},
    beforeMount() {
      // this._updateDatasource();
    },
    mounted() {
      // this._updateDatasource();
    },
    methods: {
      _getSlotLabel(index) {
        const div = document.createElement('div');
        div.appendChild(this.$slots.default[index].elm.cloneNode(true));
        const divString = div.innerHTML;
        return divString;
      },
      /**
       * @desc: 获得当前界面上选中的元素的值.
       * @param groupIndex: 明确指定后可以获得指定组的值.
       * @return 值.
       */
      getSelect(groupIndex = 0) {
        let data = this.cascaderDatasource;
        if (data && groupIndex < data.length) {
          if (!this.selectedIndex || this.selectedIndex.length <= groupIndex) {
            if (!this.valueIndex || this.valueIndex.length <= groupIndex) {
              return {};
            }
            else {
              return data[groupIndex][this.valueIndex[groupIndex]];
            }
          }
          return data[groupIndex][this.selectedIndex[groupIndex]];
        } // if.

        return {};
      },
      _updateDatasource() {
        this.selectedIndex = null;
        this.selectedValue = null;
        this.valueIndex = null;
        this._updateValue(this.selectedValue);

        if (!this.$parent.realDatasourceItem0) {
          this.cascaderDatasource = [];
          return;
        } // if.

        this.cascaderDatasource = [this.$parent.realDatasourceItem0];
      },
      _refreshRenderDatasource(groupIndex, value) {
        if (groupIndex > 0) {
          let ds = this.$parent['realDatasourceItem'+groupIndex];

          if (ds.length == 0) {
            if (this.cascaderClickIndex && this.cascaderClickIndex.length == groupIndex) {
              this.$nextTick().then(()=>{
                this.visibleDropdown = false;
                this._updateValue(this.selectedValue);
              });
            }
            return;
          }

          if (this.cascaderDatasource.length < groupIndex+1) {
            this.cascaderDatasource.push(ds);
          } else {
            this.cascaderDatasource[groupIndex] = ds;
          }
          this.cascaderDatasource = this.cascaderDatasource.concat([]);

          // update valueIndex from value update.
          if (this.value && (!this.valueIndex || this.valueIndex.length < this.value.length || this.valueIndex.length < this.cascaderDatasource.length)) {
            this.valueIndex = this.valueIndex || [];
            let n = Math.min(this.cascaderDatasource.length, this.value.length);
            for (let i = this.valueIndex.length; i < n; i++) {
              let v = this.value[i];
              for (let j = 0; j < this.cascaderDatasource[i].length; j++) {
                if (v == this.cascaderDatasource[i][j].value) {
                  this.valueIndex.push(j);
                  this.valueIndex = this.valueIndex.concat([]);
                  this._updateValueLabels();
                  break;
                }
              }
            }
          } // if.
        }
      },
      onClickOption(item, groupIndex, index, isEnd) {
        this.cascaderClickIndex = this.cascaderClickIndex || [];
        this.cascaderClickIndex.length = groupIndex + 1;
        this.cascaderClickIndex[groupIndex] = index;
        this.cascaderClickIndex = this.cascaderClickIndex.concat([]);

        if (!!item.disabled) {
          return;
        }

        if (this.groupCount > 1) {
          this.selectedIndex = [].concat(this.cascaderClickIndex);

          if (groupIndex < this.groupCount - 1) {
            this.$parent.realDatasource.picker_changed(groupIndex, this.$parent);
            return;
          }
          else {
            isEnd = true;
          }
        }
        else {
          isEnd = true;

          if (this.isMultiple) {
            let arr = this.selectedIndex || [];
            let curIndex = arr.indexOf(index);
            if (curIndex < 0) {
              arr.push(index);
              arr.sort();
            } else {
              arr.splice(curIndex, 1);
            }
            arr.sort();
            this.selectedIndex = arr.concat([]);
          } else {
            this.selectedIndex = [].concat(this.cascaderClickIndex);
          }
        } // if..else.

        if (isEnd) {
          this.$nextTick().then(()=>{
            this._updateValue(this.selectedValue);
          });

          if (this.isMultiple) {
            return;
          }

          this.visibleDropdown = false;
        }
      },
      onRemoveMultipleOption(index) {
        this.selectedIndex.splice(index, 1);
        this.selectedIndex = this.selectedIndex.concat([]);
        this.valueIndex.splice(index, 1);
        this.valueIndex = this.valueIndex.concat([]);
        this.valueLabels.splice(index, 1);
        this.valueLabels = this.valueLabels.concat([]);
      },
      _updateValue(selectedValue) {
        if (null === selectedValue) {
          this.valueIndex = null;
          this.oldValue = null;
          this.$emit('input', null);
          this.$emit('change', null);
          return;
        }

        let arr = [].concat(this.selectedIndex);
        arr.sort();
        this.valueIndex = arr;

        if (this.groupCount > 1 || this.isMultiple) {
          let value = [].concat(selectedValue);
          this.oldValue = value;
          this.$emit('input', value);
          this.$emit('change', value);
        } else {
          this.oldValue = selectedValue[0];
          this.$emit('input', selectedValue[0]);
          this.$emit('change', selectedValue[0]);
        }
      },
      _updateValueLabels() {
        if (!this.valueIndex) {
          this.valueLabels = null;
        }
        else if (this.groupCount > 1) {
          this.valueLabels = [];
          for (let i = 0; i < this.valueIndex.length; i++) {
            this.valueLabels.push(this.cascaderDatasource[i][this.valueIndex[i]].label);
          }
          this.valueLabels = this.valueLabels.concat([]);
        } else {
          this.valueLabels = [];
          for (let i = 0; i < this.valueIndex.length; i++) {
            this.valueLabels.push(this.cascaderDatasource[0][this.valueIndex[i]].label);
          }
          this.valueLabels = this.valueLabels.concat([]);
        }
      },
    },
  }
</script>
