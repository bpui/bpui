
/// <reference path="./IPicker.d.ts" />
/// <reference path="./IPickerDataSource.d.ts" />

import Vue, {VueConstructor} from 'vue';

/**
 * components.
 */
export interface Picker extends VueConstructor<Vue>, bp.Picker {}
export const bpPicker: Picker


export class PickerDataSourceBase implements bp.PickerDataSource {
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
                    callback:(ds:{datasource:bp.PickerDataSourceData,value:bp.PickerDataSourceValue})=>void):void;
  
  /**
  * @desc: 当前选中的值改变后.
  */
  picker_changed(groupIndex:number, picker:Picker):void;
}
 
/**
 * 日期选择数据源.
 */
export class PickerDateDatasource extends PickerDataSourceBase {
  constructor(cfg:{
    /**
    * @desc: 年显示的文本
    */
    yearText?:string,
    /**
    * @desc: 月显示的文本
    */
    monthText?:string,
    /**
    * @desc: 日显示的文本
    */
    dateText?:string,
    /**
    * @desc: 年份从哪一年开始
    */
    yearFrom?:number,
    /**
    * @desc: 年份到哪一年结束
    */
    yearTo?:number,
  });
  constructor();
}
/**
 * 双列数据源.
 */
export class PickerDoubleDatasource extends PickerDataSourceBase {
  constructor(ds:Array<{
    label:string, 
    value:bp.PickerDataSourceValue,
    children?:Array<bp.PickerDataSourceData>
  }>);
}
/**
 * 单列数据源.
 */
export class PickerSingleDatasource extends PickerDataSourceBase {
  constructor(ds:Array<{
    label:string, 
    value:bp.PickerDataSourceValue
  }>);
}
/**
 * 三列数据源.
 */
export class PickerThreeDatasource extends PickerDataSourceBase {
  constructor(ds:Array<{
    label:string, 
    value:bp.PickerDataSourceValue,
    children?:Array<{
      label:string, 
      value:bp.PickerDataSourceValue,
      children?:Array<bp.PickerDataSourceData>
    }>
  }>);
}
/**
 * 时间数据源.
 */
export class PickerTimeDatasource extends PickerDataSourceBase {
  constructor(cfg:{
    /**
    * @desc: 小时显示的文本
    */
    hourText?:string,
    /**
    * @desc: 分钟显示的文本
    */
    minuteText?:string,
  });
  constructor();
}

