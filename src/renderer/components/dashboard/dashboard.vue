<template>
  <div class="dashboard">
    <template v-for="(v, index) in visual">
      <visualization :key="index" :name="v.name" :outline="v.outline" :isedit="v.isedit"
      :type="v.type" :data="v.data"></visualization>
    </template>
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
</style>
