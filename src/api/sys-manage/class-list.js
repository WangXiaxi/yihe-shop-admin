import request from '@/utils/request'

// 获取规格列表
export function getCategoryList(params) {
  return request({
    url: '/service/getCategoryList',
    method: 'get',
    params
  })
}

// 获取规格列表
export function edit(data) {
  return request({
    url: '/service/editCategoryByID',
    method: 'post',
    data
  })
}

// 获取规格列表
export function dele(data) {
  return request({
    url: '/service/delCategoryByID',
    method: 'post',
    data
  })
}