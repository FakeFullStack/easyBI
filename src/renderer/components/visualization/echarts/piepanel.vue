<template>
  <div class="piepanel">
    <el-tabs v-model="activeTab" type="border-card" style="height: calc(100%); max-height: 100%;">
      <el-tab-pane name="data" label="数据">
        <div class="target">
          <el-collapse v-model="targetCollapse" class="collapse">
            <el-collapse-item title="X轴" name="xAxis">
              <sortable :items="xAxisItems" @sortable="xAxisHandler" :isEdit="true"
              :options="{group: {name: 'target', pull: false, put: ['source']}}"></sortable>
            </el-collapse-item>
            <el-collapse-item title="Y轴" name="yAxis">
              <sortable :items="yAxisItems" @sortable="yAxisHandler" :isEdit="true"
              :options="{group: {name: 'target', pull: false, put: ['source']}}"></sortable>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="source">
          <sortable title="选择字段" @sortable="sourceHandler"
          :items="sourceItems"
          :options="{group: {name: 'source', pull: 'clone', put: false}, sort: false}"></sortable>
        </div>
      </el-tab-pane>
      <el-tab-pane name="set" label="样式">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import sortable from '../../sortable/sortable'
export default {
  components: {
    sortable
  },
  data () {
    return {
      activeTab: 'data',
      targetCollapse: 'xAxis',
      xAxisItems: [],
      yAxisItems: [],

      // sourceItems: [{prop: 'name', label: '姓------------------名'}, {prop: 'age', label: '年龄'}, {prop: 'sex', label: '性别'}]
      sourceItems: (function () {
        let test = []
        for (let index = 0; index < 200; index++) {
          let item = {prop: `test${index}`, label: `测试${index}`}
          test.push(item)
        }
        return test
      })()
    }
  },
  methods: {
    handler (arg, targetItems) {
      if (arg[0] === 'onAdd') {
        let sourceIndex = arg[1].oldIndex
        // avoid duplicated
        let s = new Set()
        targetItems.map(e => {
          s.add(e.prop)
        })
        s.add(this.sourceItems[sourceIndex].prop)

        targetItems = this.sourceItems.filter(e => {
          return s.has(e.prop)
        })
        // remove a element that add from sortablejs
        arg[1].to.removeChild(arg[1].item)
        return targetItems
      } else if (arg[0] === 'close') {
        let index = targetItems.findIndex(e => {
          return e.prop === arg[1]
        })
        targetItems.splice(index, 1)
        return targetItems
      }
      return targetItems
    },
    xAxisHandler (...arg) {
      this.xAxisItems = this.handler(arg, this.xAxisItems)
    },
    yAxisHandler (...arg) {
      this.yAxisItems = this.handler(arg, this.yAxisItems)
    },
    sourceHandler (...arg) {
      // console.log(arg)
      // if (arg[0] === 'onMove') {
      //   console.log(arg)
      // }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.xAxisItems = this.sourceItems.slice(4, 55)
    })
  }
}
</script>

<style scoped>
  .piepanel {
    height: 100%;
    width: 360px;
  }

  .target {
    float: left;
    width: calc(50% - 2px);
    height: 100%;
  }

  .collapse {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    /* width: calc(100% - 4px); */
  }

  .source {
    float: right;
    width: calc(50% - 2px);
    height: 100%;
  }
</style>
