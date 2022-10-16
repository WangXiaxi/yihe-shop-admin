import { login, getInfo } from '@/api/login'
import util from '@/utils/auth'
import { cloneDeep } from 'lodash'
import routerJson from '../../router/router'

const user = {
  state: {
    token: util.getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: {},
    userInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 保存头像
    SaveAvatar({ commit }, avatar) {
      localStorage.setItem('hw-admin-avatar', avatar)
      commit('SET_AVATAR', avatar)
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          util.setToken(res.adminToken)
          commit('SET_TOKEN', res.adminToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
       getInfo().then(res => {
          commit('SET_USERINFO', res)
          commit('SET_NAME', res.admin_name)
          const user = { avatar: localStorage.getItem('hw-admin-avatar') } // res.user

          const permissions = {}
          res.permission.filter(c => c.type).map(c => {
            permissions[c.right] = true
          })

          const avatar = !user.avatar ? require('@/assets/images/boy.png') : user.avatar
          commit('SET_PERMISSIONS', permissions)
          commit('SET_ROLES', ['ROLE_DEFAULT'])
          commit('SET_AVATAR', avatar)

          // 路由过滤
          const baseRes = cloneDeep(routerJson)
          const allMenu = baseRes.data
          const needMenu = res.permission.filter(c => c.type === '0')

          // 过滤掉不需要路由
          const calle = (li) => {
            return li.filter(c => {
              const need = needMenu.find(j => j.right === c.name)
              if (need) {
                c.children = c.children && calle(c.children)
              }
              return need
            })
          }
          baseRes.data = calle(allMenu)
          resolve(baseRes)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          util.removeToken()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        util.removeToken()
        resolve()
      })
    }
  }
}

export default user
