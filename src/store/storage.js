/**
 * @description state在本地缓存中的操作
 */

import store from './index'

/**
 * @description 初始化localStorage
 */
function _initLocalFun (type) {
  let state = ''
  try {
    state = JSON.parse(localStorage.getItem(type))
  } catch (error) {
    state = localStorage.getItem(type)
  }
  state && store.commit(type, state)
}

// 需要缓存在local的Mutation
const localMutationTypes = []

/**
 * @description 从缓存中初始化 state
 */
export function initStateFromStorage () {
  localMutationTypes.forEach(item => {
    _initLocalFun(item)
  })
}

/**
 * @description 清除session缓存
 */
export function removeSession () {
  localMutationTypes.forEach(item => {
    sessionStorage.removeItem(item)
  })
}

/**
 * @description 清除local缓存
 */
export function removeLocal () {
  localMutationTypes.forEach(item => {
    localStorage.removeItem(item)
  })
}
