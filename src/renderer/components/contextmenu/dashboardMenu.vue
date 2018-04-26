<template>
  <div class="dashboardmenu">
    <div class="addChart">新增图表</div>
    <hr>
    <div class="placeholder">占位符</div>
    <div class="placeholder">占位符</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
  .dashboardmenu {
    font-size: 16px;
    width: 190px;
    border: 1px solid #dadada;
    box-shadow: 2px 2px 2px #8f8f8f;
    background: #fAfAfA;
  }

  .dashboardmenu>div {
    margin: 2px 0;
    padding-left: 10px;
  }

  .dashboardmenu>hr {
    background-color: #c0c0c0;
    margin: 0 1px;
    height: 1px;
    width: calc(100% - 2px);
    border: none;
    /* border-bottom-style: solid; */
    /* border-bottom-width: 1px; */
  }

  .dashboardmenu>div:hover {
    background: #f0f0f0;
  }

  .addChart::before {
    margin-right: 4px;
    font-family: "Font Awesome 5 Free";
    font-weight: 600;
    content: "\f055";
  }

  .placeholder::before {
    margin-right: 4px;
    font-family: "Font Awesome 5 Free";
    font-weight: 600;
    content: "\f118";
  }
</style>
