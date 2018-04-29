<template>
  <mdiv :name="name" :outline="outline" :isedit="isedit" @mdiv="mdivHandle">
    <!-- 根据是否可以编辑对容器使用不同样式 -->
    <div ref="pie" slot="container" :class="{container: isedit, isnotedit: !isedit}"></div>
    <div slot="contextmenu" class="contextmenu" v-show="menu">
      <span class="fas fa-trash red" title="删除" @click="delClick"></span>
    </div>
  </mdiv>
</template>

<script>
import echarts from 'echarts'
import pie from './js/pie'

import mdiv from '../../mdiv'

export default {
  components: {
    mdiv
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    // 传入mdiv
    name: {
      type: String,
      default: null
    },
    outline: {
      type: Array,
      required: true,
      validator: function (value) {
        return value.length > 1
      }
    },
    isedit: {
      type: Boolean,
      default: false
    },
    // pie
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      e: null,
      option: pie.optionInit({data: this.data}),
      menu: false
    }
  },
  computed: {
    // pie () {
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
      } else if (arg === 'menu') {
        this.menu = !this.menu
      }
    },
    delClick () {
      // 这里可以使用vuex
      this.$emit('mdiv', 'mdel', this.index)
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
      let max = Math.max(...this.data[1].slice(1))
      max = this.data[1].indexOf(max)
      this.e.dispatchAction({
        type: 'pieSelect',
        name: this.data[0][max]
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.e = echarts.init(this.$refs.pie, 'light')
      this.e.setOption(this.option)
      let max = Math.max(...this.data[1].slice(1))
      max = this.data[1].indexOf(max)
      // 拿出最到的那块🍕
      this.e.dispatchAction({
        type: 'pieSelect',
        name: this.data[0][max]
      })

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
    this.option = null
    this.menu = false
  }
}
</script>

<style scoped>
  /* 不可编辑状态下的样式 */
  .isnotedit {
    float: left;
    /* min-height: 100%; */
    /* min-width: 300px; */
    height: calc(100% - 30px);
    width: 100%
  }
  
  .red:hover {
    color: red;
  }
</style>
