import request from '@/utils/request'

// 银行卡
export function list(params) {
  return request({
    url: '/service/getBankCardList',
    method: 'get',
    params
  })
}