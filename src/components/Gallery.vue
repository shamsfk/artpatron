<template>
  <div class="gallery">
    <h1 class="title">Gallery</h1>
    <div class="cards-list">
      <card v-for="item in items" :key="item.id" :item="item"></card>
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Gallery',
  data () {
    return {
      items: [
        {
          id: '1',
          title: 'First item',
          image: 'http://blog.art.com/artwiki/wp-content/uploads/2014/05/claude-monet-tulip-fields-impressionism-art-print.jpg'
        },
        {
          id: '2',
          title: 'Second item',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy3RXtzMQWOw2ViB_7mXfxNx2VCknLD_zMRiDlWaOg3PaCeWxz'
        },
        {
          id: '3',
          title: 'Third item',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJqyqXxjmK6q7WyfU1by7wzltrE3QkPGHXHTu7gUiR-8WPHD31'
        },
        {
          id: '4',
          title: 'First item',
          image: 'http://blog.art.com/artwiki/wp-content/uploads/2014/05/claude-monet-tulip-fields-impressionism-art-print.jpg'
        },
        {
          id: '5',
          title: 'Second item',
          image: 'http://blog.art.com/artwiki/wp-content/uploads/2014/05/claude-monet-tulip-fields-impressionism-art-print.jpg'
        },
        {
          id: '6',
          title: 'Second item',
          image: 'http://blog.art.com/artwiki/wp-content/uploads/2014/05/claude-monet-tulip-fields-impressionism-art-print.jpg'
        }
      ]
    }
  },
  components: {
    Card
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
