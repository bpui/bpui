<!--
/**
* Copyright (c) 2017 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc:
*/
 -->

<template>
  <div
    :class="{
      'bp-input': true,
      'bp-input__warn': isInputWrong,
      'bp-input__textarea': type === 'textarea',
      'bp-input__disabled': disabled !== undefined && disabled !== false,
      'bp-input__focus': isFocus,
    }"
  >
    <bp-icon
      v-if="prefixIcon"
      width="25px"
      class="bp-input__prefixIcon"
      :name="prefixIcon"
      @click="_onPrefixIcon"
    />
    <span
      class="bp-input__prefixLabel"
      v-else-if="prefixLabel">{{prefixLabel}}</span>

    <textarea
      v-if="type === 'textarea'"
      class="bp-input__inner"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :rows="rows"
      :name="name"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :required="required"
      @blur.prevent="_onBlur_fixScroll"
      >{{ value2 || "" }}</textarea
    >

    <input
      v-else
      class="bp-input__inner"
      :type="type2"
      :disabled="disabled"
      :step="floatStep"
      :readonly="readonly"
      :placeholder="placeholder"
      :name="name"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :required="required"
      @blur.prevent="_onBlur_fixScroll"
    />
    <bp-icon
      v-if="isInputWrong"
      width="25px"
      class="bp-input__warnIcon"
      name="bp-input_warn"
    />
    <div v-show="showClearable" class="bp-input_clearIcon" @click="()=>text('')">
      <div>
        <bp-icon name="bp-input_clear" />
      </div>
    </div>

    <div v-if="type === 'textarea' && maxlength" class="bp-input__counter">
      <span>{{ typelen }}</span
      >/{{ maxlength }}
    </div>

    <bp-icon
      v-if="suffixIcon"
      width="25px"
      class="bp-input__suffixIcon"
      :name="suffixIcon"
      @click="_onSuffixIcon"
    />
    <span
      class="bp-input__suffixLabel"
      v-else-if="suffixLabel">{{suffixLabel}}</span>
  </div>
</template>

