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
  apiKey: process.env.VUE_APP_API_OWL_KEY,
  uploadHost: `${process.env.VUE_APP_API_HOST}/api/logs/store`
})

Vue.use(sdk)
