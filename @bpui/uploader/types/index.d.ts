
/// <reference path="./fileUploader.d.ts" />
/// <reference path="./imageCropUploader.d.ts" />

import { VueClass } from 'vue-class-component/lib/declarations';

interface FileUploader extends VueClass<bp.FileUploader>, bp.FileUploader { }
interface ImageCropUploader extends VueClass<bp.ImageCropUploader>, bp.ImageCropUploader { }
interface ImageCropPreview extends VueClass<any> { }

export const bpFileUploader: FileUploader;
export const bpImageCropUploader: ImageCropUploader;
export const bpImageCropPreview: ImageCropPreview;

