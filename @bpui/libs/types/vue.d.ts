import Vue from 'vue';
import * as febs from 'febs-browser';

declare module 'vue/types/vue' {
  interface Vue {
    $bpLibs: typeof bp.bpLibs;
    $febs: typeof febs;

    /**
     * 定时器; 添加的定时器在组件销毁时会自动移除.
     */
    $timer:  bp.Timer;
    $bpTimer:  bp.Timer;  /* the same as $timer */

    /**
     * 事件管理器; 添加的事件在组件销毁时会自动移除.
     */
    $bpEventMgr: bp.EventMgr;

    /**
     * 手势对象管理器; 添加的手势对象在组件销毁时会自动移除.
     */
    $bpGestureMgr: bp.GestureMgr;
  }
}

// declare module 'vue/types/options' {
//   interface ComponentOptions<V extends Vue> {
//     // bpLibs?: bp.Libs;
//   }
// }
