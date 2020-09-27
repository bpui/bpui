
<template>
  <!-- <div id="app">
    <router-view />
  </div> -->
  <bpNavbarView id="app" pageAnimation="" pageClass="container"/>
</template>

<script lang="ts">
import { Component, Vue, Watch, Provide } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import bpui from 'bpui.js';

@Component({
  components: {
    bpNavbarView: bpui.bpNavbarView as any,
  }
})
export default class extends Vue {

}
</script>


<style lang="scss">
@import 'bpui.js/style';
@import '@bpui/style';

.container {
  @include bp-isTablet {
    width: calc(100vw - 20px);
    height: auto;
  }
  div {
    width: auto;
  }
}

h4 {
  background: #eee;
  width: 30%;
}

</style>