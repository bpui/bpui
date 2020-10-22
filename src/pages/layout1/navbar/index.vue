<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-07 14:49
* Desc:
*/
 -->

<template>
  <div>
    page1
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    <div style="height:300px"></div>
    <button @click="pushNav">push use api</button>
    <router-link to="/navbar/page2" :data="data">push</router-link><br>
    <router-link to="/navbar/page2" animate="slideOut">push with slideOut</router-link><br>
    <router-link to="/navbar/page2" animate="lift">push with lift</router-link><br>
    <router-link to="/navbar/page2" animate="fade">push with fade</router-link><br>

    <span @click="$navbar.push({path: '/'}, true)">push to /</span>
    <div style="height:800px">ddd</div>
    <a name="abc">abc</a>
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
    components: {}
  })
  export default class extends Vue {

    @Watch("$route")
    onRouteChange(newp: bp.Router, old: bp.Router) {
      console.log("routeChange");
    }

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
    @Provide() demo: number = 1;
    @Provide() data: number[] = [1, 2, 3, 4];

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

    created() {
      console.log('created: navbar');
    }

    mounted() {
      console.log('mounted: navbar');
    }

    beforeDestroy() {
      console.log('beforeDestroy: navbar');
      console.log('');
    }

    viewAppear(popData: any) {
      console.log('viewAppear: navbar ' + popData);
      this.$navbar.setBarInfo({
        title: 'navbar',
        hidden: false
      });
      // this.$navbar.setBarLeftItem({icon: 'loading'});
    }

    viewDisappear() {
      console.log('viewDisappear: navbar');
    }

    pushNav() {
      this.$navbar.push('./page2');
    }
  }

</script>


<style>
</style>
