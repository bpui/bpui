'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-13 16:19
* Desc: 
*/

// const GlobalIcons = Symbol('$BpGlobalIcons');
const GlobalIcons = ('$BpGlobalIcons');

const Instance = ()=>{
  if (!window[GlobalIcons]) {
    window[GlobalIcons] = new IconsData();
  }
  return window[GlobalIcons] as IconsData;
}

class IconsData {
  installed:boolean
  icons:any//Set<string>
  icons_svgPath:any//Map<string, string>
  icons_alias:any//Map<string, string>
  icons_font:any//Map<string, {className:string, children:string[]}>

  constructor() {
    this.installed = false;
    this.icons = {};//new Set();
    this.icons_svgPath = {};//new Map();
    this.icons_alias = {};//new Map();
    this.icons_font = {};//new Map();
  }
}


function clearIcon(name:string) {
  if (name && name.length > 0) {
    delete Instance().icons[name];
    delete Instance().icons_font[name];
    delete Instance().icons_svgPath[name];
    delete Instance().icons_alias[name];
  }
}

/**
* @desc: 列表所有的图标.
* @return: 
*/
function list(): string[]/*IterableIterator<string>*/ {
  // return Instance().icons.keys();
  return Object.keys(Instance().icons);
}

/**
* @desc: 获取图标. 
*/
function getIcon(iconName:string):{type:'svg'|'font', value:string} {
  let srcName = Instance().icons_alias[iconName];
  if (srcName) {
    iconName = srcName;
  }
  
  if (Instance().icons.hasOwnProperty(iconName)) {
    let obj = {} as any;
    
    let v1 = Instance().icons_font[iconName];
    if (v1) {
      obj.type = 'font';
      obj.value = v1;
      return obj;
    }

    let v2 = Instance().icons_svgPath[iconName];
    if (v2) {
      obj.type = 'svg';
      obj.value = v2;
      return obj;
    }
  }

  return null;
}

/**
* @desc: 注册svg图标.
*         可以webpack获取文件的发布路径: registerSvgIcon(iconName, require('fielpath'));
* @param filePath: svg 文件路径;
*/
function registerSvgIcon(iconName:string, filePath:string) {
  clearIcon(iconName);
  Instance().icons[iconName] = true;
  Instance().icons_svgPath[iconName] = filePath;
}

/**
* @desc: 注册字体图标.
*         e.g. registerFontIcon(iconName, 'bp-iconBack');
* @param className: 可以指定一个类名或一组类名.
* @return 返回当前的图标, 可以继续添加子图标.
*/
function registerFontIcon(iconName:string, className:string):string[] {
  clearIcon(iconName);
  Instance().icons[iconName] = true;
  let children = [];
  Instance().icons_font[iconName] = {className, children};
  return children;
}

/**
* @desc: 为指定图标注册一个新名称.
*        如果名称已经存在则发生异常.
*/
function registerAliasIcon(aliasName:string, srcIconName:string) {
  if (!Instance().icons.hasOwnProperty(srcIconName)) {
    throw new Error('icon name `' + srcIconName + '` isn\'t existed!');
  }

  if (!Instance().icons.hasOwnProperty(aliasName)) {
    Instance().icons_alias[aliasName] = srcIconName;
  }
}

function registerDefault() {

  if (!Instance().installed) {
    registerFontIcon('arrowDown', 'bp-iconArrowDown');
    registerFontIcon('arrowLeft', 'bp-iconArrowLeft');
    registerFontIcon('arrowRight', 'bp-iconArrowRight');
    registerFontIcon('arrowUp', 'bp-iconArrowUp');
    registerFontIcon('cancel', 'bp-iconCancel');
    registerFontIcon('delete', 'bp-iconDelete');
    registerFontIcon('edit', 'bp-iconEdit');
    registerFontIcon('heartFill', 'bp-iconHeartFill');
    registerFontIcon('heart', 'bp-iconHeart');
    registerFontIcon('locationPin', 'bp-iconLocationPin');
    registerFontIcon('location', 'bp-iconLocation');
    registerFontIcon('menu', 'bp-iconMenu');
    registerFontIcon('minus', 'bp-iconMinus');
    registerFontIcon('more', 'bp-iconMore');
    registerFontIcon('ok', 'bp-iconOk');
    registerFontIcon('plus', 'bp-iconPlus');
    registerFontIcon('setting', 'bp-iconSetting');
    registerFontIcon('starFill', 'bp-iconStarFill');
    registerFontIcon('star', 'bp-iconStar');
    registerFontIcon('user', 'bp-iconUser');
    registerFontIcon('loading', 'bp-iconLoading')
          .push(
            'path1',
            'path2',
            'path3',
            'path4',
            'path5',
            'path6',
            'path7',
            'path8',
            'path9',
            'path10',
            'path11',
            'path12',
          );
    Instance().installed = true;
  }
}
registerDefault();

export default {
  list, 
  registerAliasIcon,
  registerFontIcon,
  registerSvgIcon,
  registerDefault,
  getIcon,
}