import request from '@/utils/request'

// 丰循订单查询
export function list(params) {
  return request({
    url: '/delivery/list',
    method: 'GET',
    params
  })
}

// 丰循消息执行状态修改
export function update(data) {
  return request({
    url: '/delivery/update',
    method: 'POST',
    data
  })
}
