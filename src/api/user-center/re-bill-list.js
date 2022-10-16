import request from '@/utils/request'

// getSystemRefundmentList
export function list(params) {
  return request({
    url: '/service/getUserRefundmentList',
    method: 'get',
    params
  })
}

export function getRefundmentOrderDetail(params) {
  return request({
    url: '/service/getRefundmentOrderDetail',
    method: 'get',
    params
  })
}

export function updateRefundmentById(data) {
  return request({
    url: '/service/updateRefundmentById',
    method: 'post',
    data
  })
}