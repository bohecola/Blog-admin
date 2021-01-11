import { login, logout, getInfo } from '@/api/user'
import { setToken, setUser, removeToken, removeUser } from '@/utils/auth'

export default {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const formData = {
      username: username.trim(),
      password: password,
      grant_type: process.env.VUE_APP_GRANT_TYPE,
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRECT
    }
    return new Promise((resolve, reject) => {
      login(formData).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {

        const { data } = response
  
        if(!data) {
          reject('getInfo: roles must be a non-null array!')
        }
  
        const { name, avatar, introduction } = data
        
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        setUser(data)
        resolve()
      })
    }).catch(error => {
      reject(error)
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUser()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })

  }
}