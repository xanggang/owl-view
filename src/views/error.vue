<template>
  <div>
    <div class="tip">点击按钮触发错误</div>
    <el-button @click="run1">api请求错误</el-button>
    <el-button @click="run2">vue内部错误</el-button>
    <el-button @click="run3">promise</el-button>
    <el-button>vue 模版错误</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'error',
  methods: {
    run1 () {
      axios.post({
        url: 'www.001.com',
        data: {
          a: 1
        },
        headers: {
          code: 1000
        }
      })
    },
    run2 () {
      this.a()
    },
    run3 () {
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject(12333)
    }
  }
}
</script>

<style scoped>

.tip {
  margin-bottom: 20px;
  font-weight: 400;
}
</style>
