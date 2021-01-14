import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { getToken, getUser } from '@/utils/auth'
 
Vue.use(Vuex)

let userInfo = getUser()

const state = {
  token: getToken(),
  name: userInfo === null ? userInfo : userInfo.name,
  avatar: userInfo === null ? userInfo : userInfo.avatar,
  introduction: userInfo === null ? userInfo : userInfo.introduction,
  user: userInfo
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store