
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:42
* Desc: 
*/

declare namespace bp {

  interface Input {

    /** @desc 是否禁用 */
    disabled: boolean | 'disabled';
    /** @desc 只读 */
    readonly: boolean | 'readonly';
    /** @desc value */
    value: string | number;
    /** @desc 是否存在清除图标 */
    clearable: string;
    /** @desc 前置图标 */
    prefixIcon: string;
    /** @desc 后置图标 */
    suffixIcon: string;
    /** @desc 前置文本标签(不能与prefixIcon同时生效) */
    prefixLabel: string;
    /** @desc 后置文本标签(不能与suffixIcon同时生效) */
    suffixLabel: string;
    /** @desc 数值类型时的最大值 */
    max: number | string;
    /** @desc 数值类型时的最小值 */
    min: number | string;
    /** @desc placeholder */
    placeholder: string;
    /** @desc 输入错误后的文本,会传递到`error`回调方法中 */
    errorText: string;
    /** @desc textarea 行数 */
    rows: number | string;
    /** @desc name属性 */
    name: string;
    /** @desc 最长文本长度 */
    maxlength: number | string;
    /** @desc 自动填充行为 */
    autocomplete: string;
    /** @desc 是否必须; 调用`isValid`进行验证时会进行验证 */
    required: boolean;
    /**
     * @desc: 当type为float, unsigned-float时的小数位个数
     */
    decimal: number;
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
    type: 'int' | 'unsigned-int' | 'float' | 'unsigned-float' | 'tel' | 'email' | 'text' | 'textarea';
    /**
     * @desc: 正则表达式.
     */
    pattern: string;
    /**
     * @desc 使用自定义方法进行验证.
     */
    validator: (text:string, callback:(isValid:boolean)=>void)=>void,

    /**
     * @desc 设置or获取文本
     * @param content: 如果为null, 则返回当前的值. 
     *                 如果为 '' 则设置为无内容样式.
     */
    text(content:string):void;
    text():string;

    /**
     * @desc: 验证当前是否输入正确.
     * @return: boolean.
     */
    isValid(): boolean;

    /**
     * @desc: (仅生效一次) 标记为输入错误状态, 当输入内容改变后按验证规则进行验证.
     */
    markError(): void;

    /**
     * @desc 获取焦点.
     */
    focus(): void;

    /**
     * @desc 在 Input 失去焦点时触发
     */
    '@blur': (event: Event) => void;
    /**
     * @desc 在 Input 获得焦点时触发
     */
    '@focus': (event: Event) => void;
    /**
     * @desc 仅在输入框失去焦点或用户按下回车时触发
     */
    '@change': (value: string|number) => void;
    /**
     * @desc 在 Input 值改变时触发
     */
    '@input': (value: string|number) => void;
    /**
     * @desc keydown
     */
    '@keydown': (event: Event) => void;
    /**
     * @desc keyup
     */
    '@keyup': (event: Event) => void;
    /**
     * @desc 输入的信息错误时触发
     */
    '@error': (inputObj:any, errorText:string) => void;
    /**
     * @desc 点击前后图标
     */
    '@click-icon': (type:'prefixIcon'|'suffixIcon') => void;
  }
}