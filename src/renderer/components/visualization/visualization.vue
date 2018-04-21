<template>
  <component :is="typename" class="background"
  :name="name" :outline="outline" :isedit="isedit"
  :data="data" :type="type"></component>
</template>

<script>
import pie from './echarts/pie'
import cartesian2d from './echarts/cartesian2d'
import card from './card/card'

export default {
  props: {
    name: {
      type: String,
      default: null
    },
    outline: {
      type: Array,
      required: true,
      validator: function (value) {
        return value.length >= 4
      }
    },
    isedit: {
      type: Boolean,
      default: false
    },
    // visualization
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
  components: {
    pie,
    cartesian2d,
    card
  },
  computed: {
    typename (value) {
      // 重命名
      if (this.type === 'bar' || this.type === 'ybar' || this.type === 'line') {
        return 'cartesian2d'
      }
      return this.type
    }
    // style (value) {
    //   console.log('vstyle', this.vstyle)
    //   return this.vstyle
    // }
  },
  mounted () {
    this.$nextTick(() => {
    })
  }
}
</script>

<style scoped>
  .background {
    background-color: #f3f3f3;
  }
</style>
