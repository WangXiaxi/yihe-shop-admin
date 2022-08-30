import request from '@/utils/request'

// 获取资源列表
export function list(params) {
  return request({
    url: '/service/getAdminRoleList',
    method: 'get',
    params
  })
}

// 添加
export function edit(data) {
  return request({
    url: '/service/editAdminRole',
    method: 'post',
    data
  })
}

// 删除
export function dele(data) {
  return request({
    url: '/service/delAdminRoleById',
    method: 'post',
    data
  })
}