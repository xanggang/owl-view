import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LogSdkVue from 'owl-util-sdk/dist/plugins/vue'

import ElementUI from 'element-ui'
import './style/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const sdk = new LogSdkVue({
  apiKey: '111',
  uploadHost: 'http://localhost:7001/api/logs/store'
})

Vue.use(sdk)
