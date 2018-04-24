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
      <div class="admin-block-input">
        <label for="authorName">Author's name &nbsp;</label>
        <input type="text" name="authorName" v-model="authorName" placeholder="Monet">
      </div>

      <div class="admin-block-input">
        <label for="authorBirthDate">Author's birth date &nbsp;</label>
        <input type="date" name="authorBirthDate" v-model="authorBirthDate">
      </div>

      <button :disabled="authorDisabled">Add Author</button>
    </div>

    <div class="admin-block">
      <h3>Add Holder</h3>
      <div class="admin-block-input">
        <label for="holderName">Holder's name &nbsp;</label>
        <input type="text" name="holderName" v-model="holderName" placeholder="Tretyakivskay gallery">
      </div>

      <div class="admin-block-input">
        <label for="holderCountryId">Holder's country id &nbsp;</label>
        <input type="number" name="holderCountryId" v-model="holderCountryId" placeholder="7">
      </div>

      <button :disabled="holderDisabled">Add Holder</button>
    </div>

    <div class="admin-block">
      <h3>Add Item</h3>
      <div class="admin-block-input">
        <label for="itemName">Item's name &nbsp;</label>
        <input type="text" name="itemName" v-model="itemName" placeholder="Some item">
      </div>

      <div class="admin-block-input">
        <label for="itemAuthorId">Item's author id &nbsp;</label>
        <input type="number" name="itemAuthorId" v-model="itemAuthorId" placeholder="3">
      </div>

      <div class="admin-block-input">
        <label for="itemHolderId">Item's holder id &nbsp;</label>
        <input type="number" name="itemHoderId" v-model="itemHolderId" placeholder="5">
      </div>

      <div class="admin-block-input">
        <label for="itemCreationDate">Item's creation date &nbsp;</label>
        <input type="date" name="itemCreationDate" v-model="itemCreationDate">
      </div>

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
  margin: 0 auto 3em auto;
  width: 50%;
  min-width: 480px;
  text-align: left;
}

.admin-block-input {
  margin-block-end: .5rem;
}

</style>
