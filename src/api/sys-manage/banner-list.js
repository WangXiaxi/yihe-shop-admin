import request from '@/utils/request'

// 获取规格列表
export function list(params) {
  return request({
    url: '/service/getBannerList',
    method: 'get',
    params
  })
}

// 编辑规格
export function edit(data) {
  return request({
    url: '/service/editBannerList',
    method: 'post',
    data
  })
}

// 删除规格
export function dele(data) {
  return request({
    url: '/service/delBannerByID',
    method: 'post',
    data
  })
}
