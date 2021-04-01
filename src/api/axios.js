import axios from 'axios'
import { Message } from 'element-ui'

// axios 配置
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.VUE_APP_API_HOST

// 对响应数据进行处理
axios.interceptors.response.use(function (response) {
  return response.data.data
}, function (error) {
  let message = error.message
  if (error.response && error.response.data) {
    const resError = error.response.data
    message = resError.message
  }
  Message.error(message)
  return Promise.reject(error)
})

export default axios
