<template>
  <div class="gallery">
    <h1 class="title">Gallery</h1>
    <div class="cards-list">
      <card v-for="item in items" :key="item.id" :item="item"></card>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Card from './Card'

export default {
  name: 'Gallery',
  data () {
    return {
    }
  },
  components: {
    Card
  },
  computed: {
    ...mapGetters([
      // 'contract',
      'items'
    ])
  },
  mounted: () => {
    console.log(this.contract)
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
