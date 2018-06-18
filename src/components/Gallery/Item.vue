<template>
  <div class="item" v-if="itemsReady">
    <h1 class="header">
      {{ item.name }}
    </h1>
    <div class="image">
      <img :src="itemImage" alt="Plac emuseum image">
    </div>

    <div class="content">
      <router-link :to="itemLink">
        <img class="museumimg" src="https://bulma.io/images/placeholders/96x96.png" alt="Place museum image" title="Tretyakovskaya gallery">
        <div class="museumtitle">
          Hermitage
        </div>
      </router-link>
      <router-link class="author" :to="itemLink">
        Monet
      </router-link>

      <div class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
        <div class="patron">
          <div>Patron: <strong>Anonymous</strong></div>
          <!-- <div>Sience: <strong>10/04/18</strong></div> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ItemsGallery',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'items'
    ]),
    item: function () {
      return this.items[this.$route.params.item]
    },
    itemsReady: function () {
      return this.items.length > this.$route.params.item
    },
    itemLink: function () {
      return '/gallery/' + this.item.id
    },
    itemImage: function () {
      return '/static/images/items/' + this.item.id + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin: auto;
  margin-top: 100px;
}
.header {
  margin-bottom: 1rem;
}

.content {
  margin: auto;
  padding: 1.5rem;
  // padding-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.museumimg {
  display: inline;
  max-height: 48px;
  max-width: 48px;
  padding: 0;
  padding-top: 0.1rem;
}
.museumtitle {
  text-decoration: none;
  display: inline;
  padding: 0;
  padding-top: 0.1rem;
}

.author {
  width: 100%;
  word-break: break-word;
  margin: 0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
}

.description {
  width: 100%;
}

.card-patron {
  padding-top: 1rem;
}
</style>
