/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

"use strict";


/**
 * 从base64数据中创建File对象.
 * @param {*} base64Data 
 */
export function getFileByBase64(base64Data, fileName) {
  //将base64转换为blob
  var arr = base64Data.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  let blob = new Blob([u8arr], { type: mime });
  
  //将blob转换为file
  blob.lastModifiedDate = new Date();
  blob.name = fileName || 'image';
  return blob;
}

/**
 * @param file File对象.
 * @param callback (base64Data)=>void
 */
export function getImageBase64ByFile(file, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result);
  }
}

/**
 * @param fileInput 文件的input.
 * @param callback (base64Data, width, height)=>void
 * @param outputFormat ? 图片格式
 */
export function getImageBase64(fileInput, callback, outputFormat) {
  var url;
  if (navigator.userAgent.indexOf("MSIE") >= 1) {
    // IE
    url = fileInput.value;
  } else if (navigator.userAgent.indexOf("Firefox") > 0) {
    // Firefox
    url = window.URL.createObjectURL(fileInput.files.item(0));
  } else if (navigator.userAgent.indexOf("Chrome") > 0) {
    // Chrome
    url = window.URL.createObjectURL(fileInput.files.item(0));
  } else {
    url = window.URL.createObjectURL(fileInput.files.item(0));
  }

  if (!url) {
    callback.call(this, null);
    return;
  }

  var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || "image/png");
    callback.call(this, dataURL, img.width, img.height);
    canvas = null;
  };
  img.src = url;
}

/**
 * 图片压缩
 * @param {*} base64Data 
 * @param {*} maxSize 最大的宽或高的尺寸, 0则为1024;
 * @param {*} callback (base64Data, width, height)=>void
 */
export function compressImage(base64Data, maxSize, outputFormat, callback) {
  maxSize = maxSize > 0 ? maxSize : 1024
  let maxW = maxSize;
  let maxH = maxSize;
  const image = new Image();
  image.addEventListener("load", function(e) {
    let ratio; //图片的压缩比
    let needCompress = false; // 是否需要压缩
    if (maxW < image.naturalWidth) {
      needCompress = true;
      ratio = image.naturalWidth / maxW;
      maxH = image.naturalHeight / ratio;
    }
    //经过处理后，实际图片的尺寸为1024 * 640;
    if (maxH < image.naturalHeight) {
      needCompress = true;
      ratio = image.naturalHeight / maxH;
      maxW = image.naturalWidth / ratio;
    }
    if (!needCompress) {
      maxW = image.naturalWidth;
      maxH = image.naturalHeight;
      callback && callback(base64Data, maxW, maxH);
      return;
    } //如果不需要压缩，需要获取图片的实际尺寸

    let canvas = document.createElement("canvas");
    canvas.width = maxW;
    canvas.height = maxH;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.drawImage(image, 0, 0, maxW, maxH);
    // toDataURL的第二个参数表示图片质量，取值为0-1 1为原图
    const compressImage = canvas.toDataURL(outputFormat||"image/png");
    canvas = null;
    callback && callback(compressImage, maxW, maxH);
  });
  image.src = base64Data;
}
