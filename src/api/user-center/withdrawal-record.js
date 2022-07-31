import request from '@/utils/request'

// 获取会员列表
export function list(data) {
  return request({
    url: '/service/getSystemWithdrawList',
    method: 'post',
    data
  })
}

export function dele(data) {
  return request({
    url: '/service/delSystemWithdrawByID',
    method: 'post',
    data
  })
}

export function withdrawBatchEdit(data) {
  return request({
    url: '/service/withdrawBatchEdit',
    method: 'post',
    data
  })
}