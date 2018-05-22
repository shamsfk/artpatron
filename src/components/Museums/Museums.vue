<template>
  <div class="gallery">
    <h1 class="title">Museums</h1>
    <div class="cards-list">
      <museum-card v-for="museum in museums" :key="museum.id" :museum="museum"></museum-card>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MuseumCard from './MuseumCard'

export default {
  name: 'Museums',
  data () {
    return {
    }
  },
  components: {
    MuseumCard
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
