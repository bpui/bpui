import Popper from './popper.js'
import PopperManager from './popperManager'

export default {
  name: 'PopperMixin',
  props: {
    value: Boolean,
    appendBody: { type: Boolean , default: true }
  },
  data() {
    return {
      popperInstance: null,
      referenceElm: null,
      popperElm: null,
      popperKey: ''
    }
  },
  components: {},
  filters: {},
  computed: {},
  watch: {
    value (val) {
      if (val) {
        this.update();
        this.$emit('input', val);
      }
    }
  },
  methods: {
    update() {
      if (this.popperInstance) {
        this.popperInstance.update();
      } else {
        this.$nextTick(() => {
          this.createPoper();
        })
      }
    },
    createPoper() {
      const referenceElm = this.referenceElm = this.referenceElm || this.$refs.reference;
      const popperElm = this.popperElm = this.popperElm || this.$refs.popper;

      if (!referenceElm && !popperElm) {
        return
      }

      if (this.appendBody) {
        document.body.appendChild(this.popperElm);
      }
      if (this.popperInstance && this.popperInstance.destory) {
        this.popperInstance.destory();
      }


      const options = {};
      this.popperInstance = new Popper(referenceElm, popperElm, options);
    }
  },
  created() {
    // this.popperKey = PopperManager.register(this);
  },
  mounted() {

  },
  beforeDestroy() {
    PopperManager.unRegister(this);
  }
}
