import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import util from '@/utils/auth'
import { handleTrim } from './handleTrim'
import store from '@/store'

let isReloginShow
// 创建一个错误
function errorCreat(msg) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}

// 记录和显示错误
function errorLog(err) {
  // 显示提示
  Message({
    message: err.message,
    type: 'error',
    duration: 2 * 1000,
    showClose: true
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 200000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  handleTrim(config)
  // 在请求发送之前做一些处理
  const token = util.getToken()
  if (token && token !== 'undefined') {
    config.headers['mock-token'] = token
  }

  if (config.method === 'get') {
    if (typeof config.params === 'string' || config.params === undefined) {
      config.params = {}
    }
    config.params['t'] = new Date().getTime()
  }
  return config
}, error => {
  // 发送失败
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data || {}
    if (response.request.responseType === 'blob') {
      return response
    }
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 status 进行判断
    if (code === undefined) {
      return Promise.reject('error')
    } else {
      // 有 status 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 200:
          return dataAxios
        case 10001:
        case 10002:
          if (!isReloginShow) {
            isReloginShow = true
            MessageBox.alert('登录状态已过期，请重新登录！', '系统提示', {
              confirmButtonText: '重新登录',
              showClose: false,
              type: 'warning',
              callback: () => {
                isReloginShow = false
                store.dispatch('LogOut').then(() => {
                  // 如果是登录页面不需要重新加载
                  window.location.href = '/'
                })
              }
            })
          }
          return Promise.reject('error')
        default:
          // 不是正确的 code
          errorCreat(`${dataAxios.msg}`)
          break
      }
    }
  },

  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    // if (error.response.status === 401) {
    //   // token失效
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
