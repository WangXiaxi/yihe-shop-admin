import request from '@/utils/request'

// 获取orders
export function list(params) {
  return request({
    url: '/mq/truck/status',
    method: 'GET',
    params
  })
}

// 车辆任务
export function getCurTask(params) {
  return request({
    url: '/truck/task',
    method: 'GET',
    params
  })
}

// 查询清单明细
export function getCurLoad(params) {
  return request({
    url: '/truck/load',
    method: 'GET',
    params
  })
}

// 查询清单明细
export function punch(data) {
  return request({
    url: '/truck/punch',
    method: 'POST',
    data
  })
}

// 车辆推送
export function pushTask(params) {
  return request({
    url: 'msg/punch',
    method: 'GET',
    params
  })
}

// 解锁车辆调整单查询
export function getAdjustList(params) {
  return request({
    url: 'adjust/list',
    method: 'GET',
    params
  })
}

// 解锁车辆
export function rollback(params) {
  return request({
    url: 'adjust/rollback',
    method: 'GET',
    params
  })
}
