import request from '@/utils/request'

// getUserXjqList
export function list(params) {
  return request({
    url: '/service/getUserXjqList',
    method: 'get',
    params
  })
}