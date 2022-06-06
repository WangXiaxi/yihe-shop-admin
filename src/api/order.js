import request from '@/utils/request'

// 获取orders
export function list(params) {
  return request({
    url: '/mq/order/list',
    method: 'GET',
    params
  })
}

// 批量修改订单
export function changeState(data) {
  return request({
    url: '/mq/order/changeState',
    method: 'POST',
    data
  })
}

// 批量创建订单
export function create(data) {
  return request({
    url: '/mq/order/create',
    method: 'POST',
    data
  })
}

// 查询投递口数据
export function siteList(params) {
  return request({
    url: '/mq/site/list',
    method: 'GET',
    params
  })
}
