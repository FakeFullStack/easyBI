<template>
  <div class="contextmenu" :style="contextmenu" ref="contextmenu">
    <template v-for="(e, index) in menus">
      <hr v-if="e.label === 'hr'" :key="index">
      <div v-else :class="FontAwesomeName(e.FontAwesomeName)" class="fas" :key="index"  @mouseup="click(e.event)">
        <span>&nbsp;{{e.label}}</span>
      </div>
    </template>
  </div>
</template>

<script>
// 这个插件建议插入到target对应的DIV中
export default {
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    menus: {
      // [{label, FontAwesomeName, event}]
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  watch: {
    // x () {
    //   console.log('x: ', this.x)
    // },
    // y () {
    //   console.log('y: ', this.y)
    // }
  },
  computed: {
    contextmenu: function () {
      // this.x 和 this.y 需要放在外面
      let x = this.x
      let y = this.y
      if (this.$el !== undefined) {
        let height = this.$el.parentElement.clientHeight
        let width = this.$el.parentElement.clientWidth
        let left = x > (width - 190) ? width - 190 : x
        let top = y > height - this.$el.clientHeight ? height - this.$el.clientHeight : y
        // console.log(height, width, top, left)
        return `
          left: ${left}px;
          top: ${top}px;
        `
      }
      return 'left: 0px; top: 0px;'
    }
  },
  methods: {
    FontAwesomeName (name) {
      return `fa-${name}`
    },
    click (arg) {
      this.$emit('contextmenu', arg)
    }
  }
}
</script>

<style scoped>
  .contextmenu {
    position: absolute;
    user-select: none;
    font-size: 16px;
    width: 190px;
    border: 1px solid #dadada;
    box-shadow: 2px 2px 2px #8f8f8f;
    background: #ffffff;
    z-index: 10;
  }

  .contextmenu>div {
    display: block;
    height: 24px;
    line-height: 24px;
    margin: 2px 0;
    padding-left: 10px;
  }

  div>span {
    font-weight: normal;
  }

  .contextmenu>hr {
    background-color: #c0c0c0;
    margin: 0 1px;
    height: 1px;
    width: calc(100% - 2px);
    border: none;
    /* border-bottom-style: solid; */
    /* border-bottom-width: 1px; */
  }

  .contextmenu>div:hover {
    background: #f0f0f0;
  }
</style>
