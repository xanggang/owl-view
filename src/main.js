import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LogSdkVue from 'owl-util-sdk/dist/plugins/vue'
// import LogSdkVue from './vue'

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

// const sdk = new LogSdkVue({
//   apiKey: '111',
//   uploadHost: 'http://localhost:7001/api/logs/store'
// })
//
// Vue.use(sdk)

// import * as Sentry from "@sentry/vue";
// import { Integrations } from "@sentry/tracing";
//
// Sentry.init({
//   Vue,
//   dsn: "https://47c286895da94996ae130d5c493dfe6d@o422336.ingest.sentry.io/5700174",
//   integrations: [new Integrations.BrowserTracing()],
//
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });
