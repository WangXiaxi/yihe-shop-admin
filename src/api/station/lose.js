import request from '@/utils/request'

// 站点失效查询
export function invalidList(params) {
  return request({
    url: '/site/invalidList',
    method: 'GET',
    params
  })
}

// 保存失效站点路线
export function saveInvalid(data) {
  return request({
    url: '/site/saveInvalid',
    method: 'POST',
    data
  })
}
