/// <reference types="@bpui/dialog" />

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:42
* Desc: 
*/

declare namespace bp {

  type PickerValue = string|number;

  interface Picker extends Widget {

    /**
     * @desc: 设置指定组界面上的当前选中值 (不等同于当前的value, 只是界面上的选择).
     * @param groupIndex: 组索引.
     * @param value: 匹配值.
     * @param trigger: 是否触发change事件.
     */
    setSelect(groupIndex:number, value:PickerValue, trigger:boolean):void;
    setSelect(groupIndex:number, value:PickerValue):void;

    /**
     * @desc: 获得当前界面上选中的元素的值.
     * @param groupIndex: 明确指定后可以获得指定组的值.
     * @return 值.
     */
    getSelect(groupIndex:number):PickerValue;
    getSelect():PickerValue;

    /**
    * @desc: 获得当前控件的值; 如果只有一组, 则返回值; 大于一组返回值数组.
    */
    getValue():PickerValue|Array<PickerValue>;

    /**
     * 手动刷新指定组的数据; (将触发数据源对象的picker_datasource方法异步获得数据源)
     * @param groupIndex 
     * @param trigger 将触发change事件.
     * @return Promise异步对象.
     */
    refreshDatasource(groupIndex:number, trigger:boolean):Promise<void>;
    refreshDatasource(groupIndex:number):Promise<void>;
  }
}