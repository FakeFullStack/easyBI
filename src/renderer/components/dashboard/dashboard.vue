<template>
  <div class="dashboard">
    <!-- <transition-group
      v-on:before-enter="tbeforeEnter" v-on:enter="enter" v-on:after-enter="tafterEnter"
      v-on:before-leave="tbeforeLeave" v-on:leave="leave" v-on:after-leave="tafterLeave"
    > -->
    <transition-group name="visualization">
      <template v-for="(v, index) in visual">
        <visualization :key="index" :index="index" :name="v.name" :outline="v.outline" :isedit="v.isedit"
        :type="v.type" :data="v.data"
        @mdiv="mdiv"></visualization>
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
    mdiv (arg) {
      this.$emit('dashboard', arg)
    }
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
