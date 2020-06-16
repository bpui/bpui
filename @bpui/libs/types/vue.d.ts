import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $timer:  bp.Timer;
    $bpTimer:  bp.Timer;  /* the same as $timer */
    $bpLibs: typeof bp.bpLibs;
  }
}

// declare module 'vue/types/options' {
//   interface ComponentOptions<V extends Vue> {
//     // bpLibs?: bp.Libs;
//   }
// }
