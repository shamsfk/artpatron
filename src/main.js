import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import getContract from './getContract'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  created: async () => {
    // let contract = await getContract()
  }
})
