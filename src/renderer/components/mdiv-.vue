<template>
  <div class="mdiv">
    <div class="head" v-show="isedit" @mousedown="mousedown">{{ title }}</div>
    <div class="menu" v-show="isedit">
      <div style="float: right; margin: 0 7px" @click.stop="menuClick">
        <span class="fas fa-ellipsis-v"></span>
      </div>
      <div style="float: right; margin: 0 3px"  @click.stop="expand">
        <span class="fas" :class="{ 'fa-expand': !isexpand, 'fa-compress': isexpand }"></span>
      </div>
      <slot name="contextmenu"></slot>
    </div>
    <slot name="container"></slot>
    <div class="resize" v-show="isedit" @mousedown="rmousedown"></div>
  </div>
</template>

<script>
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    // [X, Y, W, H]
    // 要么都数字,要么都字符串
    // 最好改成 [W H [X Y]]
    outline: {
      type: Array,
      required: true,
      validator: function (value) {
        return (
          (function () {
            for (let index = 0; index < value.length; index++) {
              if (typeof (value[index]) !== 'string') {
                return false
              }
            }
            return true
          })() ||
          (function () {
            for (let index = 0; index < value.length; index++) {
              if (typeof (value[index]) !== 'number') {
                return false
              }
            }
            return true
          })()
        )
      }
    },
    isedit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isexpand: false,
      // 空间位置相关
      pos: {},
      posNew: {},
      // DIV相关临时变量
      down: null,
      room: {top: 0, left: 0, bottom: 0, right: 0, height: 0, width: 0}
    }
  },
  methods: {
    expand () {
      this.isexpand = !this.isexpand
      if (this.isexpand) { // isexpand === true 变全屏
        this.$el.style.left = '1px'
        this.$el.style.top = '1px'
        this.$el.style.height = 'calc(100% - 2px)'
        this.$el.style.width = 'calc(100% - 2px)'
      } else {
        this.$el.style.left = this.pos.left + 'px'
        this.$el.style.top = this.pos.top + 'px'
        this.$el.style.width = this.pos.width + 'px'
        this.$el.style.height = this.pos.height + 'px'
      }
      this.$emit('mdiv', 'resize')
    },
    menuClick () {
      this.$emit('mdiv', 'menu')
    },
    outlineUpdate () {
      let room = this.$el.parentElement.getBoundingClientRect()

      let left = this.outline[0] > room.right ? room.right - 2 : this.outline[0]
      let top = this.outline[1] > room.top ? room.top - 2 : this.outline[1]
      let width = this.outline[0] + this.outline[2] // x + width
      let height = this.outline[1] + this.outline[3] // y + height
      width = width < room.width ? width : room.width - this.outline[0] - 4
      height = height < room.height ? height : room.height - this.outline[1] - 4
      this.$el.style.height = height + 'px'
      this.$el.style.width = width + 'px'
      this.$el.style.left = left + 'px'
      this.$el.style.top = top + 'px'
    },
    // 移动DIV
    mousedown (down) {
      this.down = down
      document.onmousemove = this.mousemove
      document.onmouseup = this.mouseup
    },
    mousemove (move) {
      // move.client 当前鼠标位置
      // down.client 按下鼠标位置
      // down.clientY - down.clientY 位移
      let diff = {x: move.clientX - this.down.clientX, y: move.clientY - this.down.clientY}
      this.posNew.left = this.pos.left + diff.x
      this.posNew.top = this.pos.top + diff.y
      this.$el.style.left = this.posNew.left + 'px'
      this.$el.style.top = this.posNew.top + 'px'
    },
    mouseup () {
      let parent = this.$el.parentElement.getBoundingClientRect()
      let self = this.$el.getBoundingClientRect()
      let diff = {
        left: self.left - parent.left - 2,
        top: self.top - parent.top - 2,
        right: parent.right - self.right - 2,
        bottom: parent.bottom - self.bottom - 2
      }
      if (diff.left < 0) {
        this.posNew.left -= diff.left
      }
      if (diff.top < 0) {
        this.posNew.top -= diff.top
      }
      if (diff.right < 0) {
        this.posNew.left += diff.right
      }
      if (diff.bottom < 0) {
        this.posNew.top += diff.bottom
      }
      this.$el.style.left = this.posNew.left + 'px'
      this.$el.style.top = this.posNew.top + 'px'
      // 更新位置
      Object.assign(this.pos, this.posNew)
      document.onmousemove = null
      document.onmouseup = null
      this.$emit('mdiv', 'click')
    },
    // 缩放DIV
    rmousedown (down) {
      this.down = down
      // this.room = this.$el.parentElement.getBoundingClientRect()
      let room = this.$el.parentElement.getBoundingClientRect()
      this.room.height = room.height
      this.room.width = room.width
      this.room.top = room.top
      this.room.right = room.right
      // console.log('room: ', this.room.width, this.room.height, this.room.top, this.room.right)
      this.room.width = this.room.width - this.pos.width - this.pos.left - 4
      this.room.height = this.room.height - this.pos.height - this.pos.top - 4
      // console.log('room_new: ', this.room.width, this.room.height)
      document.onmouseup = this.rmouseup
      document.onmousemove = this.rmousemove
    },
    rmousemove (move) {
      let diff = {x: move.clientX - this.down.clientX, y: move.clientY - this.down.clientY}
      // console.log('diff: ', diff.x, diff.y)
      let x = diff.x < this.room.width ? diff.x : this.room.width
      let y = diff.y < this.room.height ? diff.y : this.room.height
      // console.log(x, y)
      this.posNew.width = this.pos.width + x
      this.posNew.height = this.pos.height + y
      // console.log('posNew: ', this.posNew.width, this.posNew.height)
      this.$el.style.width = this.posNew.width + 'px'
      this.$el.style.height = this.posNew.height + 'px'
    },
    rmouseup () {
      document.onmousemove = null
      document.onmouseup = null
      // 更新大小
      this.posNew.width = this.posNew.width > 300 ? this.posNew.width : 300
      this.posNew.height = this.posNew.height > 300 ? this.posNew.height : 300
      Object.assign(this.pos, this.posNew)
      this.$emit('mdiv', 'resize')
    }
  },
  watch: {
    outline () {
      if (typeof (this.outline[0]) === 'number') {
        this.outlineUpdate()
        this.pos = {
          left: this.outline[0],
          top: this.outline[1],
          height: this.outline[2],
          width: this.outline[3]
        }
        this.$emit('mdiv', 'resize')
      } else if (typeof (this.outline[0]) === 'string') {
        this.$el.style.height = this.outline[3]
        this.$el.style.width = this.outline[2]
        this.$el.style.left = this.outline[0]
        this.$el.style.top = this.outline[1]
        this.$emit('mdiv', 'resize')
      } else {
        console.error('outline 参数错误')
      }
    }
  },
  computed: {
    title () {
      return this.name
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.isedit) {
        if (typeof (this.outline[0]) === 'number') {
          this.$el.style.left = this.outline[0] + 'px' // x
          this.$el.style.top = this.outline[1] + 'px' // y
          this.$el.style.width = this.outline[2] + 'px' // w
          this.$el.style.height = this.outline[3] + 'px' // h
          this.pos['left'] = this.outline[0]
          this.pos['top'] = this.outline[1]
          this.pos['width'] = this.outline[2]
          this.pos['height'] = this.outline[3]
          this.posNew['left'] = this.outline[0]
          this.posNew['top'] = this.outline[1]
          this.posNew['width'] = this.outline[2]
          this.posNew['height'] = this.outline[3]
        } else {
          console.error('可编辑状态下,outline只支持数字参数')
        }
      } else {
        // 不可编辑支持数字和字符串
        let outline
        if (typeof (this.outline[0]) === 'number') {
          // 数字参数改为 xxpx
          outline = this.outline.map(v => {
            return `${v}px`
          })
        } else if (typeof (this.outline[0]) === 'string') {
          outline = this.outline.map(v => {
            if (v.toString().slice(v.length - 2) !== 'px' && v.toString()[v.length - 1] !== '%') {
              console.error('参数格式错误(%, px)')
            }
            return v
          })
        } else {
          console.error('参数类型错误(string, number)')
        }
        this.$el.style.left = outline[0] // x
        this.$el.style.top = outline[1] // y
        this.$el.style.width = outline[2] // w
        this.$el.style.height = outline[3] // h
      }
    })
  }
}
</script>

