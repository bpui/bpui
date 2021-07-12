<template>
  <div>
    <h4>form</h4>
    <span class="span">
      <router-link to="form/button">button</router-link>
    </span>
    <span class="span">
      <router-link to="form/checkbox">checkbox</router-link>
    </span>
    <span class="span">
      <router-link to="form/radio">radio</router-link>
    </span>
    <span class="span">
      <router-link to="form/switch">switch</router-link>
    </span>
    <span class="span">
      <router-link to="form/input">input</router-link>
    </span>
    <span class="span">
      <router-link to="form/select">select (temp)</router-link>
    </span>

    <h4>widget</h4>
    <span class="span">
      <router-link to="widget/dialog">dialog</router-link>
    </span>
    <span class="span">
      <router-link to="widget/picker">picker</router-link>
    </span>
    <span class="span">
      <router-link to="widget/actionsheet">actionsheet</router-link>
    </span>
    <span class="span">
      <router-link to="widget/popover">popover</router-link>
    </span>

    <h4>navbarView</h4>
    <span class="span">
      <router-link to="navbar">navbar</router-link>
    </span>
    <span class="span"><a href="/bpui/navbar">navbar by href</a></span>
    <span class="span"><a href="#abc" @click="$router.push('./navbar')">navbar#abc by router</a></span>
    <span class="span"><a @click="$router.push('./navbar')">navbar by router</a></span>
    <span class="span"><a href="#" @click="$navbar.push({path: './navbar'}, true)">navbar by
        bplib.router</a></span>
    <span class="span"><a @click="$router.push('/layout2')">to layout2</a></span>
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
  import bpui from 'bpui.js';

  @Component({
    components: {}
  })
  export default class extends Vue {
    bpLibs = bpui.libs;

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
    @Provide() demo2: number = 1;

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
      console.log('created: index');
    }
    mounted() {
      console.log('mounted: index');
    }

    beforeDestroy() {
      console.log('beforeDestroy: index');
      console.log('');
    }

    viewAppear(popData: any) {
      console.log('viewAppear: index ' + popData);
      // this.$navbar.setBarLeftItem({icon: 'loading'});
    }

    viewDisappear() {
      console.log('viewDisappear: index');
    }
  }

</script>


<style lang="scss" scoped>
  .is-title {
    text-transform: capitalize;
  }

  .span {
    margin: 10px;
  }

</style>
