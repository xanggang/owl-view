import axios from './axios'
const baseUrl = 'http://owl.lynn.cool'
// const baseUrl = ''
// 查询项目列表
export function getProjectList () {
  return axios.get(baseUrl + '/api/project/list')
}

// 根据项目查询时间段内的全部日志， 用于钉钉推送
export function getLogs (data) {
  return axios.post(baseUrl + '/api/project/getDay', data)
}

// 创建
export function createProject (data) {
  return axios.post(baseUrl + '/api/project/create', data)
}

// 删除项目
export function deleteProject (id) {
  return axios.delete(baseUrl + `/api/project/delete?id=${id}`)
}

// 错误列表
export function getLogList (data) {
  return axios.post(baseUrl + '/api/log/list', data)
}

// 错误详情
export function getLogDetail (params) {
  return axios.get(baseUrl + '/api/log/get', { params })
}

// 性能平均值
export function getPerformanceAvg (params) {
  return axios.get(baseUrl + '/api/logs/performanceAvg', { params })
}

// 设备分布
export function getDeviceStatistics (params) {
  return axios.get(baseUrl + '/api/logs/deviceStatistics', { params })
}

// 获取api错误
export function getApiErrorsStatistics (params) {
  return axios.get(baseUrl + '/api/logs/apiErrorsStatistics', { params })
}

