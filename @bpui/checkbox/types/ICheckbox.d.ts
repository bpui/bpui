
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:42
* Desc: 
*/

declare namespace bp {

  interface Checkbox {
    /**
    * @desc: value属性优先, 会覆盖checked属性
    */
    value?: Boolean;

    /**
     * @desc disabled
     */
    disabled?: Boolean;

    /**
     * @desc: value属性优先, 会覆盖checked属性
     */
    checked?: Boolean;

    /**
     * @desc: 除checked之外的健值.
     */
    labelValue?: String;
  }

  interface CheckboxGroup {
    /**
    * @desc: 所有checkbox的选值情况.
    */
    value?: Array<{isChecked: Boolean, labelValue?: String}>;

    /**
     * @desc disabled
     */
    disabled?: Boolean;

    /**
     * @desc 清理所有选项.
     */
    clear(): void;
  }
}