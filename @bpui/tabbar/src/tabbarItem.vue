<!--
/**
* Copyright (c) 2017 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2018-06-13 15:04
* Desc: tabbarItem.
*/

<bp-tabbarItem>
  <bp-icon name="heartFill"></bp-icon>
  <bp-tabbar-item-title>个人中心</bp-tabbar-item-title>
</bp-tabbarItem>

 -->

<template>
  <a href="javascript:;" class="bp-tabbar__item" v-bind="$attrs" v-on="$listeners">
    <slot name="default"/>
    <span v-if="badge" 
      class="bp-tabbar__item__badge"
      :class="{
        'bp-tabbar__item__badge_dot': badge===true,
        }"
    >{{badge===true?'':badge}}</span>
  </a>
</template>

<script>

  export default {
    props: {
      routePath: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        _routePath: null,
        badge: null,  // return !value || x === 'string' || x === 'number' || value === true;
      };
    },
    beforeMount() {
    },
    mounted() {
      // routePath.
      if (this.routePath) {
        let n = this.routePath.indexOf('?')
        if (n >= 0) {
          this._routePath = this.routePath.substring(0, n);
        }
        else {
          n = this.routePath.indexOf('#')
          if (n >= 0) {
            this._routePath = this.routePath.substring(0, n);
          }
          else {
            this._routePath = this.routePath;
          }
        }
      }

      // icons.
      let eeIcons = $(this.$el).children('.bp-icon');
      for (let j = 0; j < eeIcons.length; j++) {
        if (!eeIcons[j]) continue;
        let eeIcon = $(eeIcons[j]);
        let activeL = eeIcon.attr('active');

        if (activeL == 'false') {
          eeIcon.addClass('bp-tabbar__visible');
        }
        else if (activeL == 'true') {
          eeIcon.addClass('bp-tabbar__invisible');
        }
      } // for,

      $(this.$el).on('click', this._onClick);
    },
    methods: {
      _onClick(e) {
        let ee = $(this.$el);
        if (!ee.hasClass('bp-tabbar__item_on')) {
          if (!this.routePath) {
            return;
          }

          if (!this.$parent) {
            return;
          }

          let icons;
          let tabbar = this.$parent;
          let oldIndex = tabbar.getCurrentTabIndex();
          if (oldIndex >= 0) {
            let oldEe = $(tabbar.$children[oldIndex].$el);
            oldEe.removeClass('bp-tabbar__item_on');
            icons = oldEe.children('.bp-icon');
            if (icons.length > 1) {
              let icon0 = $(icons[0]);
              let icon1 = $(icons[1]);

              if (icon0.attr('active') == 'true') {
                let t = icon0;
                icon0 = icon1;
                icon1 = t;
              }

              icon1.addClass('bp-tabbar__invisible').removeClass('bp-tabbar__visible');
              icon0.addClass('bp-tabbar__visible').removeClass('bp-tabbar__invisible');
            }
          }

          ee.addClass('bp-tabbar__item_on');
          icons = ee.children('.bp-icon');
          if (icons.length > 1) {
            let icon0 = $(icons[0]);
            let icon1 = $(icons[1]);

            if (icon0.attr('active') == 'true') {
              let t = icon0;
              icon0 = icon1;
              icon1 = t;
            }

            icon0.addClass('bp-tabbar__invisible').removeClass('bp-tabbar__visible');
            icon1.addClass('bp-tabbar__visible').removeClass('bp-tabbar__invisible');
          }

          // change route.
          let r1 = tabbar.routePath || '';
          let r2 = this.routePath;
          if (r1[r1.length-1] == '/') {
            if (r2[0] == '/') { r2 = r2.substring(1); }
          }
          else {
            if (r2[0] != '/') { r2 = '/' + r2; }
          }
          r1 += r2;
          this.$bpLibs.router.push(r1);
        } // if.
      }
    },
  };
</script>