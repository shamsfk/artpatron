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

  console.log('AUTHORS:\n', authors)
}

async function initHoldersData (contract) {
  let holders = []
  let holderssLength = await contract.GetHoldersLength()

  for (let i = 0; i < holderssLength; i++) {
    let authorData = await contract.GetHolderData(i)
    let authorObject = contractUtils.getHolderObject(authorData)
    holders.push(authorObject)
  }

  console.log('HOLDERS:\n', holders)
}

async function initItemsData (contract) {
  let items = []
  let itemsLength = await contract.GetItemsLength()

  for (let i = 0; i < itemsLength; i++) {
    let itemData = await contract.GetItemData(i)
    let itemObject = contractUtils.getItemObject(itemData)
    items.push(itemObject)
  }

  console.log('ITEMS:\n', items)
}

async function initEvents (contract) {
  let addAuthorEvent = contract.AuthorAdded()
  addAuthorEvent.watch(async function (err, result) {
    if (err) {
      console.log(err)
    } else {
      let id = result.args.authorId.toString()

      // Check if id is not in the list

      let obj = await contract.GetAuthorData(id)
      let newAuthor = contractUtils.getAuhtorObject(obj)
      console.log('Author Added:\n', newAuthor)
    }
  })

  let addHolderEvent = contract.HolderAdded()
  addHolderEvent.watch(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log('Holder Added, id:', result.args.holderId.toString())
    }
  })

  let addItemEvent = contract.ItemAdded()
  addItemEvent.watch(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log('Item, Added, id:', result.args.itemId.toString())
    }
  })
}
