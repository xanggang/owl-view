<template>
  <div>
    <el-button @click="run1"> vue内部错误</el-button>
    <el-button @click="run">  template 内部错误</el-button>
    <el-button @click="run3"> http请求错误</el-button>
    <el-button @click="run4"> 函数错误</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'device',
  methods: {
    run1 () {
      this.a()
    },
    run3 () {
      axios.get('http://127.0.0.1:8888/api/any')
    },
    run4 () {
      throw new Error('错误内容')
    }
  }
}
</script>

<style scoped>

</style>
