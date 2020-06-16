<!--
/**
* Copyright (c) 2017 Copyright taijin All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: 
*/
 -->

<template>
  <div :class="{
    'bp-input': true,
    'bp-input__warn': isInputWrong,
    'bp-input__textarea': type === 'textarea',
    'bp-input__disabled': disabled !== undefined && disabled !== false,
    'bp-input__focus': focus
  }">
    <bp-icon v-if="prefixIcon" width="25px" class="bp-input__prefixIcon" :name="prefixIcon" @click="_onPrefixIcon" />

    <textarea v-if="type === 'textarea'" class="bp-input__inner"  :disabled="disabled" :readonly="readonly"
      :placeholder="placeholder" :rows="rows" :name="name" :maxlength="maxlength" :autocomplete="autocomplete"
      :required="required" @blur.prevent="_onBlur_fixScroll">{{value}}</textarea>
    
    <input v-else class="bp-input__inner" :type="type2" :disabled="disabled" :step="floatStep"
      :readonly="readonly" :placeholder="placeholder" :name="name" :maxlength="maxlength" :autocomplete="autocomplete"
      :required="required" @blur.prevent="_onBlur_fixScroll"/>

    <bp-icon v-if="isInputWrong" width="25px" class="bp-input__warnIcon" name="bp-input_warn" />

    <div v-if="type === 'textarea' && maxlength" class="bp-input__counter">
      <span>{{typelen}}</span>/{{maxlength}}</div>
    
    <bp-icon v-if="suffixIcon" width="25px" class="bp-input__suffixIcon" :name="suffixIcon" @click="_onSuffixIcon" />
  </div>
</template>

