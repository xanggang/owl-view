import axios from './axios'

// 查询项目列表
export function getProjectList () {
  return axios.get('/api/project/list')
}

// 根据项目查询时间段内的全部日志， 用于钉钉推送
export function getLogs (data) {
  return axios.post('/api/project/getDay', data)
}

// 创建
export function createProject (data) {
  return axios.post('/api/project/create', data)
}

// 删除项目
export function deleteProject (id) {
  return axios.delete(`/api/project/delete?id=${id}`)
}

// 错误列表
export function getLogList (data) {
  return axios.post('/api/log/list', data)
}

// 错误详情
export function getLogDetail (params) {
  return axios.get('/api/log/get', { params })
}

