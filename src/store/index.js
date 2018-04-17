import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  getters: {
    items: state => state.items
  },
  mutations: {
    setItems: (state, payload) => { state.items = payload }
  }
})
