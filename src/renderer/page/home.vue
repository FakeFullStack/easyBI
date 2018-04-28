<template>
  <div class="home" @click="contextmenuShow=false">
    <div style="height: 30px;"></div>
    <el-tabs v-model="activeTab" type="border-card" tabPosition="left" style="height: calc(100% - 32px);">
      <el-tab-pane name="dashboard">
        <span slot="label"><i class="fas fa-chart-bar fa-lg" title="仪表盘"></i></span>
          <dashboard :visual="visuals" ref="dashboard" @dashboard="dashboard">
            <mcontextmenu v-show="contextmenuShow" :x="menuX" :y="menuY" :menus="menus" @contextmenu="contextmenuEvent"></mcontextmenu>
          </dashboard>
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

import mcontextmenu from '../components/contextmenu/mcontextmenu'

export default {
  components: {
    dashboard,
    mcontextmenu
  },
  data () {
    return {
      activeTab: 'dashboard',

      menus: [
        {label: '增加图表', FontAwesomeName: 'plus-circle', event: 1},
        {label: 'hr'},
        {label: '测试', FontAwesomeName: 'plus-circle', event: 2},
        {label: '测试', FontAwesomeName: 'plus-circle', event: 3}
      ],
      menuX: 0,
      menuY: 0,
      contextmenuShow: true,
      container: null
    }
  },
  methods: {
    contextmenuEvent (arg) {
      if (arg === 1) {
        this.$store.commit('addChart', [{
          name: '📊',
          type: 'ybar',
          isedit: true,
          outline: [300, 300, 50, 50],
          data: [['食物', '🍕', '🍔', '🍟', '🌭'], ['数量', 35, 54, 13, 60]]
        }])
      }
    },
    dashboard (arg) {
      if (arg[0] === 'mdel') {
        this.$store.commit('removeChart', {
          index: arg[1]
        })
      }
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
      this.$store.commit('addChart', [{
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
      }])

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
