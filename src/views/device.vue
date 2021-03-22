<template>
  <div>
    <el-button @click="run1"> vue内部错误</el-button>
    <el-button @click="run">  template 内部错误</el-button>
    <el-button @click="run3"> http请求错误</el-button>
    <el-button @click="run4"> 函数错误</el-button>
    <el-button @click="run5"> promise</el-button>
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
      this.a.forEach()
    },
    run5 () {
      return Promise.reject(123)
    }
  }
}
</script>

<style scoped>

</style>
