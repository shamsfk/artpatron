import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  created: async () => {
    let res = await axios('static/data/Items.json')
    store.commit('setItems', res.data.items)
  }
})
