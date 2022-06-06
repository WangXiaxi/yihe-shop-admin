import request from '@/utils/request'

// 获取orders
export function list(params) {
  return request({
    url: '/orders',
    method: 'GET',
    params
  })
}

// 创建order
export function create(data) {
  return request({
    url: '/order/create',
    method: 'POST',
    data
  })
}

// 确认订单
export function confirm(params) {
  return request({
    url: '/order/confirm',
    method: 'GET',
    params
  })
}

// 装车确认
export function load(data) {
  return request({
    url: '/order/load',
    method: 'POST',
    data
  })
}

// 在途确认
export function transfer(params) {
  return request({
    url: '/order/transfer',
    method: 'GET',
    params
  })
}

// 卸货确认
export function unload(params) {
  return request({
    url: '/order/unload',
    method: 'GET',
    params
  })
}

// 配送确认
export function delivery(params) {
  return request({
    url: '/order/delivery',
    method: 'GET',
    params
  })
}

// 签收确认
export function sign(params) {
  return request({
    url: '/order/sign',
    method: 'GET',
    params
  })
}