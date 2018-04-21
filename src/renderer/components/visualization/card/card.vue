<template>
  <div :style="card">
    <!-- <div style="margin: 10px 0;"><span class="title">{{ name }}</span></div> -->
    <!-- <div class="value">{{ value }}</div> -->
    <div class="title">{{ name }}</div>
    <span :style="valueStyle">{{ value }}</span>
  </div>
</template>

<script>
// import randomcolor from 'randomcolor'

export default {
  props: {
    // container: {
    //   type: Object,
    //   validator: function (value) {
    //     return (typeof (value.width) === 'string' && (typeof (value.height) === 'string'))
    //   },
    //   required: true
    // },
    name: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      required: true
    }
    // cardStyle: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       titleSize: '18px',
    //       dataSize: '44px'
    //     }
    //   }
    // }
  },
  data () {
    return {
      // background: randomcolor({hue: 'blue', luminosity: 'dark', count: 1, format: 'rgba', alpha: 0.8})
      background: '#fff'
    }
  },
  computed: {
    card () {
      if (this.data[0]) {
        return `
          minHeight: 100px;
          margin-right: 4px;
          margin-bottom: 4px;
          text-align: center;
          color: white;
          user-select: none;
          box-shadow: 2px 2px 8px #777777;
          border: 1px solid #c0c4cc;
          border-radius: 4px;
          background: ${this.background};
        `
      }
      return `
        minHeight: 100px;
        margin-right: 4px;
        margin-bottom: 4px;
        text-align: center;
        color: white;
        user-select: none;
        box-shadow: 2px 2px 8px transparent;
        border: 1px solid transparent;
        border-radius: 4px;
        background: transparent;
      `
    },
    value () {
      if (this.data[0]) {
        if (typeof (this.data[0]) === 'number') {
          return this.data[0].toLocaleString()
        } else {
          return this.data[0]
        }
      }
    },
    valueStyle () {
      let style = {
        fontSize: '44px',
        lineHeight: '50px'
      }
      if (this.value) {
        let length = this.value.length
        if (length < 4) {
          style.fontSize = '44px'
        } else if (length < 8) {
          style.fontSize = '38px'
        } else if (length < 12) {
          style.fontSize = '32px'
        } else if (length < 16) {
          style.fontSize = '26px'
        } else {
          style.fontSize = '22px'
        }
      }
      return style
    }
    // titleStyle () {
    //   return `
    //     padding-top: 20px;
    //     font-Size: ${this.cardStyle.titleSize};
    //   `
    // },
    // dataStyle () {
    //   return `
    //     padding-top: 10%;
    //     font-Size: ${this.cardStyle.dataSize};
    //   `
    // }
  }
}
</script>

<style scoped>
  /* .card {
    text-align: center;
    box-shadow: 2px 2px 8px #777777;
    border: 1px solid #c0c4cc;
    border-radius: 4px;
  }

  .hcard {
    text-align: center;
    box-shadow: 2px 2px 8px transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    background: transparent;
  } */

  .title {
    /* text-align: center; */
    font-Size: 18px;
    height: 40px;
    line-height: 45px;
    width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
