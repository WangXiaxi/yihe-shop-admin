import request from '@/utils/request'

// 获取商品列表
export function list() {
  return request({
    url: '/service/getSystemOrderList',
    method: 'get'
  })
}

// 获取订单详情
export function getDetail() {
  return request({
    url: '/service/getSystemOrderByID',
    method: 'get'
  })
}
