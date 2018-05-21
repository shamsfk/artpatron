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
    await initMuseumsData(contract)
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

async function initMuseumsData (contract) {
  let museums = []
  let museumssLength = await contract.GetMuseumsLength()

  for (let i = 0; i < museumssLength; i++) {
    let museumData = await contract.GetMuseumData(i)
    let museumObject = contractUtils.getMuseumObject(museumData)
    museums.push(museumObject)
  }

  store.commit('setMuseums', museums)
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

  let addMuseumEvent = contract.MuseumAdded()
  addMuseumEvent.watch(async function (err, result) {
    if (err) {
      console.log(err)
    } else {
      let id = result.args.museumId.toNumber()

      let obj = await contract.GetMuseumData(id)
      let newMuseum = contractUtils.getMuseumObject(obj)

      // Check if id is not already on the list
      if (id >= store.state.museums.length) {
        store.commit('changeMuseum', newMuseum)
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
