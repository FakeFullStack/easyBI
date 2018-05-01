<template>
  <div class="sortable">
    <div v-if="title">
      <div class="title">{{title}}</div>
      <hr>
    </div>
    <div ref="sortable" class="container">
      <div v-for="item in newItems" :key="item.prop" :title="item.label" class="item">
        <div class="text">{{item.label}}</div>
        <div v-if="isEdit" class="close" @click="close(item.prop)">x</div>
      </div>
    </div>
  </div>
</template>

<script>
import sortable from 'sortablejs'
export default {
  props: {
    title: {
      type: String
    },
    items: {
      type: Array,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object
    }
  },
  data () {
    return {
      sa: null
    }
  },
  methods: {
    close (arg) {
      this.$emit('sortable', 'close', arg)
    }
  },
  computed: {
    newItems () {
      // if (this.$el) {
      //   // console.log(this.$refs.sortable)
      //   console.log(this.$refs.sortable.children)
      //   while (this.$refs.sortable.children.length) {
      //     this.$refs.sortable.removeChild(this.$refs.sortable.children[0])
      //   }
      // }
      return this.items
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.sa = sortable.create(this.$refs.sortable, this.options)
      let event = ['onChoose', 'onStart', 'onEnd', 'onAdd', 'onUpdate', 'onSort', 'onRemove', 'onFilter', 'onClone']
      event.forEach(element => {
        this.sa.option(element, (params) => {
          this.$emit('sortable', element, params)
        })
      })
      this.sa.option('onMove', (...params) => {
        this.$emit('sortable', 'onMove', ...params)
      })
      console.log(this.sa)
    })
  }
}
</script>

<style scoped>
  hr {
    background-color: #c0c0c0;
    margin: 0 1px;
    height: 1px;
    width: calc(100% - 2px);
    border: none;
  }

  .sortable {
    overflow-y: auto;
    padding: 2px;
    width: calc(100% - 6px);
    max-height: calc(100% - 4px);
    /* box-shadow: 1px 1px 1px #d8d8d8; */
    /* border: 1px solid #c0c0c0; */
    border-radius: 3px;
  }

  .title {
    height: 26px;
    line-height: 26px;
    margin: 5px 0;
    border-radius: 4px;
    padding: 0 5px;
    background: lightblue;
    display: inline-block;
  }

  .container {
    overflow: auto;
    max-height: calc(100% - 36px);
    margin-top: 2px;
    min-height: 26px;
    font-size: 14px;
    background: #eeeeee;
  }

  .item {
    position: relative;
    padding: 0 5px;
    border: 1px solid #c0c0c0;
    background: #fdfdfd;
    border-radius: 3px;
    height: 26px;
    line-height: 26px;
    width: calc(100% - 12px);
    margin-bottom: -1px;
  }

  .item:hover {
    background: lightblue;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 5px);
  }

  .close {
    position: absolute;
    right: 1px;
    top: 7px;
    font-size: 12px;
    /* background-color: rgb(110, 110, 110); */
    display: inline-block;
    text-align: center;
    height: 10px;
    width: 10px;
    line-height: 10px;
    cursor: pointer;
  }

  .close:hover {
    color: red;
  }

  .item:last-child {
    margin-bottom: 1px;
  }
</style>
