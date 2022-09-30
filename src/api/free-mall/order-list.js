import request from '@/utils/request'

// 获取商品列表
export function list(data) {
  return request({
    url: '/service/getSystemOrderList',
    method: 'post',
    data
  })
}

// 获取订单详情
export function getDetail(params) {
  return request({
    url: '/service/getSystemOrderByID',
    method: 'get',
    params
  })
}

// 获取地址
export function getAreas() {
  return request({
    url: '/service/getAreas',
    method: 'get'
  })
}

// 编辑订单
export function editUserOrder(data) {
  return request({
    url: '/service/editUserOrder',
    method: 'post',
    data
  })
}

// 删除商品
export function dele(data) {
  return request({
    url: '/service/delOrderByID',
    method: 'POST',
    data
  })
}

// 发货记录
export function getDeliveryByOrderId(params) {
  return request({
    url: '/service/getDeliveryByOrderID',
    method: 'GET',
    params
  })
}

// 订单日志
export function getOrderLogByID(params) {
  return request({
    url: '/service/getOrderLogByID',
    method: 'GET',
    params
  })
}

// 订单作废
export function cancel(params) {
  return request({
    url: '/service/cancel',
    method: 'GET',
    params
  })
}

// 订单 支付等信息
export function updateUserOrder(data) {
  return request({
    url: '/service/updateUserOrder',
    method: 'POST',
    data
  })
}

// getFreightCompany
export function getFreightCompany(params) {
  return request({
    url: '/service/getFreightCompany',
    method: 'GET',
    params
  })
}
// 获取详情
export function reportSystemOrderList(params) {
  return request({
    url: '/service/reportSystemOrderList',
    method: 'get',
    params
  })
}
