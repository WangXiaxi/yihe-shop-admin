import request from '@/utils/request'

// 获取会员列表
export function list() {
  return request({
    url: '/service/getSystemUserList',
    method: 'get'
  })
}
// 获取详情
export function getDetail() {
  return request({
    url: '/service/getSystemUserByID',
    method: 'get'
  })
}
// 编辑会员
export function edit() {
  return request({
    url: '/service/editSystemUser',
    method: 'post'
  })
}
