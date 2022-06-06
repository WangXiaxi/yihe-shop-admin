import request from '@/utils/request'

// 华为异常查询
export function list(params) {
  return request({
    url: '/error/list',
    method: 'GET',
    params
  })
}
