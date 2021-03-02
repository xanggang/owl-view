
const stack = []
const globalModule = {
  namespaced: true, // 启用命名空间
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING (state, bool) {
      state.loading = bool
    }
  },
  actions: {
    // 在同事触发多个loading的时候， 只有最后一个响应结束后在触发loading效果
    changeLoading ({ commit, state }, boolean) {
      if (boolean) {
        stack.push(true)
        if (!state.loading) {
          commit('SET_LOADING', true)
        }
      } else {
        stack.unshift()
        if (!stack.length) {
          commit('SET_LOADING', false)
        }
      }
    },
    closeAllLoading ({ commit }) {
      commit('SET_LOADING', false)
      stack.length = 0
    }
  }
}

export default globalModule
