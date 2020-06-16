<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 14:49
* Desc:
*/
 -->

<template>
  <div style="background:#f00; height:1000px;">
    page2 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 
    <br>
    <router-link :back="true">pop</router-link><br>
    <router-link :back="true" :data="'22222'">pop with data</router-link><br>
    <router-link :back="true" animate="lift">pop with animate</router-link><br>
    <router-link :back="true" animate="slide">pop with slider</router-link><br>
    <router-link :back="true" animate="fade">pop with fade</router-link><br>
    <router-link to="/sdfsf">404</router-link><br>
    <router-link to="/navbar" animate="lift" :replace="true">replace</router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component,
    Prop,
    Watch,
    Provide,
    Emit,
  } from 'vue-property-decorator';
  import {
    State,
    Mutation
  } from 'vuex-class';

  @Component({
    components: {
    }
  })
  export default class extends Vue {

    //
    // event.
    // @Emit()
    // demoEvent(type: string) { }

    //
    // state.
    // @State(state=>state.demo) demo:DEMO_TYPE;

    //
    // Prop
    // @Prop({ type: number })
    // demo: number = 1

    //
    // data.
    // @Provide() demo:number = 1;

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
      // this.$router.getMatchedComponents()
    }

    mounted() {
      console.log('page2 mounted');
    }

    beforeDestroy() {
      console.log('page2 beforeDestroy');
    }

    viewAppear(data:any) {
      console.log('page2 viewAppear');
      console.log(data);
    }

    viewDisappear() {
      console.log('page2 viewDisappear');
    }

    viewClickLeftItem() {
      console.log('page2 viewClickLeftItem');
    }
  }
</script>


<style>
</style>
