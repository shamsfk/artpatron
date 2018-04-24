import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ArtPatronContract from '../ethereum/build/contracts/ArtPatron.json'
import Web3 from 'web3'
import truffleContract from 'truffle-contract'

Vue.config.productionTip = false

window.addEventListener('load', function () {
  var web3 = window.web3

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider.
    web3 = new Web3(web3.currentProvider)

    console.log('Injected web3 detected.')
  } else {
    // Fallback to localhost if no web3 injection. We've configured this to
    // use the development console's port by default.
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')

    web3 = new Web3(provider)

    console.log('No web3 instance injected, using Local web3.')
  }

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    render: h => h(App),
    store,
    created: async () => {
      store.commit('setWeb3', web3)

      const artPatron = truffleContract(ArtPatronContract)
      artPatron.setProvider(web3.currentProvider)
      let instance = await artPatron.deployed()

      console.log(instance)
      console.log(await instance.GetAuthorsLength())

      // await instance.AddAuthor('Monet', 5)
      // await instance.AddHolder('Museum', new BigNumber(7))
    }
  })
})
