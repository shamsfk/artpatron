<template>
  <div class="admin">
    <h1 class="title">Admin Panel</h1>
    <div class="admin-block">
      <h3>Stats</h3>
      Authors: <strong>0</strong> &nbsp;
      Holders: <strong>0</strong> &nbsp;
      Items: <strong>0</strong> &nbsp;
    </div>

    <div class="admin-block">
      <h3>Add Author</h3>
      <input type="text" v-model="authorName">
      <input type="date" v-model="authorBirthDate">
      <button :disabled="authorDisabled">Add Author</button>
    </div>

    <div class="admin-block">
      <h3>Add Holder</h3>
      <input type="text" v-model="holderName">
      <input type="number" v-model="holderCountryId">
      <button :disabled="holderDisabled">Add Holder</button>
    </div>

    <div class="admin-block">
      <h3>Add Item</h3>
      <input type="text" v-model="itemName">
      <input type="number" v-model="itemAuthorId">
      <input type="number" v-model="itemHolderId">
      <input type="date" v-model="itemCreationDate">
      <button :disabled="itemDisabled">Add Item</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data: function () {
    return {
      authorName: '',
      authorBirthDate: '',
      holderName: '',
      holderCountryId: '',
      itemName: '',
      itemAuthorId: '',
      itemHolderId: '',
      itemCreationDate: ''
    }
  },
  computed: {
    authorDisabled: function () {
      if (this.authorName === '' || this.authorBirthDate === '') {
        return true
      }
      return false
    },
    holderDisabled: function () {
      if (this.holderName === '' || this.holderCountryId === '') {
        return true
      }
      return false
    },
    itemDisabled: function () {
      if (
        this.itemName === '' ||
        this.itemAuthorId === '' ||
        this.itemHolderId === '' ||
        this.itemCreationDate === ''
      ) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.admin {
  margin: auto;
  margin-top: 100px;
}

.admin-block {
  margin-bottom: 4em;
}
</style>
