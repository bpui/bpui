import Icons from '../icons';

export default {
  name: 'bpIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    event: {
      validator: function (value) {
        let type = typeof value;
        return !value||type==='string'||Array.isArray(value);
      },
      default: 'click',
    }
  },
  mounted() {
  },
  render (createElement) {
    
    let icon = Icons.getIcon(this.name);
    if (!icon) {
      console.log('icon: ' + this.name + ' isn\'t registered');
      return createElement('i', { class: ['bp-icon'], style: {} }, this.$slots.default);
    }
    icon = icon||{value:''};
    let dataRender = { class: ['bp-icon'], style: {} };

    if (this.width) {
      dataRender.style.width = this.width;
    }
    if (this.height) {
      dataRender.style.height = this.height;
    }
    if (dataRender.style.width && !dataRender.style.height) {
      dataRender.style.height = dataRender.style.width;
    }
    else if (!dataRender.style.width && dataRender.style.height) {
      dataRender.style.width = dataRender.style.height;
    }

    // event.
    const handler = (name)=>{
      return e=> {
        this.$emit(name, e);
      }
    }

    const on = {}
    if (Array.isArray(this.event)) {
      this.event.forEach(e => {
        on[e] = handler(e);
      })
    } else {
      on[this.event] = handler(this.event)
    }

    dataRender.on = on;

    // svg.
    if (icon.type == 'svg') {
      dataRender.style.backgroundImage = `url(${icon.value})`;
      return createElement('i', dataRender, this.$slots.default);
    }
    else {
      dataRender.class.push(icon.value.className);

      let children = [];
      for (let i = 0; i < icon.value.children.length; i++) {
        let data1 = {class:[]};
        data1.class = [icon.value.children[i]];
        children.push(createElement('i', data1));
      }
      if (this.$slots.default) {
        children.push(this.$slots.default);
      }

      if (dataRender.style.width) {
        dataRender.style.fontSize = dataRender.style.width;
      }

      if (this.color) {
        dataRender.style.color = this.color;
      }

      return createElement('i', dataRender, children);
    }
  }
}
