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
  components: { container },
  mounted () {
    this.$notify({
      title: '提示',
      dangerouslyUseHTMLString: true,
      message: '<strong>前往查看博客 <a href="http://blog.lynn.cool">http://blog.lynn.cool</a></strong>',
      duration: 0
    })
  }
}

</script>
<style lang="less" scoped>

  #app {
    height: 100vh;
    background-color: #f0f2f5;
  }
</style>
