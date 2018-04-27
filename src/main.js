import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import getContract from './getContract'
import contractUtils from '../ethereum/contractUtils'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  created: async () => {
    let contract = await getContract()

    await initAuthorsData(contract)
    await initHoldersData(contract)
    await initItemsData(contract)

    await initEvents(contract)
  }
})

async function initAuthorsData (contract) {
  let authors = []
  let authorsLength = await contract.GetAuthorsLength()

  for (let i = 0; i < authorsLength; i++) {
    let authorData = await contract.GetAuthorData(i)
    let authorObject = contractUtils.getAuhtorObject(authorData)
    authors.push(authorObject)
  }

  store.commit('setAuthors', authors)
}

async function initHoldersData (contract) {
  let holders = []
  let holderssLength = await contract.GetHoldersLength()

  for (let i = 0; i < holderssLength; i++) {
    let holderData = await contract.GetHolderData(i)
    let holderObject = contractUtils.getHolderObject(holderData)
    holders.push(holderObject)
  }

  store.commit('setHolders', holders)
}

async function initItemsData (contract) {
  let items = []
  let itemsLength = await contract.GetItemsLength()

  for (let i = 0; i < itemsLength; i++) {
    let itemData = await contract.GetItemData(i)
    let itemObject = contractUtils.getItemObject(itemData)
    items.push(itemObject)
  }

  store.commit('setItems', items)
}

async function initEvents (contract) {
  let addAuthorEvent = contract.AuthorAdded()
  addAuthorEvent.watch(async function (err, result) {
    if (err) {
      console.log(err)
    } else {
      let id = result.args.authorId.toNumber()

      let obj = await contract.GetAuthorData(id)
      let newAuthor = contractUtils.getAuhtorObject(obj)

      // Check if id is not already on the list
      if (id >= store.state.authors.length) {
        store.commit('changeAuthor', newAuthor)
      }
    }
  })

  let addHolderEvent = contract.HolderAdded()
  addHolderEvent.watch(async function (err, result) {
    if (err) {
      console.log(err)
    } else {
      let id = result.args.holderId.toNumber()

      let obj = await contract.GetHolderData(id)
      let newHolder = contractUtils.getHolderObject(obj)

      // Check if id is not already on the list
      if (id >= store.state.holders.length) {
        store.commit('changeHolder', newHolder)
      }
    }
  })

  let addItemEvent = contract.ItemAdded()
  addItemEvent.watch(async function (err, result) {
    if (err) {
      console.log(err)
    } else {
      let id = result.args.itemId.toNumber()

      let obj = await contract.GetItemData(id)
      let newItem = contractUtils.getItemObject(obj)

      // Check if id is not already on the list

      if (id >= store.state.items.length) {
        store.commit('changeItem', newItem)
      }
    }
  })
}
