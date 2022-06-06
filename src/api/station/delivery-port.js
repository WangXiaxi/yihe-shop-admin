import request from '@/utils/request'

// 获取站点
export function siteList(params) {
  return request({
    url: '/site/siteList',
    method: 'GET',
    params
  })
}

// 更新站点
export function updateSite(data) {
  return request({
    url: '/site/save',
    method: 'POST',
    data
  })
}
