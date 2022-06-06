import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/service/getAdminToken',
    method: 'POST',
    data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/service/getAdminInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return Promise.resolve({ status: 'success' })
}
