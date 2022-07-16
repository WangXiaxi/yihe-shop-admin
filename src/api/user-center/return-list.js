import request from '@/utils/request'

// getUserRebuyList
export function list(params) {
  return request({
    url: '/service/getUserRebuyList',
    method: 'get',
    params
  })
}