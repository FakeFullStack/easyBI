<template>
  <transition name="aside">
    <div class="chartsaside" v-show="show">
      <component :is="panel"></component>
    </div>
  </transition>
</template>

<script>
import piepanel from '../components/visualization/echarts/piepanel'

export default {
  components: {
    piepanel
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      panel: piepanel
    }
  }
}
</script>

<style scoped>
  .chartsaside {
    position: absolute;
    /* overflow-x: auto; */
    top: 0px;
    right: 0px;
    height: calc(100% - 10px);
    /* width: 300px; */
    padding-bottom: 5px;
    padding-top: 5px;
  }

  .aside-enter, .aside-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .aside-enter-active{
    transition: all .5s ease-out;
  }
  .aside-leave-active {
    transition: all .5s ease-in;
  }
</style>
