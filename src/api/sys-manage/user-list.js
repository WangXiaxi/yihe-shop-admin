import request from '@/utils/request'

// 获取管理员列表
export function list(params) {
  return request({
    url: '/service/getAdminList',
    method: 'get',
    params
  })
}
// 获取详情
export function getDetail(params) {
  return request({
    url: '/service/getAdminInfoByID',
    method: 'get',
    params
  })
}
// 编辑管理员
export function edit(data) {
  return request({
    url: '/service/editAdminInfo',
    method: 'post',
    data
  })
}

// 删除管理员
export function dele(data) {
  return request({
    url: '/service/delAdminInfo',
    method: 'post',
    data
  })
}
