<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-02-10 16:46
* Desc: bp-button 案列
*/
 -->

<template>
  <div>
    <!-- primary -->
    <h4>primary button</h4>
    <button>
      default
    </button>
    <button class="bp-btnPrimary">
      primary
    </button>

    <!-- warning -->
    <h4>warning button</h4>
    <button class="bp-btnWarning bp-btnBorder">
      warning
    </button>

    <!-- border -->
    <h4>border style</h4>
    <button class="bp-btnBorder">
      border
    </button>

    <!-- disable -->
    <h4>disable button</h4>
    <button disabled="disabled">
      disabled
    </button>
    <button class="bp-btnBorder" disabled="disabled">
      disabled
    </button>

    <!-- icon -->
    <h4>icon</h4>
    <button class="bp-btnBorder">
      <bp-icon name="heartFill">
      </bp-icon>
      text
    </button>
    <button class="bp-btnBorder">
      text
      <bp-icon width="20px" name="heartFill">
      </bp-icon>
    </button>

    <button class="bp-btnBorder">
      text<bp-icon width="20px" name="loading"/>
    </button>
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

  @Component({
    components: {}
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
    }

    mounted() {
    }
  }
</script>

<style lang="scss">
</style>
