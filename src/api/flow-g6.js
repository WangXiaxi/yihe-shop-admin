import request from '@/utils/request'

// 添加node节点
export function addNode(data) {
  return request({
    url: '/line/add/zone',
    method: 'POST',
    data
  })
}

// 批量更新 园区
export function save(data) {
  return request({
    url: '/line/update/all',
    method: 'POST',
    data
  })
}
// 删除节点
export function deleNode(params) {
  return request({
    url: '/line/remove/zone',
    method: 'get',
    params
  })
}

// 获取初始节点
export function getBaseNodes() {
  return request({
    url: '/line/query/zones',
    method: 'GET'
  })
}

// 获取前端json
export function getBaselines() {
  return request({
    url: '/line/query/lines',
    method: 'GET'
  })
}

// 获取前端json
export function getSaveJson(data) {
  return request({
    url: 'line/query/html',
    method: 'GET'
  })
}

// 下载距离矩阵
export function distance() {
  return request({
    url: '/line/download/distance',
    responseType: 'blob',
    method: 'GET'
  })
}