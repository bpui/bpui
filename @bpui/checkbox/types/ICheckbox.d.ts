
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
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
  }

  interface CheckboxGroup {
    /**
    * @desc: 所有checkbox的选值情况.
    */
    value?: Array<{isChecked: Boolean, label?: String}>;

    /**
     * @desc disabled
     */
    disabled?: Boolean;
  }
}