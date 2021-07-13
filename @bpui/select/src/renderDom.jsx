import * as febs from 'febs-browser';

export default {
  props: {
    vNode: [Object],
  },
  render(h) {
    this.vNode.componentOptions.listeners = this.vNode.componentOptions.listeners || {};

    this.vNode.componentOptions.listeners = febs.utils.mergeMap(this.vNode.componentOptions.listeners, this.$listeners);

    return this.vNode;
  }
}