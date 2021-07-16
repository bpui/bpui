/**
 * Copyright (c) 2020 Copyright bp All Rights Reserved.
 * Author: lipengxiang
 * Date: 2020-02-17 14:42
 * Desc:
 */

declare namespace bp {
  interface FileUploader  {
    
    /**
     * 重置上传组件
     */
    reset(): void;

    /**
     * 浏览文件.
     */
    browseFile(): void;
    
    /**
     * 封面.
     */
    coverUrl: string;
    /**
     * 上传服务器的地址
     */
    serverUrl: string;
    /**
     * 接受文件的类型; 只接受图片可以为: image/*
     */
    accept: string;
    /**
     * 允许上传的最大文件.0表示无限制.默认为0
     */
    maxFileSize: number;
    /**
     * 上传超时,默认10000
     */
    timeout: number;
    disabled: boolean;
    /**
     * 上传时的请求headers对象
     */
    httpHeaders: any;
    /**
     * 跨域
     */
    crossDomain: boolean;
    /**
     * 是否附带cookie
     */
    withCredentials: boolean;
    /**
     * 提示文字, 默认"点击上传"
     */
    tip: string;
    /**
     * 打开拖拽文件特性
     */
    enableDragFile: boolean;

    /**
     * 上传文件前进行确认从哪个偏移地址开始上传
     * 
     * 传递的处理方法中需在回调cb中返回文件上传的偏移位置.
     */
    breakpointResume: (file: File, crc32: number, cb: (sliceOffset: number) => void) => void;
    
    /**
     * 错误提示, 默认为: '未选择文件!'
     */
    textErrFileNotFound: string;
    /**
     * 错误提示, 默认为: '选择的文件大小超出最大值!'
     */
    textErrFileSizeExceed: string;
    /**
     * 错误提示, 默认为: '计算文件哈希值时发生错误,请重新选择文件!'
     */
    textErrFileHashError: string;
    /**
     * 错误提示, 默认为: '网络错误,请稍后重试!'
     */
    textErrNetError: string;
  }
}