<script>
  import * as febs from 'febs-browser';;
  export default {
    components: {},
    props: {
      disabled: {
        validator: function (value) {
          return !value || value === 'disabled' || value === true;
        }
      },
      readonly: {
        validator: function (value) {
          return !value || value === 'readonly' || value === true;
        }
      },
      value: {
        validator: function (value) {
          if (!value) return true;

          let tt = typeof value;
          return tt === 'string' || tt === 'number' || value instanceof Date;
        }
      },
      prefixIcon: String,
      suffixIcon: String,
      max: Number|String,
      min: Number|String,
      placeholder: String,
      rows: Number|String,
      name: String,
      maxlength: Number|String,
      autocomplete: String,
      required: Boolean,
      /**
       * @desc: 当type为float, unsigned-float时的小数位个数
       */
      decimal: Number,
      /**
       * @desc: 文本类型. 允许的值为:
       *        - int
       *        - unsigned-int
       *        - float
       *        - unsigned-float
       *        - tel
       *        - email
       *        - text
       *        - textarea
       */
      type: {
        validator: function (value) {
          return !value || ['int', 'unsigned-int', 'float', 'unsigned-float', 'tel', 'email',
            'text', 'textarea', 'password'
          ].indexOf(value) >= 0;
        }
      },
      /**
       * @desc: 正则表达式.
       */
      pattern: String,
      validator: {
        validator: function (value) {
          return !value || typeof value === 'function';
        }
      }
    },
    // model: {
    //   prop: "value",
    //   event: 'change',
    // },
    data() {
      return {
        watchValue: true,
        isInputWrong: false,
        realPattern: null,
        regInput: null,
        defaultValue: null,
        isUnsigned: false,
        focus: false,
        typelen: 0,
        floatStep: null,
        _min: Number.MIN_SAFE_INTEGER,
        _max: Number.MAX_SAFE_INTEGER,
      };
    },
    computed: {
      type2() {
        return ['int', 'unsigned-int', 'float', 'unsigned-float'].indexOf(this.type) >= 0 ?
          'number' : this.type;
      },
    },
    watch: {
      value: function (val) {
        if (this.watchValue) {
          this.text(val);
        }
        this.watchValue = true;
      },
      type: function (val) {
        this.$nextTick(() => {
          this.init();
        });
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        // 默认的正则表达式.
        this.realPattern = this.pattern;
        if (this.realPattern && typeof this.realPattern === 'string') {
          this.realPattern = new RegExp(this.realPattern);
        }

        switch (this.type) {
          case 'tel':
            if (!this.realPattern) {
              this.realPattern = new RegExp(
                "^(1[2-9][0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89]|98[0-9]|99[0-9])\\d{8}$"
                );
              this.regInput = new RegExp("[0-9]");
            }
            this.defaultValue = '';
            break;
          case 'int':
            this.isInt = true;
            if (!this.realPattern) {
              this.realPattern = new RegExp("^(((\\-)?[1-9]\\d*)|(0))$");
              this.defaultValue = '0';
            }
            break;
          case 'unsigned-int':
            this.isInt = true;
            if (!this.realPattern) {
              this.realPattern = new RegExp("^([1-9](\\d*)|(0))$");
            }
            this.defaultValue = '0';
            this.isUnsigned = true;
            break;
          case 'float':
            this.isFloat = true;
            if (!this.realPattern) {
              if (this.decimal) {
                this.realPattern = new RegExp("^(\\-?((0(\\.\\d{0," + this.decimal +
                  "})?)|([1-9]\\d*(\\.\\d{0," + this.decimal + "})?)))$");
              } else {
                this.realPattern = new RegExp("^(\\-?((0(\\.\\d*)?)|([1-9]\\d*(\\.\\d*)?)))$");
              }
            }
            this.defaultValue = '0.0';
            if (this.decimal > 0) {
              let tt = '0.';
              for (let i = 0; i < this.decimal - 1; i++) {
                tt += '0';
              }
              tt += '1';
              this.floatStep = tt;
            }
            break;
          case 'unsigned-float':
            this.isFloat = true;
            if (!this.realPattern) {
              if (this.decimal) {
                this.realPattern = new RegExp("^(((0(\\.\\d{0," + this.decimal +
                  "})?)|([1-9]\\d*(\\.\\d{0," + this.decimal + "})?)))$");
              } else {
                this.realPattern = new RegExp("^(((0(\\.\\d*)?)|([1-9]\\d*(\\.\\d*)?)))$");
              }
            }
            this.defaultValue = '0.0';
            if (this.decimal > 0) {
              let tt = '0.';
              for (let i = 0; i < this.decimal - 1; i++) {
                tt += '0';
              }
              tt += '1';
              this.floatStep = tt;
            }
            this.isUnsigned = true;
            break;
          case 'email':
            if (!this.realPattern) {
              this.realPattern = new RegExp(
                "^(([A-Za-z0-9\u4e00-\u9fa5_-]|\\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)$");
            }
            this.defaultValue = '';
        } // switch.

        // validate.
        let el;
        if (this.type === 'textarea') {
          el = $($(this.$el).children('textarea')[0]);
        } else {
          el = $($(this.$el).children('input')[0]);
        }

        if (this.isFloat || this.isInt) {
          this._min = Number.isNaN( parseInt(this.min) )? Number.MIN_SAFE_INTEGER: parseInt(this.min);
          this._max = Number.isNaN( parseInt(this.max) )? Number.MAX_SAFE_INTEGER: parseInt(this.max);
        }

        // 进行一次验证.
        if (this.type === 'textarea') {
          if (this.$slots.default && this.$slots.default.length > 0 && !febs.string.isEmpty(this
              .$slots.default[0].text)) {
            this.validate((vv)=>{
              el.val(vv);
              this.typelen = vv.length;
            }, this.$slots.default[0].text, false, false);
          }
          else if (this.value) {
            this.typelen = this.value.length;
          }
        } else {
          this.validate((vv)=>{
            el.val(vv);
          }, this.value, false, false);
        }

        // change.
        el.off('change');
        el.on('change', (event) => {
          let elem = $(event.target);
          let value = elem.val() || '';

          if (this.isInt ||
            this.isFloat
          ) {
            this.validate((vv)=>{
              elem.val(vv);
            }, value);
          } else {
            this.validate(null, value);
          }

          // type.
          if (this.isInt ||
            this.isFloat
          ) {
            value = Number(value);
            this.$emit('input', value);
            this.$emit('change', value);
          } else {
            this.$emit('input', value);
            this.$emit('change', value);
          }

        });

        // no need picker.
        {
          let autoHide = (event) => {
            // TODO: el不存在时.
            if (!event.target || !event.target.isSameNode(el[0])) {
              el[0].blur();
            }
          };

          el.off('focus');
          el.on('focus', (event) => {
            // this.isInputWrong = false;
            this.$emit('focus', event);

            this.focus = true;

            setTimeout(() => {
              $('body').on('touchstart', autoHide);
            }, 100);

            if (el[0] && (el[0].scrollIntoView || el[0].scrollIntoViewIfNeeded)) {
              setTimeout(() => {
                if (el[0].scrollIntoViewIfNeeded)
                  el[0].scrollIntoViewIfNeeded();
                else
                  el[0].scrollIntoView(false);
              }, 300);
            }
          });

          el.off('blur');
          el.on('blur', (event) => {

            this.focus = false;

            $('body').off('touchstart', autoHide);
            let elem = $(event.target);
            let value = elem.val() || '';
            let oldValue = value;
            this.validate((newValue)=>{
              // type.
              if (this.isInt ||
                this.isFloat
              ) {
                oldValue = Number(oldValue);
                newValue = Number(newValue);
                elem.val(newValue);
              }
              
              if (oldValue != newValue) {
                this.$emit('input', newValue);
                this.$emit('change', newValue, oldValue);
              }

              this.$emit('blur', event);
            }, value);
          });
        } // if..else.

        let inputEventRegistered = false;

        // number.
        if (this.isInt || this.isFloat) {

          if (febs.utils.browserIsMobile()) {
            inputEventRegistered = true;
          }

          el.off(febs.utils.browserIsMobile() ? 'input' : 'keydown');
          el.on(febs.utils.browserIsMobile() ? 'input' : 'keydown', (event) => {
            let key = event.key || event.data;
            if (key && key.length > 1) {
              return true;
            }

            let elem = $(event.target);
            let value = elem.val() || '';

            if (event.inputType == 'deleteContentBackward' || event.inputType ==
              'deleteContentForward') {
              this.$emit('keydown', event);
              if (febs.utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit('input', value);
              }
              return true;
            }

            let isEmpty = value.length == 0;

            var code = event.which || event.keyCode;

            if (key === '-' || code == 109 || code == 189) // -
            {
              if (!this.isUnsigned) {
                if (value && value.length > 0) {
                  if (value[0] == '-') {
                    value = value.substr(1);
                    elem.val(value);
                  } else {
                    value = '-' + value;
                    elem.val(value);
                  }
                }
              }

              // update value.
              this.$emit('keydown', event);

              if (febs.utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit('input', value);
              }

              event.stopPropagation();
              event.preventDefault();
              event.cancelBubble = true;
              return false;
            } // if.

            // 0~9.
            if (key >= '0' && key <= '9') {
              if (value == '0') {
                value = '0.';
              } else if (value == '-0') {
                value = '-0.';
              }

              value = value + key;

              if (this.isFloat && this.decimal) {
                let ii = value.indexOf('.');
                if (ii >= 0 && value.length - ii - 1 > this.decimal) {
                  value = value.substr(0, (ii + 1) + this.decimal);

                  elem.val(value);
                  // update value.
                  this.$emit('keydown', event);

                  if (febs.utils.browserIsMobile()) {
                    this.watchValue = false;
                    this.$emit('input', value);
                  }

                  event.stopPropagation();
                  event.preventDefault();
                  event.cancelBubble = true;
                  return false;
                }
              }

              // update value.
              this.$emit('keydown', event);

              if (febs.utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit('input', value);
              }

              return true;
            }

            // .
            else if (key == '.' && this.isFloat) {
              if (value.indexOf('.') < 0) {
                if (isEmpty) {
                  value = '0';
                  elem.val(value);
                }

                // update value.
                this.$emit('keydown', event);

                if (febs.utils.browserIsMobile()) {
                  this.watchValue = false;
                  this.$emit('input', value);
                }
                return true;
              }
            } else if (!isEmpty) {
              this.validate((vv)=>{
                elem.val(value);

                if (febs.utils.browserIsMobile()) {
                  this.watchValue = false;
                  this.$emit('input', value);
                }

              }, value, true);
            } else {
              value = "";
              elem.val("");

              if (febs.utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit('input', value);
              }
            }

            // update value.
            this.$emit('keydown', event);

            event.stopPropagation();
            event.preventDefault();
            event.cancelBubble = true;
            return false;
          });

          el.off('keyup');
          el.on('keyup', event => {
            this.$emit('keyup', event);
          });

        }
        // other. 
        else {
          el.off('keydown');
          el.on('keydown', (event) => {
            if (event.key.length > 1) {
              return true;
            }

            if (this.regInput) {
              if (!this.regInput.test(event.key)) {
                event.stopPropagation();
                event.preventDefault();
                event.cancelBubble = true;
                return false;
              }
            } // if.

            // update value.
            this.$emit('keydown', event);
            return true;
          });

          if (this.type == 'textarea') {
            el.off('keyup');
            el.on('keyup', (event) => {
              this.typelen = $(event.target).val().length;
              this.$emit('keyup', event);
            });
          } else {
            el.off('keyup');
            el.on('keyup', event => {
              this.$emit('keyup', event);
            });
          }
        } // if..else.

        if (!inputEventRegistered) {
          el.off('input');
          el.on('input', (event) => {
            let elem = $(event.target);
            let value = elem.val() || '';

            if (this.isInt ||
              this.isFloat
            ) {
              this.validate((vv)=>{
                elem.val(vv);
              }, value, true, false);
            } else {
              this.validate(null, value, true, true);
            }

            // type.
            if (this.isInt ||
              this.isFloat
            ) {
              value = Number(value);
              this.watchValue = false;
              this.$emit('input', value);
            } else {
              this.watchValue = false;
              this.$emit('input', value);
            }
          });
        } // if.
      },
      /**
       * @desc: 验证值是否合法, 并返回合法值.
       * @param callback: (v)=>void.
       * @param isInputing: 是否正在输入.
       * @param changeInputWrong: 改变输入错误状态.
       */
      validate: function (callback, value, isInputing = false, changeInputWrong = true) {

        if (febs.utils.isNull(value) || febs.string.isEmpty(value)) {
          value = '';
        }
        value = value.toString();

        let srcValue = value;

        // required.
        if (febs.string.isEmpty(value)) {
          // if (!isInputing) {
            if (!this.required) {
              if (changeInputWrong) {
                this.isInputWrong = false;
              }
            } else {
              if (changeInputWrong) {
                this.isInputWrong = true;
                this.$emit('error');
              }
            }
          // }
          if (callback) callback(value);
          return;
          // return value;
        }

        // maxlength.
        if (this.maxlength) {
          if (value.length > this.maxlength) {
            value = value.substr(0, this.maxlength);
          }
        }

        if (this.realPattern) {
          let matches;
          try {

            if (this.isInt) {
              let ii = value.indexOf('.');
              if (ii >= 0) {
                value = value.substring(0, ii);
              }
            } else if (this.isFloat) {
              if (this.decimal) {
                let ii = value.indexOf('.');
                if (ii >= 0 && value.length - ii - 1 > this.decimal) {
                  let jj = value.indexOf('.', ii + 1);
                  if (jj < 0)
                    jj = value.length;
                  jj = Math.min(jj, ii + this.decimal + 1);
                  value = value.substring(0, jj);
                }
              }
            }

            matches = this.realPattern.exec(value);
          } catch (e) {
            console.log(e);
          }

          if (!matches || !matches[0]) {
            let v = value;
            if (!(v.length == 0 && isInputing)) {
              v = this.defaultValue;
            }

            if (changeInputWrong) {
              this.isInputWrong = true;
              this.$emit('error');
            }
            if (callback) callback(this.defaultValue);
            return;
            // return this.defaultValue;
          } else {
            let value = matches[0];

            let v = parseFloat(value)||0;

            if (v > this._max) {
              v = this._max;
              // return this._max;
            }
            if (v < this._min) {
              v = this._min;
              // return this._min;
            }

            if (this.isFloat) {
              if (value.length > 0) {
                if (value[0] == '.') value = '0' + value;
                else if (!isInputing) {
                  if (value[value.length - 1] == '.') value += '0';
                  else if (value.indexOf('.') < 0) value += '.0';
                }
                v = value;
              } else if (!isInputing) {
                v = this.defaultValue;
              }
            }

            if (changeInputWrong) {
              if (this.validator) {
                this.validator(parseFloat(v), (valid)=>{
                  if (!valid) {
                    this.isInputWrong = true;
                    this.$emit('error');
                  }
                  else {
                    this.isInputWrong = false;
                  }
                });
              }
              else {
                this.isInputWrong = false;
              }
            }

            if (callback) callback(v);
            return;
            // return value;
          }
        } else {
          if (changeInputWrong) {
            if (this.validator) {
              this.validator(value, (valid)=>{
                  if (!valid) {
                    this.isInputWrong = true;
                    this.$emit('error');
                  }
                  else {
                    this.isInputWrong = false;
                  }
                });
            }
            else {
              this.isInputWrong = false;
            }
          }
          if (callback) callback(value);
          return;
          // return value;
        }
      },
      /**
       * @desc 设置or获取文本
       * @param content: 如果为null, 则返回当前的值. 
       *                 如果为 '' 则设置为无内容样式.
       */
      text: function (content) {
        let elem = $(this.$el);
        if (this.type === 'textarea') {
          elem = elem.children('textarea');
        } else {
          elem = elem.children('input');
        }

        if (febs.utils.isNull(content)) {
          return (this.isInt || this.isFloat) ? (Number(elem.val()) || 0) : elem.val();
        } else {

          // type.
          if (this.isInt ||
            this.isFloat
          ) {
            this.validate((newContent)=>{
              elem.val(newContent);
            }, content);
          } else {
            this.validate(null, content);
            elem.val(content);

            this.typelen = content?content.length:0;
          }

        }
      },
      /**
       * @desc: 验证当前是否输入正确.
       * @return: boolean.
       */
      isValid: function () {
        let el;
        if (this.type === 'textarea') {
          el = $($(this.$el).children('textarea')[0]);
        } else {
          el = $($(this.$el).children('input')[0]);
        }
        this.validate(null, el.val());
        return !this.isInputWrong;
      },

      /**
       * @desc: ios 键盘不回弹问题.
       */
      _onBlur_fixScroll() {
        let u = navigator.userAgent, app = navigator.appVersion;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isIOS){
          setTimeout(() => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo({left:0, top: Math.max(scrollHeight - 1, 0), behavior: 'smooth'});
            // window.scrollTo(0, Math.max(scrollHeight - 1, 0))
            // this.$emit('blur');
          }, 200)
        }
      },

      /**
      * @desc: 点击后置图标.
      */
      _onSuffixIcon() {
        this.$emit('click-icon', 'suffixIcon');
      },

      /**
      * @desc: 点击后置图标.
      */
      _onPrefixIcon() {
        this.$emit('click-icon', 'prefixIcon');
      },
    },
  };
</script>
