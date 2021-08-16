<template>
  <div>
    <h4>placeholder</h4>
    <bp-input
      placeholder="placeholder"
      v-model="text"
      @change="textChange++"
    ></bp-input>
    {{ text }}<br />
    @change: {{ textChange }} 次

    <h4>disabled/readonly</h4>
    <bp-input disabled value="disabled"></bp-input>
    <bp-input readonly value="readonly"></bp-input>

    <h4>email/password/tel</h4>
    <bp-input type="email" value="xxx@dd.com"></bp-input>
    <bp-input type="password" value="123456"></bp-input>
    <bp-input type="tel" value="15888888888"></bp-input>

    <h4>textarea</h4>
    <bp-input
      ref="aa"
      type="textarea"
      rows="2"
      maxlength="100"
      v-model="text1"
    ></bp-input>
    <div>{{ text1 }}</div>

    <button @click="onClick">focus</button>

    <input autocomplete="off" />

    <h4>number</h4>
    <bp-input type="int" min="8" v-model="temNum"></bp-input>
    <bp-input type="int" min="8" v-model="temNum" suffixLabel="%"></bp-input>
    <bp-input type="int" min="8" v-model="temNum" prefixLabel="%"></bp-input>
    <bp-input
      prefixIcon="loading"
      type="float"
      max="100"
      value="123456111"
    ></bp-input>
    <bp-input
      suffixIcon="loading"
      type="float"
      max="100"
      value="123456111"
    ></bp-input>

    <bp-input
      suffixIcon="loading"
      type="float"
      :max="textMax"
      value="10"
    ></bp-input>
    <button @click="textMax=10">change max</button>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Provide,
  Emit,
} from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

import bpui from "bpui.js";

@Component({
  components: {
    bpInput: bpui.bpInput,
  },
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
  @Provide() text: string = "";
  @Provide() text1: string = "345354";
  @Provide() textChange: number = 0;
  textMax: number = 100;

  temNum = 1123;

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
    this.$timer.sleep(5000).then(() => {
      console.log(this.text);
      this.text = "11121212";
    });

    this.$bpEventMgr.on(window, 'resize', ()=>{
      console.log(11);
    });
  }

  onClick() {
    let aa: any = this.$refs.aa;
    setTimeout(() => {
      aa.focus();
    }, 100);
  }
}
</script>

<style lang="scss">
</style>
