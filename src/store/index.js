import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user-info'))
  },
  mutations: {
    userChange (state, data) {
      Object.assign(state.user, data)
      window.localStorage.setItem('user-info', JSON.stringify(state.user))
    }
  }
})
export default store
