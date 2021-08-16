
<template>
  <div>
    <div>try swipe:</div>
    {{type}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Provide } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import { GestureDirection } from '@bpui/libs/types/gestureDirection';

@Component({
  components: {
  }
})
export default class extends Vue {
  @Provide() type:string = '';
  
  mounted() {
    // let gesture = new this.$bpLibs.Gesture(document.getElementsByTagName('body')[0]);
    let gesture = this.$bpGestureMgr.add("gesture1", this.$el);

    gesture.enableSwipeRecognizer();
    (gesture).on('swipe', (ev:bp.GestureSwipeEvent)=>{
      // alert('swipe');
      switch (ev.direction) {
        case GestureDirection.Left:
          this.type = 'left';
          break;
        case GestureDirection.Right:
          this.type = 'right';
          break;
        case GestureDirection.Up:
          this.type = 'up';
          break;
        case GestureDirection.Down:
          this.type = 'down';
          break;
      }
    })

    gesture.enablePressRecognizer({duration: 1000});
    (gesture).on('press', (ev:bp.GestureEvent)=>{
      alert('press');
    })
  }
}
</script>


<style lang="scss">
</style>