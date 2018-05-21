<template>
  <div class="admin">
    <h1 class="title">Admin Panel</h1>
    <div class="admin-block">
      <h3>Stats</h3>
      Authors: <strong>{{authors.length}}</strong> &nbsp;
      Museums: <strong>{{museums.length}}</strong> &nbsp;
      Items: <strong>{{items.length}}</strong> &nbsp;
    </div>

    <div class="admin-block">
      <h3>Add Author</h3>
      <div class="admin-block-input">
        <label for="authorName">Author's name &nbsp;</label>
        <input type="text" name="authorName" v-model="authorName" placemuseum="Monet">
      </div>

      <div class="admin-block-input">
        <label for="authorBirthDate">Author's birth date &nbsp;</label>
        <input type="date" name="authorBirthDate" v-model="authorBirthDate">
      </div>

      <button :disabled="authorDisabled" @click="addAuthor">Add Author</button>
    </div>

    <div class="admin-block">
      <h3>Add Museum</h3>
      <div class="admin-block-input">
        <label for="museumName">Museum's name &nbsp;</label>
        <input type="text" name="museumName" v-model="museumName" placemuseum="Tretyakivskay gallery">
      </div>

      <div class="admin-block-input">
        <label for="museumCountryId">Museum's country id &nbsp;</label>
        <input type="number" name="museumCountryId" v-model="museumCountryId" placemuseum="7">
      </div>

      <button :disabled="museumDisabled" @click="addMuseum">Add Museum</button>
    </div>

    <div class="admin-block">
      <h3>Add Item</h3>
      <div class="admin-block-input">
        <label for="itemName">Item's name &nbsp;</label>
        <input type="text" name="itemName" v-model="itemName" placemuseum="Some item">
      </div>

      <div class="admin-block-input">
        <label for="itemAuthorId">Item's author id &nbsp;</label>
        <input type="number" name="itemAuthorId" v-model="itemAuthorId" placemuseum="3">
      </div>

      <div class="admin-block-input">
        <label for="itemMuseumId">Item's museum id &nbsp;</label>
        <input type="number" name="itemHoderId" v-model="itemMuseumId" placemuseum="5">
      </div>

      <div class="admin-block-input">
        <label for="itemCreationDate">Item's creation date &nbsp;</label>
        <input type="date" name="itemCreationDate" v-model="itemCreationDate">
      </div>

      <button :disabled="itemDisabled" @click="addItem">Add Item</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import getContract from '../getContract'

export default {
  name: 'Admin',
  data: function () {
    return {
      authorName: '',
      authorBirthDate: '',
      museumName: '',
      museumCountryId: '',
      itemName: '',
      itemAuthorId: '',
      itemMuseumId: '',
      itemCreationDate: '',
      contract: 0
    }
  },
  methods: {
    addAuthor: async function () {
      try {
        await this.contract.AddAuthor(this.authorName, Date.parse(this.authorBirthDate))
      } catch (err) {
        console.log('Adding Author failed with error:\n', err)
      }
    },
    addMuseum: async function () {
      try {
        await this.contract.AddMuseum(this.museumName, this.museumCountryId)
      } catch (err) {
        console.log('Adding Museum failed with error:\n', err)
      }
    },
    addItem: async function () {
      try {
        await this.contract.AddItem(
          this.itemName,
          Date.parse(this.itemCreationDate),
          this.itemAuthorId,
          this.itemMuseumId
        )
      } catch (err) {
        console.log('Adding Item failed with error:\n', err)
      }
    }
  },
  computed: {
    ...mapGetters([
      'web3',
      'items',
      'authors',
      'museums'
    ]),
    authorDisabled: function () {
      if (this.authorName === '' || this.authorBirthDate === '') {
        return true
      }
      return false
    },
    museumDisabled: function () {
      if (this.museumName === '' || this.museumCountryId === '') {
        return true
      }
      return false
    },
    itemDisabled: function () {
      if (
        this.itemName === '' ||
        this.itemAuthorId === '' ||
        this.itemMuseumId === '' ||
        this.itemCreationDate === ''
      ) {
        return true
      }
      return false
    }
  },
  created: async function () {
    let contract = await getContract()
    this.contract = contract
  }
}
</script>

<style lang="scss" scoped>
.admin {
  margin: auto;
  margin-top: 100px;
}

.admin-block {
  margin: 0 auto 3em auto;
  width: 50%;
  min-width: 480px;
  text-align: left;
}

.admin-block-input {
  margin-block-end: .5rem;
}

</style>
