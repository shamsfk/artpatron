<template>
  <div class="gallery">
    <h1 class="title">Gallery</h1>
    <div class="cards-list">
      <item-card v-for="item in items" :key="item.id" :item="item"></item-card>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ItemCard from './ItemCard'

export default {
  name: 'ItemsGallery',
  data () {
    return {
    }
  },
  components: {
    ItemCard
  },
  computed: {
    ...mapGetters([
      'items',
      'authors',
      'museums'
    ])
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  margin: auto;
  margin-top: 100px;
}

.title {
  margin-bottom: 1rem;
}

.cards-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
</style>
