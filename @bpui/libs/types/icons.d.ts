/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 16:29
* Desc: 
*/

declare namespace bp {
  /**
  * @desc: 图标工具.
  */
  interface Icons {
    /**
    * @desc: 列表所有的图标.
    * @return: 
    */
    list(): string[];

    /**
    * @desc: 注册svg图标.
    */
    registerSvgIcon(iconName:string, filePath:string):void;
    /**
    * @desc: 注册字体图标.
    *         e.g. registerFontIcon(iconName, 'bp-iconBack');
    * @param className: 可以指定一个类名或一组类名.
    * @param familyClassName: 指定的字体类名. 默认为 bp-icon
    * @return 返回当前的图标, 可以继续添加子图标.
    */
    registerFontIcon(iconName:string, className:string, familyClassName?:string):string[];

    /**
    * @desc: 为指定图标注册一个新名称.
    *        如果名称已经存在则发生异常.
    */
    registerAliasIcon(aliasName:string, srcIconName:string):void;
  }
}