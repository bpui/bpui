<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-27 15:05
* Desc: 
*/
 -->

<template>
  <div>
    <h4>example</h4>

    <h5>fileUploader</h5>
    <bp-file-uploader serverUrl="http://127.0.0.1:8080/api/upload/upload" :enableDragFile="true"/>

    <h5>imageCropUploader</h5>

    <bpImageCropPreview ref="preview" />
    <!-- <bp-image-crop-uploader clipSharp="circle" :previewRef="()=>this.$refs.preview"> -->
    <bp-image-crop-uploader  serverUrl="http://127.0.0.1:8080/api/upload/upload" :maxImageSize="0">
    </bp-image-crop-uploader>


    <button @click="$refs.aa.browseFile()">upload</button>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Prop,
    Watch,
    Provide,
    Emit
  } from "vue-property-decorator";
  import {
    State,
    Mutation
  } from "vuex-class";

  import bpui from 'bpui.js';

  @Component({
    components: {
      bpFileUploader: bpui.bpFileUploader,
      bpImageCropUploader: bpui.bpImageCropUploader,
      bpImageCropPreview: bpui.bpImageCropPreview,
    }
  })
  export default class extends Vue {
    //
    // event.
    @Emit()
    demoEvent(type: string) {}

    sdfsdf:bp.FileUploader;

    //
    // state.
    // @State(state=>state.demo) demo:DEMO_TYPE;

    //
    // Prop
    // @Prop({ type: number }) demo: number;

    //
    // computed.
    // get demo() { return xxxx; }

    //
    // watch.
    // @Watch('child')
    // onChildChanged(val: string, oldVal: string) { }

    //
    // lifecycle hook.
    constructor() {
      super();
    }

    mounted() {
    }
  }
</script>

<style lang="scss">
</style>
