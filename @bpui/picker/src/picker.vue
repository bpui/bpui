<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
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
  <bp-widget ref="widget" class="bp-picker" :class="tabletClass"
    :visible.sync="visibleReal" 
    :maskClose="maskClose" 
    :mask="mask" 
    :preventEvent="true"
    :appendToBody="true"
    :vibrateWhenShow="true">
    
    <div class="bp-widget__contentWrap"
      @click.stop
      :class="pageClass" 
      :style="pageStyle">
      <div v-if="$slots['toolbar'] && (toolbarPos?toolbarPos=='top':(!tabletClass))" class="bp-picker__toolbar bp-ellipsis" >
        <slot name="toolbar" />
      </div>
      <div v-else-if="(toolbarPos?toolbarPos=='top':(!tabletClass))" class="bp-picker__toolbar bp-ellipsis" ref="agentToolbar">
        <button class="bp-picker__cancelBtn" @click="visibleReal=false">{{cancelBtnText}}</button>
        <button :disabled="confirmBtnDisabled" @click="_onConfirm">{{confirmBtnText}}</button>
      </div>

      <div class="bp-picker__main" ref="agentMain">
        <div class="bp-picker__group" data-picker="0" :style="{display:groupCount>0?'inherit':'none'}">
          <div class="bp-picker__indicator"></div>
          <div ref="content0" class="bp-picker__content" data-group="0" :style="'transform: translate3d(0px, 102px, 0px); transition: all 0.3s;'">
            <template v-if="$slots.default">
              <slot v-if="(slotReRender||!slotReRender)" name="default"/>
            </template>
            <template v-else>
              <div v-for="(item, index) in items0" :class="'bp-picker__item' + (item.disabled?' bp-picker__item-disabled':'')"
                :data-value="item.value" :key="'_1'+index">{{item.label}}
                <template v-if="multiple && items0Checked">
                  <bp-icon v-if="items0Checked[index]" class="bp-picker__item_check" name="bp-picker_check"/>
                  <i v-else class="bp-picker__item_uncheck"/>
                </template>
              </div>
            </template>
          </div>
          <div class="bp-picker__mask" :style="multiple&&groupCount==1?'cursor:pointer':null"></div>
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

      <div v-if="$slots['toolbar'] && (toolbarPos?toolbarPos=='bottom':(tabletClass))" class="bp-picker__toolbar bp-ellipsis" >
        <slot name="toolbar" />
      </div>
      <div v-else-if="(toolbarPos?toolbarPos=='bottom':(tabletClass))" class="bp-picker__toolbar bp-ellipsis" ref="agentToolbar">
        <button class="bp-picker__cancelBtn" @click="visibleReal=false">{{cancelBtnText}}</button>
        <button :disabled="confirmBtnDisabled" @click="_onConfirm">{{confirmBtnText}}</button>
      </div>
    </div>
  </bp-widget>
</template>

