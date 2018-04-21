<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'easybi'
  }
</script>

<style>
  /* CSS */
  #app {
    height: 100%;
  }

  body { 
    font-family: sans-serif;
    height: 100%;
    margin: 0;
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
  }

  html {
    height: 100%;
  }
</style>
