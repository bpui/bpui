<template>
  <div>
    <h4>form</h4>
    <span class="span"><router-link to="form/button">button</router-link></span>
    <span class="span"><router-link to="form/checkbox">checkbox</router-link></span>
    <span class="span"><router-link to="form/radio">radio</router-link></span>
    <span class="span"><router-link to="form/switch">switch</router-link></span>
    <span class="span"><router-link to="form/input">input</router-link></span>
    <span class="span"><router-link to="form/select">select (temp)</router-link></span>

    <h4>widget</h4>
    <span class="span"><router-link to="widget/dialog">dialog</router-link></span>
    <span class="span"><router-link to="widget/picker">picker</router-link></span>
    <span class="span"><router-link to="widget/actionsheet">actionsheet</router-link></span>
    <span class="span"><router-link to="widget/popover">popover</router-link></span>

    <h4>navbarView</h4>
    <span class="span"><router-link to="navbar">navbar</router-link></span>
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
    @Provide() demo2:number = 1;

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
      console.log('index mounted');
    }

    beforeDestroy() {
      console.log('index beforeDestroy');
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
