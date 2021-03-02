
export default {
  namespaced: true, // 启用命名空间
  state: {
    projectList: []
  },
  mutations: {
    saveProjectList (state, data) {
      state.projectList = data
    }
  },
  actions: {}
}