<script>
import * as febs from "febs-browser";
export default {
  components: {},
  props: {
    disabled: {
      validator: function (value) {
        return !value || value === "disabled" || value === true;
      },
    },
    readonly: {
      validator: function (value) {
        return !value || value === "readonly" || value === true;
      },
    },
    value: {
      validator: function (value) {
        if (!value) return true;
        let tt = typeof value;
        return tt === "string" || tt === "number";
      },
    },
    clearable: String,
    prefixIcon: String,
    suffixIcon: String,
    prefixLabel: String,
    suffixLabel: String,
    max: Number | String,
    min: Number | String,
    placeholder: String,
    errorText: String,
    rows: Number | String,
    name: String,
    maxlength: Number | String,
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
        return (
          !value ||
          [
            "int",
            "unsigned-int",
            "float",
            "unsigned-float",
            "tel",
            "email",
            "text",
            "textarea",
            "password",
          ].indexOf(value) >= 0
        );
      },
    },
    /**
     * @desc: 正则表达式.
     */
    pattern: String,
    validator: {
      validator: function (value) {
        return !value || typeof value === "function";
      },
    },
  },
  // model: {
  //   prop: "value",
  //   event: 'change',
  // },
  data() {
    return {
      value2: "", // 用于textarea上的value(ie中value不能变化,否则vdom会错误.)
      watchValue: true,
      isInputWrong: false,
      realPattern: null,
      regInput: null,
      defaultValue: null,
      isUnsigned: false,
      isFocus: false,
      _isFocusForClean: false,  // 用于显示清除按钮.
      typelen: 0,
      floatStep: null,
      _min: Number.MIN_SAFE_INTEGER,
      _max: Number.MAX_SAFE_INTEGER,
      textChangeMark: false, 
      isMarkError: null,
    };
  },
  computed: {
    type2() {
      return ["int", "unsigned-int", "float", "unsigned-float"].indexOf(
        this.type
      ) >= 0
        ? "number"
        : this.type;
    },
    showClearable() {
      if (this.clearable != null) {
        if ((this.textChangeMark || !this.textChangeMark) && this._isFocusForClean) {
          let t = this.text();
          return t ? t.length > 0: false;
        }
      }

      return false;
    }
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
    },
    max: function (val) {
      this.init();
    },
    min: function (val) {
      this.init();
    },
    pattern: function (val) {
      this.init();
    },
  },
  beforeMount() {
    this.value2 = this.value;
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    let el;
    el = $(this.$el);
    let ee = el.children("input")[0];
    if (!ee) {
      ee = el.children("textarea")[0];
    }
    ee = $(ee);

    ee.off('keydown')
      .off('keyup')
      .off('input')
      .off('change')
      .off('focus')
      .off('blur')
      .off('keyoff')
      .off('keyoff');
  },
  methods: {
    init() {
      // 默认的正则表达式.
      this.realPattern = this.pattern;
      if (this.realPattern && typeof this.realPattern === "string") {
        this.realPattern = new RegExp(this.realPattern);
      }

      switch (this.type) {
        case "int":
        case "unsigned-int":
        case "float":
        case "unsigned-float":
          this._initIntFloat();
          break;
        case "textarea":
          this._initTextarea();
          break;
        // case 'tel':
        // case 'email':
        default:
          this._initOther();
          break;
      } // switch.

      // 防止ie上刷新后保留input内容.
      if (febs.utils.browserIsIE()) {
        this.$timer.sleep(100).then(() => {
          this.text(this.value || "");
        });
      }

      this.text(this.value||'');
    },
    _initOther() {
      switch (this.type) {
        case "tel":
          if (!this.realPattern) {
            this.realPattern = new RegExp(
              "^(1[2-9][0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89]|98[0-9]|99[0-9])\\d{8}$"
            );
            this.regInput = new RegExp("[0-9]");
          }
          this.defaultValue = "";
          break;
        case "email":
          if (!this.realPattern) {
            this.realPattern = new RegExp(
              "^(([A-Za-z0-9\u4e00-\u9fa5_-]|\\.)+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+)$"
            );
          }
          this.defaultValue = "";
          break;
      } // switch.

      // validate.
      let el;
      el = $($(this.$el).children("input")[0]);

      // 进行一次验证.
      this.validate(
        (vv) => {
          el.val(vv);
        },
        this.value,
        false,
        false
      );

      this._handleChange_text(el);
      this._handleFocusBlur(el);
      this._handleKeydownKeyup_text(el);
      this._handleInput(el);
    },
    _initTextarea() {
      // validate.
      let el;
      el = $($(this.$el).children("textarea")[0]);

      // 进行一次验证.
      if (
        this.$slots.default &&
        this.$slots.default.length > 0 &&
        !febs.string.isEmpty(this.$slots.default[0].text)
      ) {
        this.validate(
          (vv) => {
            el.val(vv);
            this.typelen = vv.length;
          },
          this.$slots.default[0].text,
          false,
          false
        );
      } else if (this.value) {
        this.typelen = this.value.length;
      }

      this._handleChange_text(el);
      this._handleFocusBlur(el);
      this._handleKeydownKeyup_text(el);
      this._handleInput(el);
    },
    _initIntFloat() {
      switch (this.type) {
        case "int":
          this.isInt = true;
          if (!this.realPattern) {
            this.realPattern = new RegExp("^(((\\-)?[1-9]\\d*)|(0))$");
            this.defaultValue = "0";
          }

          break;
        case "unsigned-int":
          this.isInt = true;
          if (!this.realPattern) {
            this.realPattern = new RegExp("^([1-9](\\d*)|(0))$");
          }
          this.defaultValue = "0";
          this.isUnsigned = true;
          break;
        case "float":
          this.isFloat = true;
          if (!this.realPattern) {
            if (this.decimal) {
              this.realPattern = new RegExp(
                "^(\\-?((0(\\.\\d{0," +
                  this.decimal +
                  "})?)|([1-9]\\d*(\\.\\d{0," +
                  this.decimal +
                  "})?)))$"
              );
            } else {
              this.realPattern = new RegExp(
                "^(\\-?((0(\\.\\d*)?)|([1-9]\\d*(\\.\\d*)?)))$"
              );
            }
          }
          this.defaultValue = "0.0";
          if (this.decimal > 0) {
            let tt = "0.";
            for (let i = 0; i < this.decimal - 1; i++) {
              tt += "0";
            }
            tt += "1";
            this.floatStep = tt;
          }
          break;
        case "unsigned-float":
          this.isFloat = true;
          if (!this.realPattern) {
            if (this.decimal) {
              this.realPattern = new RegExp(
                "^(((0(\\.\\d{0," +
                  this.decimal +
                  "})?)|([1-9]\\d*(\\.\\d{0," +
                  this.decimal +
                  "})?)))$"
              );
            } else {
              this.realPattern = new RegExp(
                "^(((0(\\.\\d*)?)|([1-9]\\d*(\\.\\d*)?)))$"
              );
            }
          }
          this.defaultValue = "0.0";
          if (this.decimal > 0) {
            let tt = "0.";
            for (let i = 0; i < this.decimal - 1; i++) {
              tt += "0";
            }
            tt += "1";
            this.floatStep = tt;
          }
          this.isUnsigned = true;
          break;
      } // switch.

      // validate.
      let el;
      el = $($(this.$el).children("input")[0]);
      this._min = Number.isNaN(parseFloat(this.min))
        ? Number.MIN_SAFE_INTEGER
        : parseFloat(this.min);
      this._max = Number.isNaN(parseFloat(this.max))
        ? Number.MAX_SAFE_INTEGER
        : parseFloat(this.max);
      
      // 进行一次验证.
      this.validate(
        (vv) => {
          el.val(vv);
        },
        this.value,
        false,
        false
      );

      this._handleChange_number(el);
      this._handleFocusBlur(el);
      this._handleKeydownKeyup_number(el);
      this._handleInput(el);
    },
    _handleInput(el) {
      // input.
      el.off("input");
      el.on("input", (event) => {
        // console.debug('event ' + event.type);

        let elem = $(event.currentTarget);
        let value = elem.val() || "";

        if (this.isInt || this.isFloat) {
          this.validate(
            (vv) => {
              elem.val(vv);
              if (this.isMarkError == vv) {
                this.isInputWrong = true;
              }
            },
            value,
            true,
          );
        } else {
          this.validate(null, value, true);
          if (this.isMarkError == value) {
            this.isInputWrong = true;
          }
        }

        // type.
        if (this.isInt || this.isFloat) {
          value = Number(value);
          this.watchValue = false;
          this.$emit("input", value);
        } else {
          this.watchValue = false;
          this._onNextInput();
          this.$emit("input", value);
        }
      });
    },
    _handleKeydownKeyup_text(el) {
      // keydown, keyup.
      el.off("keydown");
      el.on("keydown", (event) => {

        // console.debug('event text ' + event.type);

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
        this.$emit("keydown", event);

        return true;
      });

      if (this.type == "textarea") {
        el.off("keyup");
        el.on("keyup", (event) => {
          
          // console.debug('event textarea ' + event.type);

          let vv = $(event.currentTarget).val() || "";
          this.typelen = vv.length;
          this.$emit("keyup", event);
        });
      } else {
        el.off("keyup");
        el.on("keyup", (event) => {
          // console.debug('event ' + event.type);
          this.$emit("keyup", event);
        });
      }
    },
    _handleKeydownKeyup_number(el) {
      // number.
      el.off(febs.utils.browserIsMobile() ? "input" : "keydown");
      el.on(febs.utils.browserIsMobile() ? "input" : "keydown", (event) => {

        // console.debug('event number ' + event.type);

        let key = event.key || event.data;
        if (key && key.length > 1) {
          return true;
        }

        let elem = $(event.currentTarget);
        let value = elem.val() || "";

        if (
          event.inputType == "deleteContentBackward" ||
          event.inputType == "deleteContentForward"
        ) {
          this.$emit("keydown", event);
          if (febs.utils.browserIsMobile()) {
            this.watchValue = false;
            this.$emit("input", value);
          }
          return true;
        }

        let isEmpty = value.length == 0;

        var code = event.which || event.keyCode;

        if (key === "-" || code == 109 || code == 189) {
          // -
          if (!this.isUnsigned) {
            if (value && value.length > 0) {
              if (value[0] == "-") {
                value = value.substr(1);
                elem.val(value);
              } else {
                value = "-" + value;
                elem.val(value);
              }
            }
          }

          // update value.
          this.$emit("keydown", event);

          if (febs.utils.browserIsMobile()) {
            this.watchValue = false;
            this.$emit("input", value);
          }

          event.stopPropagation();
          event.preventDefault();
          event.cancelBubble = true;
          return false;
        } // if.

        // 0~9.
        if (key >= "0" && key <= "9") {
          if (value == "0") {
            value = "0.";
          } else if (value == "-0") {
            value = "-0.";
          }

          value = value + key;

          if (this.isFloat && this.decimal) {
            let ii = value.indexOf(".");
            if (ii >= 0 && value.length - ii - 1 > this.decimal) {
              value = value.substr(0, ii + 1 + this.decimal);

              elem.val(value);
              // update value.
              this.$emit("keydown", event);

              if (febs.utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit("input", value);
              }

              event.stopPropagation();
              event.preventDefault();
              event.cancelBubble = true;
              return false;
            }
          }

          // update value.
          this.$emit("keydown", event);

          if (febs.utils.browserIsMobile()) {
            this.watchValue = false;
            this.$emit("input", value);
          }

          return true;
        }

        // .
        else if (key == "." && this.isFloat) {
          if (value.indexOf(".") < 0) {
            if (isEmpty) {
              value = "0.";
              elem.val(value);
            }

            // update value.
            this.$emit("keydown", event);

            if (febs.utils.browserIsMobile()) {
              this.watchValue = false;
              this.$emit("input", value);
            }
            return true;
          }
        }
        else if (!isEmpty) {
          this.validate(
            (vv) => {
              elem.val(value);

              if (febs.utils.browserIsMobile()) {
                this.watchValue = false;
                this.$emit("input", value);
              }
            },
            value,
            true
          );
        }
        else {
          value = "";
          elem.val("");

          if (febs.utils.browserIsMobile()) {
            this.watchValue = false;
            this.$emit("input", value);
          }
        }

        // update value.
        this.$emit("keydown", event);

        event.stopPropagation();
        event.preventDefault();
        event.cancelBubble = true;
        return false;
      });

      el.off("keyup");
      el.on("keyup", (event) => {
        // console.debug('event number ' + event.type);
        this.$emit("keyup", event);
      });
    },
    _handleChange_text(el) {
      // change.
      el.off("change");
      el.on("change", (event) => {
        // console.debug('event text ' + event.type);
        let elem = $(event.currentTarget);
        let value = elem.val() || "";

        this.validate(null, value);
        this._onNextInput();
        this.$emit("input", value);
        this.$emit("change", value);
      });
    },
    _handleChange_number(el) {
      el.off("change");
      el.on("change", (event) => {
        // console.debug('event number ' + event.type);
        let elem = $(event.currentTarget);
        let value = elem.val() || "";
        this.validate((vv) => {
          elem.val(vv);
        }, value);

        value = Number(value);
        this.$emit("input", value);
        this.$emit("change", value);
      });
    },
    _handleFocusBlur(el) {
      // no need picker.
      let autoHide = (event) => {
        // TODO: el不存在时.
        if (!event.currentTarget || !event.currentTarget.isSameNode(el[0])) {
          el[0].blur();
        }
      };

      el.off("focus");
      el.on("focus", (event) => {
        // console.debug('event ' + event.type);

        // this.isInputWrong = false;
        // this.isValid();
        this.$emit("focus", event);

        this.isFocus = true;
        if (this.type2 != 'number') {
          this.$timer.sleep(200).then(()=>{
            this._isFocusForClean = true;
            this._onNextInput();
          });
        }

        // mobile side scroll.
        if (febs.utils.browserIsMobile()) {
          setTimeout(() => {
            $("body").on("touchstart", autoHide);
          }, 100);

          if (el[0] && (el[0].scrollIntoView || el[0].scrollIntoViewIfNeeded)) {
            setTimeout(() => {
              if (el[0].scrollIntoViewIfNeeded) el[0].scrollIntoViewIfNeeded();
              else el[0].scrollIntoView(false);
            }, 300);
          }
        }
      });

      el.off("blur");
      el.on("blur", (event) => {
        // console.debug('event ' + event.type);
        this.isFocus = false;
        if (this.type2 != 'number') {
          this.$timer.sleep(200).then(()=>{
            this._isFocusForClean = false;
            this._onNextInput();
          });
        }

        if (febs.utils.browserIsMobile()) {
          $("body").off("touchstart", autoHide);
        }

        let elem = $(event.currentTarget);
        let value = elem.val() || "";
        let oldValue = value;

        if (this.isMarkError == value) {
          this.isInputWrong = true;
          return;
        }

        this.isMarkError = null;

        this.validate((newValue) => {
          // type.
          if (this.isInt || this.isFloat) {
            oldValue = Number(oldValue) || 0;
            newValue = Number(newValue) || 0;

            if (this.isFloat) {
              if (Number.isInteger(newValue)) {
                newValue = newValue.toString() + '.0';
              }
              elem.val(newValue);
              newValue = Number(newValue);
            } else {
              newValue = Math.floor(newValue);
              elem.val(newValue);  
            }
          }

          if (oldValue != newValue) {
            this.$emit("input", newValue);
            this.$emit("change", newValue, oldValue);
          }

          this.$emit("blur", event);
        }, value, false);
      });
    },
    /**
     * @desc: 验证值是否合法, 并返回合法值.
     * @param callback: (v)=>void.
     * @param isInputing: 是否正在输入.
     * @param changeInputWrong: 改变输入错误状态.
     */
    validate: function (
      callback,
      value,
      isInputing = false,
      changeInputWrong = true
    ) {
      if (febs.utils.isNull(value)) {
        value = "";
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
            this.$emit("error", this, this.errorText);
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
            let ii = value.indexOf(".");
            if (ii >= 0) {
              value = value.substring(0, ii);
            }
          } else if (this.isFloat) {
            if (this.decimal) {
              let ii = value.indexOf(".");
              if (ii >= 0 && value.length - ii - 1 > this.decimal) {
                let jj = value.indexOf(".", ii + 1);
                if (jj < 0) jj = value.length;
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
          let v1 = value;
          if (!(v1.length == 0 && isInputing)) {
            v1 = this.defaultValue;
          }

          if (changeInputWrong) {
            this.isInputWrong = true;
            this.$emit("error", this, this.errorText);
          }
          if (callback) callback(v1);
          return;
          // return this.defaultValue;
        } else {
          value = matches[0];
          let v2 = value;

          if (this.isFloat) {
            if (value.length > 0) {
              if (value[0] == ".") value = "0" + value;
              else if (!isInputing) {
                if (value[value.length - 1] == ".") value += "0";
                else if (value.indexOf(".") < 0) value += ".0";
              }
              v2 = value;
            } else if (!isInputing) {
              v2 = this.defaultValue;
            }
          }

          if (this.isFloat || this.isInt) {
            v2 = Number(v2) || 0;

            if (v2 > this._max) {
              v2 = this._max;
              // return this._max;
            }
            if (v2 < this._min) {
              v2 = this._min;
              // return this._min;
            }
          }

          if (changeInputWrong) {
            if (this.validator) {
              this.validator(parseFloat(v2), (valid) => {
                if (!valid) {
                  this.isInputWrong = true;
                  this.$emit("error", this, this.errorText);
                } else {
                  this.isInputWrong = false;
                }
              });
            } else {
              this.isInputWrong = false;
            }
          }

          if (callback) callback(v2);
          return;
          // return value;
        }
      } else {
        if (changeInputWrong) {
          if (this.validator) {
            this.validator(value, (valid) => {
              if (!valid) {
                this.isInputWrong = true;
                this.$emit("error", this, this.errorText);
              } else {
                this.isInputWrong = false;
              }
            });
          } else {
            this.isInputWrong = false;
          }
        }
        if (callback) callback(value);
        return;
        // return value;
      }
    },
    focus: function () {
      let elem = $(this.$el);
      if (this.type === "textarea") {
        elem = $(elem.children("textarea")[0]);
      } else {
        elem = $(elem.children("input")[0]);
      }
      elem[0].focus();
    },
    /**
     * @desc 设置or获取文本
     * @param content: 如果为null, 则返回当前的值.
     *                 如果为 '' 则设置为无内容样式.
     */
    text: function (content) {
      let elem = $(this.$el);
      if (this.type === "textarea") {
        elem = $(elem.children("textarea")[0]);
      } else {
        elem = $(elem.children("input")[0]);
      }

      if (febs.utils.isNull(content)) {
        return this.isInt || this.isFloat
          ? Number(elem.val()) || 0
          : elem.val();
      } else {
        // type.
        if (this.isInt || this.isFloat) {
          this.validate((newContent) => {
            newContent = Number(newContent) || 0;

            if (this.isFloat) {
              if (Number.isInteger(newContent)) {
                newContent = newContent.toString() + '.0';
              }
              elem.val(newContent);
            } else {
              newContent = Math.floor(newContent);
              elem.val(newContent);  
            }
          }, content);
        } else {
          this.validate(null, content);
          elem.val(content);

          this._onNextInput();
          this.typelen = content ? content.length : 0;
        }
      }
    },
    /**
     * @desc: 验证当前是否输入正确.
     * @return: boolean.
     */
    isValid: function () {
      let el;
      if (this.type === "textarea") {
        el = $($(this.$el).children("textarea")[0]);
      } else {
        el = $($(this.$el).children("input")[0]);
      }
      this.validate(null, el.val());
      return !this.isInputWrong;
    },

    /**
     * @desc: 标记为输入错误状态, 当输入内容改变后按验证规则进行验证.
     */
    markError: function() {
      this.isMarkError = this.text();
      this.isInputWrong = true;
    },

    /**
     * @desc: ios 键盘不回弹问题.
     */
    _onBlur_fixScroll() {
      let u = navigator.userAgent,
        app = navigator.appVersion;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        setTimeout(() => {
          const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo({
            left: 0,
            top: Math.max(scrollHeight - 1, 0),
            behavior: "smooth",
          });
          // window.scrollTo(0, Math.max(scrollHeight - 1, 0))
          // this.$emit('blur');
        }, 200);
      }
    },

    /**
     * @desc: 点击后置图标.
     */
    _onSuffixIcon() {
      this.$emit("click-icon", "suffixIcon");
    },

    /**
     * @desc: 点击后置图标.
     */
    _onPrefixIcon() {
      this.$emit("click-icon", "prefixIcon");
    },

    _onNextInput() {
      if (this.clearable != null) {
        this.textChangeMark = !this.textChangeMark;
      }
    }
  },
};
</script>
