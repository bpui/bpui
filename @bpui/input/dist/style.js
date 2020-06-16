/*!
 * bpui input v0.1.13
 * Copyright (c) 2020 Copyright bpoint.lee@live.com All Rights Reserved.
 * Released under the MIT License.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.bpInput = factory());
}(this, (function () { 'use strict';

    var unpkg = "@import '../node_modules/@bpui/libs/style/index';\n@import '../node_modules/@bpui/libs/style/unpkg_class.scss';\n@import \"./variable\";\n\n.bp-input {\n    position: relative;\n    margin: 2px;\n    display: flex;\n    align-items: center;\n    border-width: 2px;\n    border-style: inset;\n    border-color: initial;\n    border-image: initial;\n    border-radius: 4px;\n    border: 1px solid #dcdfe6;\n    background-color: $bpInputBgColor;\n        \n    .bp-input__prefixIcon {\n        margin-left: 10px;\n    }\n    .bp-input__suffixIcon {\n        margin-right: 10px;\n    }\n\n    input {\n        -webkit-writing-mode: horizontal-tb !important;\n        text-rendering: auto;\n        letter-spacing: normal;\n        color: $bpInputTextColor;\n        word-spacing: normal;\n        text-transform: none;\n        text-indent: 0px;\n        text-shadow: none;\n        display: inline-block;\n        text-align: start;\n        -webkit-appearance: textfield;\n        -webkit-rtl-ordering: logical;\n        cursor: text;\n        margin: 0em;\n        font-size: $bpInputFontSize;\n        font-weight: $bpInputFontWeight;\n        padding: 1px;\n    }\n\n    .bp-input__inner {\n        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n        -webkit-appearance: none;\n        background-color: transparent;\n        background-image: none;\n        box-sizing: border-box;\n        border: none;\n        color: $bpInputTextColor;\n        display: inline-block;\n        font-size: inherit;\n        height: 40px;\n        line-height: 40px;\n        outline: none;\n        padding: 0 15px;\n        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);\n        width: 100%;\n\n        &:focus {\n            outline: none;\n        }\n    }\n\n    &.bp-input__focus {\n        border-color: $bpInputBorderColor;\n    }\n\n\n    &.bp-input__warn {\n        textarea, input {\n            color: $bpInputTextWarnColor;\n        }\n        .bp-input__warnIcon {\n            position: absolute;\n            right: 5px;\n            top: 8.5px;\n        }\n        &.bp-input__focus {\n            border-color: $bpInputTextWarnColor;\n        }\n    }\n\n    &.bp-input__textarea {\n        padding-right: initial;\n        background: transparent;\n        position: relative;\n        display: flex;\n        align-items: center;\n        vertical-align: bottom;\n        \n        .bp-input__inner {\n            display: block;\n            resize: vertical;\n            padding: 5px 15px;\n            line-height: 1.5;\n            height: auto;\n        }\n    }\n\n    .bp-input__counter {\n        text-align: right;\n        position: absolute;\n        bottom: 5px;\n        right: 5px;\n        color: #adadad;\n        font-size: 0.9rem;\n    }\n\n    // disabled\n    &.bp-input__disabled {\n        opacity: .5;\n        cursor: not-allowed;\n        touch-action: none;\n        pointer-events: none;\n    }\n}";

    return unpkg;

})));
//# sourceMappingURL=style.js.map
