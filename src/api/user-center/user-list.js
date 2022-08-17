import request from '@/utils/request'

// 获取会员列表
export function list(data) {
  return request({
    url: '/service/getSystemUserList',
    method: 'post',
    data
  })
}
// 获取详情
export function getDetail(params) {
  return request({
    url: '/service/getSystemUserByID',
    method: 'get',
    params
  })
}

export function getSystemVipInfo(params) {
  return request({
    url: '/service/getSystemVipInfo',
    method: 'get',
    params
  })
}
// 编辑会员
export function edit(data) {
  return request({
    url: '/service/editSystemUser',
    method: 'post',
    data
  })
}

// 删除管理员
export function dele(data) {
  return request({
    url: '/service/deleSystemUser',
    method: 'post',
    data
  })
}

export function handleSpecialUserOrder(data) {
  return request({
    url: '/service/handleSpecialUserOrder',
    method: 'post',
    data
  })
}

export function editSystemVipUser(data) {
  return request({
    url: '/service/editSystemVipUser',
    method: 'post',
    data
  })
}

