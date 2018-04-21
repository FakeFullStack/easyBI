<template>
  <mdiv :name="name" :outline="outline" :isedit="isedit" @mdiv="mdivHandle">
    <!-- 根据是否可以编辑对容器使用不同样式 -->
    <div ref="cartesian2d" slot="container" :class="{container: isedit, isnotedit: !isedit}"></div>
  </mdiv>
</template>

<script>
import echarts from 'echarts'
import cartesian2d from './js/cartesian2d'

import mdiv from '../../mdiv'

export default {
  components: {
    mdiv
  },
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
    // cartesian2d
    data: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      e: null,
      option: cartesian2d.optionInit(this.isedit ? {data: this.data, type: this.type} : {data: this.data, title: this.name, type: this.type})
    }
  },
  computed: {
    // cartesian2d () {
    //   if (typeof (this.container) === 'object') {
    //     return `
    //       width: calc(${this.container.width} - 6px);
    //       height: calc(${this.container.height} - 6px);
    //       margin-right: 4px;
    //       margin-bottom: 4px;
    //     `
    //   }
    //   return this.container
    // }
  },
  methods: {
    mdivHandle (arg) {
      // console.log(arg)
      if (arg === 'click') {
        this.$emit('mclick')
      } else if (arg === 'resize') {
        this.e.resize()
      }
    }
  },
  watch: {
    name () {
      this.e.setOption({
        title: {
          text: this.name
        }
      })
    },
    data () {
      this.e.setOption({
        dataset: {
          source: this.data
        }
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.e = echarts.init(this.$refs.cartesian2d, 'light')
      this.e.setOption(this.option)
      // 增加系列 从dataset[1]开始
      let type = new Array(this.data.length - 1)
      type.fill(this.type)
      let series = cartesian2d.seriesUpdate(type)
      this.e.setOption({series})

      // 如果样式是width: xx%的,才需要响应浏览器做resize
      if (this.$el.style.width[this.$el.style.width.length - 1] === '%') {
        let that = this.e
        window.addEventListener('resize', () => {
          setTimeout(() => {
            that.resize()
          }, Math.floor(Math.random() * 500))
        })
      }
    })
  },
  beforeDestroy () {
    this.e.dispose()
    this.e = null
  }
}
</script>

<style scoped>
  /* 不可编辑状态下的样式 */
  .isnotedit {
    float: left;
    /* min-height: 100%; */
    /* min-width: 300px; */
    height: 100%;
    width: 100%
  }
</style>
