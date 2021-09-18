
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
     * @desc: 是否显示月
     */
    showMonth?: boolean,
    /**
     * @desc: 是否显示天
     */
    showDate?: boolean,
    /**
     * @desc 允许选择的最小时间.
     */
    min?: {
      // 默认为 null
      year?: number,
      // 默认为 0
      month?: number,
      // 默认为 1
      date?: number,
    },
    /**
     * @desc 允许选择的最大时间.
     */
    max?: {
      // 默认为 null
      year?: number,
      // 默认为 11
      month?: number,
      // 默认为 31
      date?: number,
    },
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
    /**
    * @desc: 秒钟显示的文本
    */
    secondText?: string,
    /**
     * @desc: 是否显示分钟
     */
    showMinute?: boolean,
    /**
     * @desc: 是否显示秒
     */
    showSecond?: boolean,
    /**
     * @desc 允许选择的最小时间.
     */
    min?: {
      hour?: number,
      minute?: number,
      second?: number,
    },
    /**
     * @desc 允许选择的最大时间.
     */
    max?: {
      hour?: number,
      minute?: number,
      second?: number,
    },
  });
  constructor();
}

