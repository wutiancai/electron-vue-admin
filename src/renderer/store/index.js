import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
const mutations = {
  mutationsExecutionId (state, n) {
    state.executionId = (n)
  }
}
const store = new Vuex.Store({
  state: {
    executionId: "",
    pageLimit: 5,
    wbsocket: []
  },
  modules: {
    app,
    settings,
    user
  },
  getters,
  mutations
})

export default store
