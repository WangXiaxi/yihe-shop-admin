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
export function getDetail() {
  return request({
    url: '/service/getSystemOrderByID',
    method: 'get'
  })
}

// 获取地址
export function getAreas() {
  return request({
    url: '/service/getAreas',
    method: 'get'
  })
}
