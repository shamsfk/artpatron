<template>
  <div class="item" v-if="itemsReady">
    <h1 class="header">
      {{ item.name }}
      <router-link class="author" :to="itemLink">
        - Monet
      </router-link>
    </h1>
    <div class="image" :style="{ backgroundImage: `url('${itemImage}')` }">
      <!-- <img :src="itemImage" alt="Plac emuseum image"> -->
    </div>

    <div class="content">

     <div class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.

      </div>

      <router-link :to="itemLink">
        <img class="museumimg" src="https://bulma.io/images/placeholders/96x96.png" alt="Place museum image" title="Tretyakovskaya gallery">
        <div class="museumtitle">
          Hermitage
        </div>
      </router-link>

      <div class="patron">
          <div>Patron: <strong>Anonymous</strong></div>
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

.image {
  width: 100%;
  height: 50vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
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
  display: inline;
  padding: 0;
  padding-top: 0.1rem;
  margin-left: 1rem;
  font-size: 2rem;
}

a {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.author {
  margin: 0;
  text-decoration: none;
  color: #4a4a4a;
  display: inline;
  font-weight: 200;
}

.description {
  width: 100%;
  margin-bottom: 1rem;
}

.patron {
  width: 100%;
  margin-top: 1rem;
}
</style>
