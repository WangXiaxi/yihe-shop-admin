import request from '@/utils/request'

// 首页
export function list(params) {
  return request({
    url: '/service/getSystemData',
    method: 'get',
    params
  })
}
