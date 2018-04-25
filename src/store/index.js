import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    items: [],
    authors: [],
    holders: []
  },
  getters: {
    web3: state => state.web3,
    items: state => state.items,
    authors: state => state.authors,
    holders: state => state.holders
  },
  mutations: {
    setWeb3: (state, payload) => { state.web3 = payload },

    setItems: (state, payload) => { state.items = payload },
    changeItem: (state, payload) => { Vue.set(state.items, payload.id, payload) },

    setAuthors: (state, payload) => { state.authors = payload },
    changeAuthor: (state, payload) => { Vue.set(state.authors, payload.id, payload) },

    setHolders: (state, payload) => { state.holders = payload },
    changeHolder: (state, payload) => { Vue.set(state.holders, payload.id, payload) }
  }
})
