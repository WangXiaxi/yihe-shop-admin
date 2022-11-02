import request from '@/utils/request'

// 获取规格列表
export function list(params) {
  return request({
    url: '/service/getCostPointList',
    method: 'get',
    params
  })
}
export function edit(data) {
  return request({
    url: '/service/editCostpointGoods',
    method: 'post',
    data
  })
}

// 删除规格
export function dele(data) {
  return request({
    url: '/service/delCostpointGoods',
    method: 'post',
    data
  })
}

