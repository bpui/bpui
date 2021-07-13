/// <reference path="./IPicker.d.ts" />

/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:42
* Desc: 
*/

declare namespace bp {
  
  type PickerDataSourceValue = string|number;
  type PickerDataSourceData = Array<{label:string, value:PickerDataSourceValue}>;
  type PickerDataSourceData2 = {label:string, value:PickerDataSourceValue, children?:PickerDataSourceData2[]};

  /**
  * @desc: picker数据源.
  */
  interface PickerDataSource {
    /**
    * @desc: 数据源组的个数.
    * @param callback: 由此回调返回数据源组的个数.
    */
    picker_datasource_groups(callback:(groupsCount:number)=>void):void;

    /**
    * @desc: 返回指定组的数据源
    * @param callback: 由此回调返回指定组的数据, datasource表示数据源, value表示当前选中的值.
    *       {
              datasource: [{label:'', value:0}, ],  // 数据源.
              value:      0,  // 选择的值.
            }
    */
    picker_datasource(groupIndex:number, picker:Picker, 
                      callback:(ds:{datasource:PickerDataSourceData,value:PickerDataSourceValue})=>void):void;
    
    /**
    * @desc: 当前选中的值改变后.
    */
    picker_changed(groupIndex:number, picker:Picker):void;
  }
}