<style scoped>
  .mdiv {
    position: relative;
    float: left;
    min-width: 300px;
    min-height: 300px;
    background: white;
    border: 1px solid rgb(201, 208, 219);
    border-radius: 4px;
    border-bottom-right-radius: 0px;
    box-shadow: 2px 2px 6px #646464;
    user-select: none;
  }

  .head {
    float: left;
    height: 30px;
    padding-left: 5px;
    line-height: 30px;
    width: calc(100% - 45px);
    background: #f8f8f8;
    cursor: move;
    /* border-bottom-color: #646464;
    border-bottom-style: solid;
    border-bottom-width: 1px; */
    z-index: 10;
  }

  .container {
    float: left;
    min-height: calc(100% - 30px);
    min-width: 300px;
    height: calc(100% - 30px);
    width: 100%
  }

  .menu {
    position: relative;
    float: left;
    height: 16px;
    width: 40px;
    text-align: center;
    padding: 7px 0px;
    background: #f8f8f8;
    cursor: pointer;
  }
  .menu span:hover {
    color: darkseagreen;
  }
  .contextmenu {
    position: absolute;
    width: 20px;
    top: 31px;
    right: 0px;
    z-index: 10;
  }

  .resize {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 0px;
    height: 0px;
    border-bottom: 8px solid rgba(0, 0, 0, 0.5);
    border-left: 8px solid transparent;
    cursor: nw-resize;
  }
</style>
