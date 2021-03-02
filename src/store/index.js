import Vue from 'vue'
import Vuex from 'vuex'
import globalModule from './module/globalModule'
import projectModule from './module/project'
import { initStateFromStorage } from './storage'

Vue.use(Vuex)

/**
 * @description 订阅mutation，并将state缓存到本地
 * @param {*} store
 */
const storagePlugin = store => {
  // 当 store 初始化后调用
  store.subscribe(mutation => {
    localStorage.setItem(mutation.type, JSON.stringify(mutation.payload))
  })
}


export default new Vuex.Store({
  namespace: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    globalModule,
    project: projectModule
  },
  plugins: [storagePlugin]
})

initStateFromStorage()
