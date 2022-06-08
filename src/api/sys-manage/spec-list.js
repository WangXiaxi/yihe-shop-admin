import request from '@/utils/request'

// 获取规格列表
export function list(params) {
  return request({
    url: '/service/getSpecList',
    method: 'get',
    params
  })
}

// 编辑规格
export function edit(data) {
  return request({
    url: '/service/editSpecInfo',
    method: 'post',
    data
  })
}

// 删除规格
export function dele(data) {
  return request({
    url: '/service/delSpecInfo',
    method: 'post',
    data
  })
}
