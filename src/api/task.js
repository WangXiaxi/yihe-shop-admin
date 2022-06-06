import request from '@/utils/request'

// 获取task
export function list(params) {
  return request({
    url: '/mq/load/list',
    method: 'GET',
    params
  })
}

// 获取task
export function orders(params) {
  return request({
    url: '/mq/load/orders',
    method: 'GET',
    params
  })
}

// 任务单发车动作
export function departure(data) {
  return request({
    url: '/mq/load/departure',
    method: 'POST',
    data
  })
}
