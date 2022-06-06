import request from '@/utils/request'

// 获取orders
export function zoneList(params) {
  return request({
    url: '/site/zoneList',
    method: 'GET',
    params
  })
}

// 更新园区
export function updateArea(data) {
  return request({
    url: '/site/saveZone',
    method: 'POST',
    data
  })
}
