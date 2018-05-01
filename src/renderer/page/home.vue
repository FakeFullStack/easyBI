<template>
  <div class="home" @click="homeHandler">
    <div style="height: 30px;"></div>
    <el-tabs v-model="activeTab" type="border-card" tabPosition="left" style="height: calc(100% - 32px);">
      <el-tab-pane name="dashboard">
        <span slot="label"><i class="fas fa-chart-bar fa-lg" title="仪表盘"></i></span>
          <dashboard :visual="visuals" ref="dashboard" @dashboard="dashboard">
            <mcontextmenu v-show="contextmenuShow" :x="menuX" :y="menuY" :menus="menus" @contextmenu="contextmenuEvent"></mcontextmenu>
          </dashboard>
          <el-dialog title="新增图表" :visible.sync="newCharts" width="80%">
            <newCharts @addChart="newCharts=false"></newCharts>
          </el-dialog>
          <chartsAside :show="aside"></chartsAside>
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
import dashboard from '../components/dashboard/dashboard'
import newCharts from './newCharts'
import chartsAside from './chartsaside'

import mcontextmenu from '../components/contextmenu/mcontextmenu'

export default {
  components: {
    dashboard,
    newCharts,
    chartsAside,
    mcontextmenu
  },
  data () {
    return {
      activeTab: 'dashboard',

      newCharts: false,

      aside: false,

      menus: [
        {label: '增加图表', FontAwesomeName: 'plus-circle', event: 1},
        {label: 'hr'},
        {label: '测试', FontAwesomeName: 'plus-circle', event: 2},
        {label: '测试', FontAwesomeName: 'plus-circle', event: 3}
      ],
      menuX: 0,
      menuY: 0,
      contextmenuShow: false,
      container: null,

      example: []
    }
  },
  methods: {
    contextmenuEvent (arg) {
      if (arg === 1) {
        // this.$store.commit('addChart', [this.example[Math.floor(Math.random() * 4)]])
        this.newCharts = true
      }
    },
    dashboard (arg) {
      if (arg[0] === 'mdel') {
        this.$store.commit('removeChart', {
          index: arg[1]
        })
      } else if (arg[0] === 'mclick') {
        this.aside = true
      }
    },
    homeHandler (e) {
      // console.log(e)
      if (e.target.className === 'dashboard') {
        this.aside = false
      }
      this.contextmenuShow = false
    }
  },
  computed: {
    visuals () {
      return this.$store.state.dashboard.charts
    }
  },
  mounted () {
    this.contextmenuShow = false
    this.$nextTick(() => {
      let that = this
      // this.$store.commit('addChart', this.example)
      window.addEventListener('contextmenu', function (e) {
        // console.log(e)
        if (that.contextmenuShow) {
          // 阻止在右键菜单上右键换出原来的右键菜单
          e.preventDefault()
          that.contextmenuShow = false
          return
        }
        if (e.target.className === 'dashboard') {
          that.contextmenuShow = true
          // let top = e.clientY > e.target.clientHeight
          // let left = 0
          that.menuX = e.offsetX
          that.menuY = e.offsetY
          e.preventDefault()
        }
      })
    })
  }
}
</script>

<style scoped>
  .home {
    /* height: calc(100% - 2px); */
    /* border: 1px solid #e0e0e0; */
    position: relative;
    height: 100%;
  }
  /* .contextmenu {
    position: absolute;
    top: 100px;
    left: 400px;
    cursor:context-menu;
    user-select: none;
  } */
</style>
