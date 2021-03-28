<template>
  <div id="app">
    <container>
      <router-view/>
    </container>
  </div>
</template>

<script>
import container from '../src/components/container'
export default {
  name: 'App',
  components: { container }
}

</script>
<style lang="less" scoped>

  #app {
    height: 100vh;
    background-color: #f0f2f5;
  }
</style>