<script>
  import * as febs from 'febs-browser';
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
    mobile_onWheel_picker,
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
      // 仅对一维数据源有效.
      multiple: Boolean,

      toolbarPos: {
        type: String,
        validator: function(value) { return value === 'top' || value === 'bottom'; }
      },

      forcePhoneStyle: {
        default: false,
        type: Boolean|String,
        validator: function(value) { return typeof value === 'boolean' || value === 'true' || value === 'false'; }
      },

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
          return !value || (typeof value === 'object') || Array.isArray(value);
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
        slotReRender: false,
        confirmBtnDisabled: false,
        isMobile: null,
        tabletClass: null,
        visibleReal: false,
        visibleRealByProperty: false,
        /**
         * @desc: 数据源.
         */
        items0Checked: null,
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
        this.items0CheckedValue = v;
        if (this.noEmitUpdateWatch) {
          this.noEmitUpdateWatch = false;
          return;
        }

        if (v === vOld)
          return;

        let t = typeof v;
        
        if (t === 'string' || t === 'number') {
          this.value0 = v;
          if (this.multiple && this.groupCount == 1) {
            for (let i = 0; i < this.items0Checked.length; i++) {
              if (this.items0[i].value === v) {
                this.items0Checked[i] = true;
              } else {
                this.items0Checked[i] = false;
              }
            }

            // by solt.
            if (!this.datasource) {
              let ii = 0;
              for (let i = 0; i < this.$slots.default.length; i++) {
                let c = this.$slots.default[i];
                if (!c.tag) continue;
                if (c.tag.indexOf('bpPickerCell') >= 0) {
                  if (this.items0[ii++].value === v) {
                    c.componentInstance.check = true;
                  } else {
                    c.componentInstance.check = false;
                  }
                }
              }
            } // if.
          } // if.

          this.$nextTick(()=>{
            this.setSelect(0, v, false);
          });
        } else if (Array.isArray(v)) {
          if (utils.isArrayEqual(v, vOld)) {
            return;
          }

          if (this.multiple && this.groupCount == 1) {
            let arr = [];
            arr.length = this.items0Checked.length;
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < v.length; j++) {
                if (this.items0[i].value === v[j]) {
                  arr[i] = true;
                  break;
                }
              }
            }
            this.items0Checked = arr;

            // by solt.
            if (!this.datasource) {

              this.$nextTick(()=>{
                let ii = 0;
                for (let i = 0; i < this.$slots.default.length; i++) {
                  let c = this.$slots.default[i];
                  if (!c.tag) continue;
                  if (c.tag.indexOf('bpPickerCell') >= 0) {
                    if (arr[ii++]) {
                      c.componentInstance.check = true;
                    }
                    else {
                      c.componentInstance.check = false;
                    }
                  }
                }

                this.slotReRender = !this.slotReRender;
              });
            } // if.

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
            if (this.multiple && this.groupCount == 1) {
              let arr = [];
              arr.length = this.items0Checked.length;
              for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < value.length; j++) {
                  if (this.items0[i] && this.items0[i].value === value[j]) {
                    arr[i] = true;
                    break;
                  }
                }
              }
              this.items0Checked = arr;

              // by solt.
              if (!this.datasource) {
                this.$nextTick(()=>{
                  let ii = 0;
                  for (let i = 0; i < this.$slots.default.length; i++) {
                    let c = this.$slots.default[i];
                    if (!c.tag) continue;
                    if (c.tag.indexOf('bpPickerCell') >= 0) {
                      if (arr[ii++]) {
                        c.componentInstance.check = true;
                      }
                      else {
                        c.componentInstance.check = false;
                      }
                    }
                  }

                  this.slotReRender = !this.slotReRender;
                });
              }
            }
            else {
              for (let i = 0; i < value.length && i < 4; i++) {
                this.setSelect(i, value[i], false);
              }
            }
          } else {
            this.setSelect(0, value, false);

            if (this.multiple && this.groupCount == 1) {
              let arr = [];
              arr.length = this.items0Checked.length;
              this.items0Checked = arr;

              // by solt.
              if (!this.datasource) {
                this.$nextTick(()=>{
                  for (let i = 0; i < this.$slots.default.length; i++) {
                    let c = this.$slots.default[i];
                    if (!c.tag) continue;
                    if (c.tag.indexOf('bpPickerCell') >= 0) {
                      c.componentInstance.check = false;
                    }
                  }

                  this.slotReRender = !this.slotReRender;
                });
              }
            }
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
      this.isMobile = febs.utils.browserIsMobile();
      this.items0CheckedValue = this.value;

      let forcePhoneStyle = this.forcePhoneStyle === true || this.forcePhoneStyle === 'true';
      if (!febs.utils.browserIsPhone() && !forcePhoneStyle) {
        this.tabletClass = 'bp-picker__tablet';
      }

      if (!this.datasource) {
        if (!this.$slots.default) {
          throw new Error('picker must have datasource');
        }
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
      // febs.dom.addEventListener(this.$refs.content0, 'click', this._onClickGroup0Current);

      //  by slot and multiple.
      if (!this.datasource && this.multiple && this.groupCount == 1) {
        let ii = 0;
        for (let i = 0; i < this.$slots.default.length; i++) {
          let c = this.$slots.default[i];
          if (!c.tag) continue;
          if (c.tag.indexOf('bpPickerCell') >= 0) {
            c.componentInstance.multiple = true;
            if (Array.isArray(this.value)) {
              if (this.value.indexOf(c.componentOptions.propsData.value) >= 0) {
                c.componentInstance.check = true;
                this.items0Checked[ii] = true;
              }
            }
            else if (c.componentOptions.propsData.value == this.value) {
              c.componentInstance.check = true;
              this.items0Checked[ii] = true;
            }
            ii++;
          }
        }
      } // if.
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
        this.confirmBtnDisabled = false;
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
                  if (!!data[i].disabled && (!this.multiple || this.groupCount != 1)) {
                    this.confirmBtnDisabled = true;
                  }
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
                    if (this.realDatasource) {
                      this.realDatasource.picker_changed(groupIndex, this);
                    }
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
      _getSelectIndex(groupIndex = 0) {
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
            return offset;
          } // if.
        }
        return 0;
      },
      /**
       * @desc: 获得当前界面上选中的元素的值.
       * @param groupIndex: 明确指定后可以获得指定组的值.
       * @return 值.
       */
      getSelect(groupIndex = 0) {
        let data = this['items' + groupIndex];
        if (data) {
          let index = this._getSelectIndex(groupIndex);
          if (data[index]) {
            return febs.utils.mergeMap(data[index]);
          }

          return data[0]?febs.utils.mergeMap(data[0]):{};
        } // if.
        
        return {};
      },
      getValue() {
        let v;
        if (this.groupCount == 1) {
          if (this.multiple && this.groupCount == 1) {
            if (!this.items0CheckedValue) {
              return null;
            }
            return Array.isArray(this.items0CheckedValue)? this.items0CheckedValue: [this.items0CheckedValue];
          }
          else {
            v = this.value0;
          }
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
          let c0 = this.getSelect(0);
          v = c0.value;

          if (this.multiple) {
            this.confirmBtnDisabled = false;
          }
          else {
            this.confirmBtnDisabled = !!c0.disabled;
          }
        }
        else if (this.groupCount == 2) {
          let c0 = this.getSelect(0);
          let c1 = this.getSelect(1);
          v = [c0.value, c1.value];
          this.confirmBtnDisabled = !!c0.disabled || !!c1.disabled;
        }
        else if (this.groupCount == 3) {
          let c0 = this.getSelect(0);
          let c1 = this.getSelect(1);
          let c2 = this.getSelect(2);
          v = [c0.value, c1.value, c2.value];
          this.confirmBtnDisabled = !!c0.disabled || !!c1.disabled || !!c2.disabled;
        }
        else {
          let c0 = this.getSelect(0);
          let c1 = this.getSelect(1);
          let c2 = this.getSelect(2);
          let c3 = this.getSelect(3);
          v = [c0.value, c1.value, c2.value, c3.value];
          this.confirmBtnDisabled = !!c0.disabled || !!c1.disabled || !!c2.disabled || !!c3.disabled;
        }

        this.$emit('change', v);
      },
      _onConfirm() {
        let v;
        if (this.groupCount == 1) {
          if (this.multiple && this.groupCount == 1) {
            v = [];
            for (let i = 0; i < this.items0Checked.length; i++) {
              if (this.items0Checked[i]) {
                v.push(this.items0[i].value);
              }
            }
            this.items0CheckedValue = v;
          }
          else {
            let item0 = this.getSelect(0);
            if (!!item0.disabled) {
              return;
            }

            this.value0 = item0.value;
            v = this.value0;
          }
        }
        else if (this.groupCount == 2) {
          let item0 = this.getSelect(0);
          let item1 = this.getSelect(1);
          if (!!item0.disabled || !!item1.disabled) {
            return;
          }

          this.value0 = item0.value;
          this.value1 = item1.value;
          v = [this.value0, this.value1];
        }
        else if (this.groupCount == 3) {
          let item0 = this.getSelect(0);
          let item1 = this.getSelect(1);
          let item2 = this.getSelect(2);
          if (!!item0.disabled || !!item1.disabled || !!item2.disabled) {
            return;
          }

          this.value0 = item0.value;
          this.value1 = item1.value;
          this.value2 = item2.value;
          v = [this.value0, this.value1, this.value2]
        }
        else {
          let item0 = this.getSelect(0);
          let item1 = this.getSelect(1);
          let item2 = this.getSelect(2);
          let item3 = this.getSelect(3);
          if (!!item0.disabled || !!item1.disabled || !!item2.disabled || !!item3.disabled) {
            return;
          }

          this.value0 = item0.value;
          this.value1 = item1.value;
          this.value2 = item2.value;
          this.value3 = item3.value;
          v = [this.value0, this.value1, this.value2, this.value3]
        }

        this.noEmitUpdateWatch = true;
        this.$emit('input', v);
        this.$emit('confirm', this);
      },
      _onClickGroup0Start() {
        if (this.multiple && this.groupCount == 1) {
          this.preIndexClickGroup0 = this._getSelectIndex(0);
        }
      },
      _onClickGroup0End() {
        if (this.multiple && this.groupCount == 1) {
          bpLibs.dom.probeDom(100, ()=>{
            return getComputedStyle(this.$refs.content1).transition.indexOf('none') != 0;
          }, ()=>{
            let curIndexClickGroup0 = this._getSelectIndex(0);
            if (curIndexClickGroup0 == this.preIndexClickGroup0) {
              if (!!!this.items0[curIndexClickGroup0].disabled) {
                let check = !!!this.items0Checked[curIndexClickGroup0];
                this.$set(this.items0Checked, curIndexClickGroup0, check);
                if (!this.datasource) {
                  let ii = 0;
                  for (let i = 0; i < this.$slots.default.length; i++) {
                    let c = this.$slots.default[i];
                    if (!c.tag) continue;
                    if (c.tag.indexOf('bpPickerCell') >= 0) {
                      if (ii == curIndexClickGroup0) {
                        c.componentInstance.check = check;
                        this.slotReRender = !this.slotReRender;
                        break;
                      }
                      ii++;
                    }
                  }
                }
              }
            }
          });
        }
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

              if (this.realDatasource) {
                this.realDatasource.picker_changed(group, this);
              }

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
            febs.dom.removeEventListener(elBd[i], namestart, this._onClickGroup0Start, true);
            febs.dom.removeEventListener(elBd[i], nameend, this._onClickGroup0End, true);

            febs.dom.removeEventListener(elBd[i], namestart, mobile_onTouchstart_picker, true);
            febs.dom.removeEventListener(elBd[i], namemove, mobile_onTouchmove_picker, true);
            febs.dom.removeEventListener(elBd[i], nameend, mobile_onTouchend_picker, true);
            febs.dom.removeEventListener(elBd[i], namecancel, mobile_onTouchcancel_picker, true);

            febs.dom.addEventListener(elBd[i], namestart, mobile_onTouchstart_picker, true);
            // elBd[i].addEventListener(namemove, mobile_onTouchmove_picker, true);
            // elBd[i].addEventListener(nameend, mobile_onTouchend_picker, true);
            // elBd[i].addEventListener(namecancel, mobile_onTouchcancel_picker, true);

            if (i == 0 && this.multiple && this.groupCount == 1) {
              febs.dom.addEventListener(elBd[i], namestart, this._onClickGroup0Start, true);
              febs.dom.addEventListener(elBd[i], nameend, this._onClickGroup0End, true);
            }

            if (!this.isMobile) {
              let agent = navigator.userAgent;
              if (/.*Firefox.*/.test(agent)) {
                febs.dom.removeEventListener(elBd[i], 'DOMMouseScroll', mobile_onWheel_picker, true);
                febs.dom.addEventListener(elBd[i], 'DOMMouseScroll', mobile_onWheel_picker, true);
              }
              else {
                febs.dom.removeEventListener(elBd[i], 'mousewheel', mobile_onWheel_picker, true);
                febs.dom.addEventListener(elBd[i], 'mousewheel', mobile_onWheel_picker, true);
              }
            }
          }
        } // if.
      },
            /**
       * @desc: 重新获取指定组的数据源.
       * @return Promise. - resolve(value)
       */
      refreshDatasource(groupIndex, trigger = true) {

        // 使用solt的单数据源.
        if (!this.realDatasource) {
          if (!this.$slots.default) {
            throw new Error('picker missing datasource or children cells');
          }

          return new Promise((resolve, reject) => {
            let value = this.value;
            let datasource = [];
            try {
              for (let i = 0; i < this.$slots.default.length; i++) {
                let c = this.$slots.default[i];
                if (!c.tag) continue;
                if (c.tag.indexOf('bpPickerCell') >= 0) {
                  datasource.push({
                    value: c.componentOptions.propsData.value,
                    disabled: c.componentOptions.propsData.disabled,
                  });
                }
                else {
                  throw new Error('picker children must be bp-picker-cell');
                }
              }

              if (this.groupCount == 1 && this.multiple && groupIndex == 0) {
                this.items0Checked = this.items0Checked || [];
                this.items0Checked.length = datasource.length;
              }

              this['items' + 0] = datasource;

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
            } catch (e) {
              reject(e);
            }
          });
        }

        // 使用datasource的数据源.
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

                if (this.groupCount == 1 && this.multiple && groupIndex == 0) {
                  this.items0Checked = this.items0Checked || [];
                  this.items0Checked.length = ds.datasource.length;
                }

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
        if (this.realDatasource) {
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
        } else {
          this.groupCount = 1;
          let p = febs.utils.sleep(1).then(this.refreshDatasource(0, trigger));

          this.$nextTick(() => {
            p.then(() => {
              this._bindEvent();
            });
          });
        }
      },
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