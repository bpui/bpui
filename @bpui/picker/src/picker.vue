<!--
/**
* Copyright (c) 2017 Copyright taijin All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/

方法:
// 隐藏.
- hide();
// 显示.
- show();

 -->

<template>
  <bp-widget ref="widget" class="bp-picker" 
    :visible.sync="visibleReal" 
    :maskClose="maskClose" 
    :mask="mask" 
    :preventEvent="true">
    
    <div class="bp-widget__contentWrap"
      :class="pageClass" 
      :style="pageStyle">
      <div v-if="$slots['toolbar']" class="bp-picker__toolbar bp-ellipsis" >
        <slot name="toolbar" />
      </div>
      <div v-else class="bp-picker__toolbar bp-ellipsis" ref="agentToolbar">
        <button class="bp-picker__cancelBtn" @click="visibleReal=false">{{cancelBtnText}}</button>
        <button @click="_onConfirm">{{confirmBtnText}}</button>
      </div>

      <div class="bp-picker__main" ref="agentMain">
        <div class="bp-picker__group" data-picker="0" :style="{display:groupCount>0?'inherit':'none'}">
          <div class="bp-picker__indicator"></div>
          <div ref="content0" class="bp-picker__content" data-group="0" :style="'transform: translate3d(0px, 102px, 0px); transition: all 0.3s;'">
            <div v-for="(item, index) in items0" :class="'bp-picker__item' + (item.disabled?' bp-picker__item-disabled':'')"
              :data-value="item.value" :key="'_1'+index">{{item.label}}</div>
          </div>
          <div class="bp-picker__mask"></div>
        </div>
        <div class="bp-picker__group" data-picker="1" :style="{display:groupCount>1?'inherit':'none'}">
          <div class="bp-picker__indicator"></div>
          <div ref="content1" class="bp-picker__content" data-group="1" :style="'transform: translate3d(0px, 102px, 0px); transition: all 0.3s;'">
            <div v-for="(item, index) in items1" :class="'bp-picker__item' + (item.disabled?' bp-picker__item-disabled':'')"
              :data-value="item.value" :key="'_2'+index">{{item.label}}</div>
          </div>
          <div class="bp-picker__mask"></div>
        </div>
        <div class="bp-picker__group" data-picker="2" :style="{display:groupCount>2?'inherit':'none'}">
          <div class="bp-picker__indicator"></div>
          <div ref="content2" class="bp-picker__content" data-group="2" :style="'transform: translate3d(0px, 102px, 0px); transition: all 0.3s;'">
            <div v-for="(item, index) in items2" :class="'bp-picker__item' + (item.disabled?' bp-picker__item-disabled':'')"
              :data-value="item.value" :key="'_3'+index">{{item.label}}</div>
          </div>
          <div class="bp-picker__mask"></div>
        </div>
        <div class="bp-picker__group" data-picker="3" :style="{display:groupCount>3?'inherit':'none'}">
          <div class="bp-picker__indicator"></div>
          <div ref="content3" class="bp-picker__content" data-group="3" :style="'transform: translate3d(0px, 102px, 0px); transition: all 0.3s;'">
            <div v-for="(item, index) in items3" :class="'bp-picker__item' + (item.disabled?' bp-picker__item-disabled':'')"
              :data-value="item.value" :key="'_4'+index">{{item.label}}</div>
          </div>
          <div class="bp-picker__mask"></div>
        </div>
      </div>
    </div>
  </bp-widget>
</template>

<script>
  import * as febs from 'febs-browser';;
  import bpLibs from '@bpui/libs';
  import bpDialog from '@bpui/dialog';
  import * as utils from './utils/arr';
  import SinglePickerDatasource from './datasource/picker-datasource-single';
  import DoublePickerDatasource from './datasource/picker-datasource-double';
  import ThreePickerDatasource from './datasource/picker-datasource-three';
  import {
    mobile_onTouchstart_picker, 
    mobile_onTouchmove_picker,
    mobile_onTouchend_picker,
    mobile_onTouchcancel_picker,
    picker_setOffset,
    picker_getOffset,
    POS_CENTER,
    POS_CELL_HEIGHT,
  } from './event';

  export default {
    components: {
      bpIcon: bpLibs.VueObject.bpIcon,
      bpWidget: bpDialog.bpWidget
    },
    props: {
      visible: Boolean,
      mask: {
        default: true,
        type: Boolean,
      },
      maskClose: {
        default: false,
        type: Boolean,
      },
      pageClass: String|Array,
      pageStyle: String|Array|Object,
      
      cancelBtnText: {
        type: String,
        default: '取消',
      },
      confirmBtnText: {
        type: String,
        default: '确认',
      },
      /**
       * @desc: 数据源.
       */
      datasource: {
        validator: function (value) {
          return (typeof value === 'object') || Array.isArray(value);
        }
      },
      value: {
        validator: function(value) {
          return !value || (typeof value === 'string') || (typeof value === 'number') || Array.isArray(value);
        }
      }
    },
    data() {
      return {
        visibleReal: false,
        visibleRealByProperty: false,
        /**
         * @desc: 数据源.
         */
        items0: null,
        items1: null,
        items2: null,
        items3: null,
        groupCount: 1,
        value0: null,
        value1: null,
        value2: null,
        value3: null,
      };
    },
    watch: {
      value(v, vOld) {
        if (this.noEmitUpdateWatch) {
          this.noEmitUpdateWatch = false;
          return;
        }

        if (v === vOld)
          return;

        let t = typeof v;
        
        if (t === 'string' || t === 'number') {
          this.value0 = v;
          this.$nextTick(()=>{
            this.setSelect(0, v, false);
          });
        } else if (Array.isArray(v)) {
          if (utils.isArrayEqual(v, vOld)) {
            return;
          }
          this.$nextTick(()=>{
            for (let i = 0; i < v.length && i < this.groupCount; i++) {
              this['value'+i] = v[i];
              this.setSelect(i, v[i], false);
            }
          });
        } else {
          throw new Error('picker value is error');
        }
      },
      visible(v) {
        if (this.visibleReal != v) {
          this.visibleRealByProperty = true;
          this.visibleReal = v;
        }
      },
      visibleReal(v, oldVal) {
        if (v == oldVal) return;

        this.$emit('update:visible', v);
        if (v) {
          let value = this.getValue();
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length && i < 4; i++) {
              this.setSelect(i, value[i], false);
            }
          } else {
            this.setSelect(0, value, false);
          }
        }

        if (!v && !this.visibleRealByProperty) {
          this._onCancel();
        }
        this.visibleRealByProperty = false;
      },
      datasource: function (val, oldVal) {
        if (val && oldVal) {
          if (utils.isArrayEqualByKey(val, oldVal, ['label', 'value', 'children'])) {
            return;
          }
        }

        let isShow = this.visibleReal;
        if (isShow) {
          this.timer.sleep(300).then(() => {
            this._initRealDatasource(val);
            this._refreshDatasource(true);
          });
        } else {
          this._initRealDatasource(val);
          this._refreshDatasource(true);
        }
      },
    },
    created() {
      this.timer = new bpLibs.Timer();
    },
    beforeMount() {
      if (!this.datasource) {
        throw new Error('picker must have datasource');
      }
      this._initRealDatasource(this.datasource);
      this._refreshDatasource(false);

      this.visibleReal = this.visible;
    },
    beforeDestroy() {
      this.hide();
      this.timer.dispose();
      this.timer = null;
    },
    mounted() {
    },
    methods: {
      /**
       * @desc: 显示
       * @return promise.
       */
      show: function () {
        return this.$refs.widget.show();
      },
      /**
       * @desc: 隐藏.
       * @return promise.
       */
      hide: function () {
        return this.$refs.widget.hide();
      },
      /**
       * @desc: 设置指定组的当前选中值.
       * @param groupIndex: 组索引.
       * @param value: 匹配值.
       * @param trigger: 是否触发change事件.
       */
      setSelect(groupIndex, value, trigger = false) {
        let data = this['items' + groupIndex];
        if (data) {
          let ee = this.$refs.agentMain;
          if (ee) {
            ee = $(ee);
            ee = $(ee.children(`.bp-picker__group`)[groupIndex]);
            ee = $(ee.children('.bp-picker__content')[0]);

            //  let ee = this.$refs['items'+groupIndex];
            if (ee) {
              ee = $(ee);
              let offset = picker_getOffset(ee);
              let i = 0;
              for (; i < data.length; i++) {
                if (data[i].value == value || !value) {
                  break;
                }
              } // for.
              if (i >= data.length) i = data.length - 1;

              if (i < data.length) {
                i = -i * POS_CELL_HEIGHT + POS_CENTER;
                if (i != offset) {
                  picker_setOffset(ee, i);
                  i = picker_getOffset(ee);
                  if (offset != i) {
                    this.realDatasource.picker_changed(groupIndex, this);
                  }
                  if (trigger) {
                    this._onChange();
                  }
                }
              }
            } // if.
          }
        } // if.
      },
      /**
       * @desc: 获得当前界面上选中的元素的值.
       * @param groupIndex: 明确指定后可以获得指定组的值.
       * @return 值.
       */
      getSelect(groupIndex = 0) {
        let value = [];

        let data = this['items' + groupIndex];
        if (data) {
          let ee = this.$refs.agentMain;
          if (ee) {
            ee = $(ee);
            ee = $(ee.children(`.bp-picker__group`)[groupIndex]);
            ee = $(ee.children('.bp-picker__content')[0]);

            // let ee = this.$refs['items'+i];
            if (ee) {
              ee = $(ee);
              let offset = picker_getOffset(ee);
              offset -= POS_CENTER;
              offset = parseInt(-offset / POS_CELL_HEIGHT);

              if (data[offset]) {
                return febs.utils.mergeMap(data[offset]);
              }
            } // if.
          }

          return data[0]?data[0]:{};
        } // if.
        
        return {};
      },
      getValue() {
        let v;
        if (this.groupCount == 1) {
          v = this.value0;
        }
        else if (this.groupCount == 2) {
          v = [this.value0, this.value1];
        }
        else if (this.groupCount == 3) {
          v = [this.value0, this.value1, this.value2];
        }
        else {
          v = [this.value0, this.value1, this.value2, this.value3];
        }
        return v;
      },
      _onCancel() {
        this.$emit('cancel');
      },
      _onChange() {
        let v;
        if (this.groupCount == 1) {
          v = this.getSelect(0).value;
        }
        else if (this.groupCount == 2) {
          v = [this.getSelect(0).value, this.getSelect(1).value];
        }
        else if (this.groupCount == 3) {
          v = [this.getSelect(0).value, this.getSelect(1).value, this.getSelect(2).value];
        }
        else {
          v = [this.getSelect(0).value, this.getSelect(1).value, this.getSelect(2).value,  this.getSelect(3).value];
        }

        this.$emit('change', v);
      },
      _onConfirm() {
        let v;
        if (this.groupCount == 1) {
          this.value0 = this.getSelect(0).value;
          v = this.value0;
        }
        else if (this.groupCount == 2) {
          this.value0 = this.getSelect(0).value;
          this.value1 = this.getSelect(1).value;
          v = [this.value0, this.value1];
        }
        else if (this.groupCount == 3) {
          this.value0 = this.getSelect(0).value;
          this.value1 = this.getSelect(1).value;
          this.value2 = this.getSelect(2).value;
          v = [this.value0, this.value1, this.value2]
        }
        else {
          this.value0 = this.getSelect(0).value;
          this.value1 = this.getSelect(1).value;
          this.value2 = this.getSelect(2).value;
          this.value3 = this.getSelect(3).value;
          v = [this.value0, this.value1, this.value2, this.value3]
        }

        this.noEmitUpdateWatch = true;
        this.$emit('input', v);

        this.$emit('confirm', this);
      },
      _bindEvent() {
        let elHd = this.$refs.agentToolbar;
        let elMain = $(this.$refs.agentMain);
        let elBd = elMain.children('.bp-picker__group').children('.bp-picker__mask');
        let elBc = elMain.children('.bp-picker__group').children('.bp-picker__content');
        // let elIndic = elBd.next('.bp-picker__indicator');

        if (elBc[0]) {
          for (let i = 0; i < elBc.length; i++) {
            $(elBc[i]).off('change').on('change', (event) => {
              let group = parseInt($(event.currentTarget).attr('data-group'));
              this.realDatasource.picker_changed(group, this);

              this._onChange();
            });
          }
        }

        // 内容滑动事件处理.
        if (elBd[0]) {
          let namestart, namemove, nameend, namecancel;
          if (typeof elBd[0].ontouchstart !== 'undefined') {
            namestart = 'touchstart';
            namemove = 'touchmove';
            nameend = 'touchend';
            namecancel = 'touchcancel';
          } else {
            namestart = 'mousedown';
            namemove = 'mousemove';
            nameend = 'mouseup';
            namecancel = 'mouseout';
          }

          for (let i = 0; i < elBd.length; i++) {
            febs.dom.removeEventListener(elBd[i], namestart, mobile_onTouchstart_picker, true);
            febs.dom.removeEventListener(elBd[i], namemove, mobile_onTouchmove_picker, true);
            febs.dom.removeEventListener(elBd[i], nameend, mobile_onTouchend_picker, true);
            febs.dom.removeEventListener(elBd[i], namecancel, mobile_onTouchcancel_picker, true);

            febs.dom.addEventListener(elBd[i], namestart, mobile_onTouchstart_picker, true);
            // elBd[i].addEventListener(namemove, mobile_onTouchmove_picker, true);
            // elBd[i].addEventListener(nameend, mobile_onTouchend_picker, true);
            // elBd[i].addEventListener(namecancel, mobile_onTouchcancel_picker, true);
          }
        } // if.
      },
            /**
       * @desc: 重新获取指定组的数据源.
       * @return Promise. - resolve(value)
       */
      refreshDatasource(groupIndex, trigger = true) {
        return new Promise((resolve, reject) => {
          let needEvent = false;
          let value;
          try {
            this.realDatasource.picker_datasource(groupIndex, this, (ds) => {
              try {
                value = ds.value;
                if (!Array.isArray(ds.datasource)) {
                  throw new Error('picker datasource must is Array');
                }

                if (!((!!this['items' + groupIndex]) && (!!ds.datasource)))
                  needEvent = true;

                this['items' + groupIndex] = ds.datasource;
              } catch (e) {
                reject(e);
              }

              this.$nextTick(() => {
                setTimeout(() => {
                  this.setSelect(groupIndex, value, trigger);
                  resolve(value);
                  this._bindEvent();
                  if (trigger && needEvent) {
                    // this._bindEvent($(`.bp-picker__agent[data-picker-agent="${this.uuid}"]`));
                  }
                }, 0);
              });
            });
          } catch (e) {
            reject(e);
          }
        });
      },
      /**
       * @desc: 重新获取整个数据.
       */
      _refreshDatasource(trigger = true) {
        this.realDatasource.picker_datasource_groups((groupCount) => {
          if (groupCount <= 0 || groupCount > 4) {
            throw new Error('picker group count must in [1,4]');
          }

          this.groupCount = groupCount;

          let p = new Promise((resolve)=>resolve());

          for (let i = 0; i < groupCount; i++) {
            p = p.then(febs.utils.sleep(1).then(this.refreshDatasource(i, trigger)));
          }

          this.$nextTick(() => {
            p.then(() => {
              this._bindEvent();
            });
          });
        });
      },
      /**
       * @desc: 初始化真实datasource.
       */
      _initRealDatasource(datasource) {
        if (Array.isArray(datasource)) {
          // 判断是几列数据.
          let colNum = 1;
          for (let i = 0; i < datasource.length; i++) {
            if (datasource[i].children && Array.isArray(datasource[i].children)) {
              colNum = 2;

              let j = 0;
              for (j = 0; j < datasource[i].children.length; j++) {
                if (datasource[i].children[j].children && Array.isArray(datasource[i].children[j].children)) {
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
          if (colNum == 1) DatasourceClass = SinglePickerDatasource;
          else if (colNum == 2) DatasourceClass = DoublePickerDatasource;
          else DatasourceClass = ThreePickerDatasource;

          this.realDatasource = new DatasourceClass(datasource);
        } else {
          this.realDatasource = datasource;
        }

        if (typeof this.realDatasource.picker_datasource_groups !== 'function' ||
          typeof this.realDatasource.picker_datasource !== 'function' ||
          typeof this.realDatasource.picker_changed !== 'function') {
          throw new Error(
            'picker datasource class must have `picker_datasource_groups`, `picker_datasource`, `picker_changed` function'
          );
        }
      },
    },
  };
</script>