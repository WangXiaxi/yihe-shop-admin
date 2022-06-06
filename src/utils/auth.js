
const util = {
}

/**
 * @description 获取token
 */
util.getToken = function () {
  return localStorage.getItem('hw-token') // 'admin-token-666' //
}

/**
 * @description 保存token
 * @param {String} token
 */
util.setToken = function (token) {
  localStorage.setItem('hw-token', token)
}

/**
 * @description 清除token
 */
util.removeToken = function () {
  localStorage.removeItem('hw-token')
}

export default util
