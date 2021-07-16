'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:52
* Desc: 
*/

import bpFileUploader from './fileUploader.vue';
import bpImageCropUploader from './imageCropUploader.vue';
import bpImageCropPreviewTablet from './imageCropPreviewTablet.vue';
import bpImageCropPreviewMobile from './imageCropPreviewMobile.vue';


// register alias icon.
function init() {
  bpLibs.icons.registerAliasIcon('bp-uploader_add', 'plus');
  bpLibs.icons.registerAliasIcon('bp-uploader_cancel', 'cancel');
  bpLibs.icons.registerAliasIcon('bp-uploader_ok', 'ok');
}
init();

// const bpImageCropPreview = febs.utils.browserIsMobile() ? bpImageCropPreviewMobile : bpImageCropPreviewTablet;
const bpImageCropPreview = bpImageCropPreviewMobile;

export default {
  init,
  bpFileUploader,
  bpImageCropUploader,
  bpImageCropPreview,
  bpImageCropPreviewTablet,
  bpImageCropPreviewMobile
}
