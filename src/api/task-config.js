import request from '@/utils/request'

// 查询
export function frequency(params) {
  return request({
    url: '/mq/config/frequency',
    method: 'GET',
    params
  })
}

// save
export function save(data) {
  return request({
    url: '/mq/config/frequency',
    method: 'POST',
    data
  })
}
