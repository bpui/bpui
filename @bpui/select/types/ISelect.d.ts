/**
 * Copyright (c) 2020 Copyright bpui All Rights Reserved.
 * Author: qiahao
 * Date: 2020-09-14
 * Desc:
 */

/// <reference types="@bpui/picker" />

declare namespace bp {
  interface Select {
    value: number | string | Array<number | string>;
    datasource: bp.PickerDataSource | Array<bp.PickerDataSourceData2>;
    multiple: boolean;
    placeholder: string;
    emptyText: string;

    show(): void;
    hide(): void;
    /**
     * @desc: 获得当前界面上选中的元素的值.
     * @param groupIndex: 明确指定后可以获得指定组的值.
     * @return item.
     */
    getSelect(groupIndex: number): any;
  }

  interface SelectOption {
    value: number | string;
    disabled: boolean;
  }
}
