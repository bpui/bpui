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
    <h4>button</h4>
    <button>default</button>
    <button>primary</button>
    <button class="bp-btnInfo">info</button>
    <button class="bp-btnWarning">warning</button>

    <!-- solid -->
    <h4>solid style</h4>
    <button class="bp-btnSolid">primary</button>
    <button class="bp-btnSolid bp-btnInfo">info</button>
    <button class="bp-btnSolid bp-btnWarning">warning</button>

    <!-- border -->
    <h4>border style</h4>
    <button class="bp-btnBorder">primary</button>
    <button class="bp-btnBorder bp-btnInfo">info</button>
    <button class="bp-btnBorder bp-btnWarning">warning</button>

    <!-- disable -->
    <h4>disable button</h4>
    <button disabled="disabled">
      disabled
    </button>
    <button class="bp-btnSolid" disabled="disabled">
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
    <button class="bp-btnSolid">
      text
      <bp-icon width="20px" name="heartFill">
      </bp-icon>
    </button>

    <button class="bp-btnBorder">
      text<bp-icon width="12px" height="12px" name="loading"/>
    </button>

    <!-- group -->
    <h4>group</h4>
    <div class="bp-btnGroup">
      <button class="bp-btnBorder">text</button>
      <button class="bp-btnSolid">primary</button>
    </div>

    <div class="bp-btnGroup">
      <button class="bp-btnBorder">text</button>
      <button class="bp-btnSolid">primary</button>
      <button>
        <bp-checkbox >chk2</bp-checkbox>
      </button>
      <button>
        <bp-switch >dsfs</bp-switch>
      </button>
      <button>
        <bp-radio-group v-model="value1">
          <bp-radio value="1">选项1</bp-radio>
          <bp-radio value="2">选项2</bp-radio>
        </bp-radio-group>
      </button>
    </div>
    
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
      bpCheckbox: bpui.bpCheckbox,
      bpSwitch: bpui.bpSwitch,
      bpRadio: bpui.bpRadio,
      bpRadioGroup: bpui.bpRadioGroup,
    }
  })
  export default class extends Vue {
    //
    // event.
    @Emit()
    demoEvent(type: string) {}

    value1 = 1;

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
