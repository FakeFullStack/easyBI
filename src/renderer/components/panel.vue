<template>
  <mdiv :name="name" :isedit="isedit" :outline="outline">
    <visualization slot="container"
    :type="type" :vstyle="style" :data="data">
    </visualization>
  </mdiv>
</template>

<script>
import visualization from './visualization/visualization'
import mdiv from './mdiv'

// import pie from '../components/visualization/echarts/pie'
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    isedit: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      validator: function (value) {
        return (
          value === 'pie' ||
          value === 'bar' || value === 'ybar' || value === 'line' ||
          value === 'card'
        )
      },
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    style () {
      return `
        float: left;
        height: calc(${this.outline[3]}px - 30px);
        width: ${this.outline[2]}px;
      `
    }
  },
  components: {
    mdiv,
    visualization
    // pie
  },
  mounted () {
    this.$nextTick(() => {
    })
  }
}
</script>

<style scoped>

</style>
