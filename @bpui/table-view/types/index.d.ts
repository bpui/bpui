

import Vue, {VueConstructor} from 'vue';

export interface TableView extends VueConstructor<Vue> {

  /**
  * @desc: table 标题
  */
  tableTitle?: string;

  /**
   * @desc table cell的内嵌样式.
   */
  tableStyle?: string | bp.Directory<string|number>;
}
export const bpTableView: TableView;


export interface TableCell extends VueConstructor<Vue> {

  /**
  * @desc: 是否有跳转下个页面图标. (滑动删除开启时不生效)
  */
  nextArrow?: boolean|'true'|'false';

  /**
  * @desc: 是否禁用.
  */
  disabled?: boolean | 'true' | 'false';
  
  _platform?: 'ios' | 'android' | 'tablet';

  /**
  * @desc: 显示出滑动/长按视图.
  */
  showEditor(): void;

  /**
  * @desc: 隐藏出滑动/长按视图.
  */
  hideEditor(): void;

  /**
  * @desc: 触发删除cell动画.
  */
  animateDelete(): Promise<void>;

  /**
   * 点击事件.
   */
  '@click': (ev: Event) => void;
}
export const bpTableCell: TableCell;


export const bpTableCellLeft: VueConstructor;
export const bpTableCellCenter: VueConstructor;
export const bpTableCellRight: VueConstructor;
export const bpTableCellEditor: VueConstructor;