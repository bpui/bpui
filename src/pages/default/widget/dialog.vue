<!--
/**
* Copyright (c) 2020 Copyright bpui All Rights Reserved.
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
    <button @click="showLoadingCount">show loading count</button>

    <!-- api dialog -->
    <h4>api toast</h4>
    <button @click="$bpWidget.showToast({customClass: 'customClass', content:'1212121212121221212111111111121212121212122121211111111112121212121212212121111111111212121212121221212111111111'})">toast top</button>
    <button @click="$bpWidget.showToast({content:'hello world!', icon: 'locationPin', durable:4000})">toast top (icon)</button>
    <button @click="$bpWidget.showToast({content:'hello world2!', pos:'center', durable: 4000})">toast center</button>
    <button @click="$bpWidget.showToast({content:'创建成功!', pos:'center', icon: 'ok'})">toast center (icon)</button>
 
    <!-- api custom -->
    <h4>api custom</h4>
    <button @click="showCustom">show custom</button>

    <!-- target loading -->
    <h4>target loading</h4>
    <div ref="aa" style="width:200px;height:300px;background:#ff0;"></div>
    <button @click="showTargetLoading">show target loading</button>


    <!-- dialog1 -->
    <bp-dialog :top="true" :visible.sync="visible1" title="hello" appendToBody="true">
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
  import customDialog from './customDialog.vue';

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
      // @ts-ignore
      this.$bpWidget.showAlert({content:'aaaa', okText: 'dfdfd', customClass: 'customClass', confirm:(id)=>{
      }})
    }

    showConfirm():void {
      // @ts-ignore
      this.$bpWidget.showConfirm({content:'确定取消?', customClass: 'customClass', cancel:(id)=>{
        // @ts-ignore
        this.$bpWidget.hideConfirm(id);
        console.log(11)
      }, confirm:(id)=>{
        // @ts-ignore
        this.$bpWidget.showAlert('确认');
      }}).then(()=>{

      }).catch(e=>{
        console.log(e);
      })
    }
    
    showLoading():void {
      // @ts-ignore
      this.$bpWidget.showLoading({content: 'ssss', customClass: 'customClass'});
      // @ts-ignore
      this.$bpWidget.showLoading({content: 'hide in 4s', delay: 6000});
      // @ts-ignore
      this.$bpWidget.showLoading({content: 'hide in 4s', delay: 5000});
      // @ts-ignore
      this.$bpWidget.showLoading({content: 'hide in 4s', delay: 5000});
      // @ts-ignore
      this.$bpWidget.showLoading({content: 'hide in 4s', delay: 5000});
      // @ts-ignore
      this.$bpWidget.showLoading({content: 'hide in 4s', delay: 5000});
      // @ts-ignore
      this.$bpWidget.showLoading({content: 'hide in 4s', delay: 5000});
      // @ts-ignore
      this.$bpWidget.showLoading('hide in 4s');
      this.$timer.sleep(1000)
                  // @ts-ignore
                 .then(()=>{ this.$bpWidget.showLoading('hide in 3s'); })
                 .then(()=>this.$timer.sleep(1000))
                 // @ts-ignore
                 .then(()=>{ this.$bpWidget.showLoading('hide in 2s'); })
                 .then(()=>this.$timer.sleep(1000))
                 // @ts-ignore
                 .then(()=>{ this.$bpWidget.showLoading('hide in 1s'); })
                 .then(()=>this.$timer.sleep(1000))
                 // @ts-ignore
                 .then(()=>{ this.$bpWidget.hideLoading(); });
    }

    showLoadingCount():void {

      // @ts-ignore
      this.$bpWidget.showLoading('hide in 1s');
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());
      // @ts-ignore
      this.$bpWidget.showLoading('hide in 1s');
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());
      // @ts-ignore
      this.$bpWidget.showLoading('hide in 1s');
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());
      // @ts-ignore
      this.$bpWidget.showLoadingIncrease({content: 'hide in 4s', delay: 6000});
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());
      // @ts-ignore
      this.$bpWidget.showLoadingIncrease({content: 'hide in 4s', delay: 6000});
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());
      // @ts-ignore
      this.$bpWidget.hideLoadingDecrease();
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());
      // @ts-ignore
      this.$bpWidget.hideLoading();
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());
      // @ts-ignore
      this.$bpWidget.hideLoading();
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());
      // @ts-ignore
      this.$bpWidget.hideLoadingDecrease();
      // @ts-ignore
      console.log(this.$bpWidget.getLoadingCount());


      // // @ts-ignore
      // this.$bpWidget.showLoadingIncrease({content: 'hide in 4s', delay: 6000});
      // // @ts-ignore
      // this.$bpWidget.showToast('1');
      // // @ts-ignore
      // this.$bpWidget.showLoadingIncrease({content: 'hide in 4s', delay: 5000});
      // // @ts-ignore
      // this.$bpWidget.showToast('2');
      // // @ts-ignore
      // this.$bpWidget.showLoadingIncrease({content: 'hide in 4s', delay: 5000});
      // // @ts-ignore
      // this.$bpWidget.showToast('3');
      // // @ts-ignore
      // this.$bpWidget.showLoadingIncrease({content: 'hide in 4s', delay: 5000});
      // // @ts-ignore
      // this.$bpWidget.showToast('4');
      // // @ts-ignore
      // this.$bpWidget.showLoadingIncrease({content: 'hide in 4s', delay: 5000});
      // // @ts-ignore
      // this.$bpWidget.showToast('5');
      // // @ts-ignore
      // this.$bpWidget.showLoadingIncrease({content: 'hide in 4s', delay: 5000});
      // // @ts-ignore
      // this.$bpWidget.showToast('6');
      // console.log('show i');
      // // @ts-ignore
      // this.$bpWidget.showLoadingIncrease('hide in 4s');
      // // @ts-ignore
      // this.$bpWidget.showToast('7');
      // this.$timer.sleep(1000)
      //             // @ts-ignore
      //            .then(()=>{ this.$bpWidget.showToast('8'); this.$bpWidget.showLoadingIncrease('hide in 3s'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.showToast('9'); this.$bpWidget.showLoadingIncrease('hide in 2s'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.showToast('10'); this.$bpWidget.showLoading('hide in 1s'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.showToast('10'); this.$bpWidget.showLoading('hide in 1s'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('9'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('8'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('7'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('6'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('5'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('4'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('3'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('2'); })
      //            .then(()=>this.$timer.sleep(1000))
      //            // @ts-ignore
      //            .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('1'); })
      //            .then(()=>this.$timer.sleep(1000))
                 // @ts-ignore
                //  .then(()=>{ this.$bpWidget.hideLoading(); this.$bpWidget.showToast('0'); })
                //  .then(()=>this.$timer.sleep(1000))
    }
    
    showCustom():void {
      bpui.registerDialogCustom("test", customDialog);
      let dialogId = bpui.apiWidget.showCustom("test", {props: {title:'will close in 5s'}});

      setTimeout(()=>{
        bpui.apiWidget.hideCustom(dialogId);
      }, 5000);
    }

    showTargetLoading(): void {
      bpui.apiWidget.showLoadingTarget(this.$refs.aa);

      // this.$timer.setTimeout(() => {
      //   bpui.apiWidget.hideLoadingTarget(this.$refs.aa);
      // }, 2000);
    }
  }
</script>

<style lang="scss">

</style>
