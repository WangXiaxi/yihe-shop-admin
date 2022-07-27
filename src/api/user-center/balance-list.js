import request from '@/utils/request'

// 版通积分
export function list(params) {
  return request({
    url: '/service/getUserAccountList',
    method: 'get',
    params
  })
}