import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { getToken } from '@/utils/auth'
 
Vue.use(Vuex)

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store