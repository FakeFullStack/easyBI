<template>
  <div class="home">
    <div style="height: 30px;"></div>
    <el-tabs v-model="activeTab" type="border-card" tabPosition="left" style="height: calc(100% - 32px);">
      <el-tab-pane name="dashboard">
        <span slot="label"><i class="fas fa-chart-bar fa-lg" title="仪表盘"></i></span>
          <dashboard :visual="visual"></dashboard>
        <!-- <visualization class="container"
        type="pie" vstyle="height: 200px" :data="[['测试', '一下'], [12, 33]]">
        </visualization> -->
      </el-tab-pane>
      <el-tab-pane name="table">
        <span slot="label"><i class="fas fa-table fa-lg" title="源数据"></i></span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { remote } from 'electron'

import dashboard from '../components/dashboard/dashboard'

export default {
  components: {
    dashboard
  },
  data () {
    return {
      activeTab: 'dashboard',

      // 这里可以使用vuex
      visual: [{
        name: '🍕',
        type: 'pie',
        outline: [300, 300],
        data: [['🍕', '🍔', '🍟', '🌭'], [35, 54, 13, 60]]
      },
      {
        name: '📈',
        type: 'line',
        isedit: true,
        outline: [300, 330],
        data: [['食物', '🍕', '🍔', '🍟', '🌭'], ['数量', 35, 54, 13, 60]]
      },
      {
        name: '📊',
        type: 'bar',
        outline: ['50%', '300px'],
        data: [['食物', '🍕', '🍔', '🍟', '🌭'], ['数量', 35, 54, 13, 60]]
      }]
    }
  },
  methods: {
    addChart () {
      this.visual.splice(3, 0,
        {
          name: '📊',
          type: 'ybar',
          isedit: true,
          outline: [300, 300, 50, 50],
          data: [['食物', '🍕', '🍔', '🍟', '🌭'], ['数量', 35, 54, 13, 60]]
        })
    }
  },
  mounted () {
    this.$nextTick(() => {
      let menu = this.menu
      let that = this
      menu = new remote.Menu()
      menu.append(new remote.MenuItem({
        label: '📊新增图表',
        click () { that.addChart() }
      }))

      window.addEventListener('contextmenu', e => {
        e.preventDefault()
        menu.popup(remote.getCurrentWindow())
      }, false)
    })
  }
}
</script>

<style scoped>
  .home {
    /* height: calc(100% - 2px); */
    /* border: 1px solid #e0e0e0; */
    height: 100%;
  }
</style>
