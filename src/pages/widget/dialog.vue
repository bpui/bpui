<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-02-10 16:46
* Desc: bp-button 案列
*/
 -->

<template>
  <div style="height:1000px;">
    <!-- custom dialog -->
    <h4 style="width: 30%;background: aquamarine;">custom dialog</h4>
    <button @click="visible1=true">show dialog1</button>

    <!-- api dialog -->
    <h4>api widget</h4>
    <button @click="showAlert">show alert</button>
    <button @click="showConfirm">show confirm</button>

    <!-- api dialog -->
    <h4>api loading</h4>
    <button @click="showLoading">show loading</button>

    <!-- api dialog -->
    <h4>api toast</h4>
    <button @click="$bpWidget.showToast({content:'hello world!'})">toast top</button>
    <button @click="$bpWidget.showToast({content:'hello world!', icon: 'locationPin', durable:4000})">toast top (icon)</button>
    <button @click="$bpWidget.showToast({content:'hello world2!', pos:'center', durable: 4000})">toast center</button>
    <button @click="$bpWidget.showToast({content:'创建成功!', pos:'center', icon: 'ok'})">toast center (icon)</button>
 
    <!-- dialog1 -->
    <bp-dialog :visible.sync="visible1" title="hello">
      <div style="height:1000px">
      dialog1
      </div>
      <div slot="foot">
        <button @click="visible1=false">close</button>
        <button @click="visible2=true">show dialog2</button>
      </div>
    </bp-dialog>

    <!-- dialog2 -->
    <bp-dialog :visible.sync="visible2" :maskClose="true" :showClose="false">
      <div slot="title">hello2</div>
      dialog2
      <div slot="foot">
        <button @click="visible2=false">close</button>
        <button @click="$bpWidget.showAlert('ok')">ok</button>
      </div>
    </bp-dialog>

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
      bpDialog: bpui.bpDialog,
    }
  })
  export default class extends Vue {
    //
    // event.
    @Emit()
    demoEvent(type: string) {}

    //
    // state.
    // @State(state=>state.demo) demo:DEMO_TYPE;

    //
    // Prop
    // @Prop({ type: number }) demo: number;

    //
    // data.
    @Provide() visible1:boolean = false;
    @Provide() visible2:boolean = false;
    @Provide() visible3:boolean = false;
    

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
      bpui.hook.addWidgetShake((paddingRight)=>{
        console.log("widget shake: " + paddingRight);
      })
    }

    showAlert():void {
      this.$bpWidget.showAlert({content:'aaaa', confirm:(id)=>{
        this.$bpWidget.hideAlert(id);
      }})
    }

    showConfirm():void {
      this.$bpWidget.showConfirm({content:'确定取消?', cancel:(id)=>{
        this.$bpWidget.hideConfirm(id);
      }, confirm:(id)=>{
        this.$bpWidget.showAlert('确认');
      }})
    }
    
    showLoading():void {
      this.$bpWidget.showLoading('hide in 4s');
      this.$timer.sleep(1000)
                 .then(()=>{ this.$bpWidget.showLoading('hide in 3s'); })
                 .then(()=>this.$timer.sleep(1000))
                 .then(()=>{ this.$bpWidget.showLoading('hide in 2s'); })
                 .then(()=>this.$timer.sleep(1000))
                 .then(()=>{ this.$bpWidget.showLoading('hide in 1s'); })
                 .then(()=>this.$timer.sleep(1000))
                 .then(()=>{ this.$bpWidget.hideLoading(); });
    }
  }
</script>

<style lang="scss">
</style>
