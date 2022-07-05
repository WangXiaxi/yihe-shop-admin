import request from '@/utils/request'

// 获取会员列表
export function list(data) {
  return request({
    url: '/service/getSystemWithdrawList',
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

