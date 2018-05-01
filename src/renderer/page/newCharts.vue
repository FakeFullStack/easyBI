<template>
  <div class="newcharts">
    <template v-for="(c, index) in charts">
      <el-card :key="index" :body-style="{ padding: '10px' }" class="card" shadow="hover">
        <img :src="c.url" :alt="c.label" class="img">
        <div style="padding: 5px; overflow: auto;">
          <span style="float: left; line-height: 40px;">{{c.label}}</span>
          <el-button type="text" class="button" @click="add(c.cfg)">添加</el-button>
        </div>
      </el-card>
      <!-- <div :key="index">{{c.url}} {{c.label}}</div> -->
    </template>
  </div>
</template>

<script>
import newcharts from '../js/newCharts/newCharts'
export default {
  data () {
    return {
      charts: newcharts.newCharts()
    }
  },
  methods: {
    add (arg) {
      let chart = {}
      Object.assign(chart, arg)
      // create the random index
      chart.index = newcharts.randomIndex()
      this.$store.commit('addChart', [chart])
      this.$emit('addChart')
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  }
}
</script>

<style scoped>
  .newcharts {
    position: relative;
    overflow: auto;
    user-select: none;
    /* height: 100%;
    width: 100%; */
  }

  .card {
    float: left;
    margin: 5px;
  }

  .img {
    /* width: 100%; */
    /* height: 140px; */
    height: 200px;
    display: block;
  }

  .button {
    float: right;
  }
</style>
