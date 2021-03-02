import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ElementUI from 'element-ui'
import './style/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

import Raven from 'raven-js'


// @ts-ignore
import RavenVue from 'raven-js/plugins/vue'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Raven
  .config('https://08dc77f2b5dd42e490be150ad705ddd@sentry.io/123456')
  .addPlugin(RavenVue, Vue)
  .install()
  .config('http://127.0.0.1:7001/file')
Raven.setTransport(function (option) {
  axios.post('http://127.0.0.1:7001/api/log/store', { appName: 'owl-view', ...option.data })
  option.onSuccess()
})
