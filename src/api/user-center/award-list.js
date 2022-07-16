import request from '@/utils/request'

// 获取会员列表
export function list(params) {
  return request({
    url: '/service/getUserIncomeList',
    method: 'get',
    params
  })
}