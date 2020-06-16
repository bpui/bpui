
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:42
* Desc: 
*/

declare namespace bp {

  interface Input {
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
  }
}