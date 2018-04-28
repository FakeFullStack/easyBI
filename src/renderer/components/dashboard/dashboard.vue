<template>
  <div class="dashboard">
    <!-- <transition-group
      v-on:before-enter="tbeforeEnter" v-on:enter="enter" v-on:after-enter="tafterEnter"
      v-on:before-leave="tbeforeLeave" v-on:leave="leave" v-on:after-leave="tafterLeave"
    > -->
    <transition-group name="visualization">
      <template v-for="(v, index) in visual">
        <visualization :key="index" :name="v.name" :outline="v.outline" :isedit="v.isedit"
        :type="v.type" :data="v.data"></visualization>
      </template>
    </transition-group>
    <!-- insert a element, such as contextmenu -->
    <slot></slot>
  </div>
</template>

<script>
import visualization from '../visualization/visualization'

export default {
  components: {
    visualization
  },
  props: {
    visual: {
      // [{name outline [isedit] type data}]
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // tbeforeEnter (el) {
    //   el.style.opacity = 0
    // },
    // enter (el, done) {
    //   el.style.transition = 'opacity 1s ease-out'
    //   done()
    // },
    // tafterEnter (el) {
    //   // el.style.opacity = 1
    // },
    // tbeforeLeave (el) {

    // },
    // leave (el, done) {
    //   el.style.transition = 'opacity 1s ease-in'
    //   done()
    // },
    // tafterLeave (el) {
    //   el.style.opacity = 0
    // }
  }
}
</script>

<style scoped>
  .dashboard {
    position: relative;
    /* background: rebeccapurple; */
    height: 100%;
    /* padding: 0 5px 5px 0; */
  }

  /* 过渡 */
  .visualization-enter-active {
    transition: opacity 0.5s ease-out
  }
  .visualization-leave-active {
    transition: opacity 0.5s ease-in;
  }
  .visualization-enter, .visualization-leave-to {
    opacity: 0;
  }
  .visualization-enter-to, .visualization-leave {
    opacity: 1;
  }
</style>
