<template>
  <div class="card">
    <div class="card-image">
      <router-link :to="itemLink">
        <img :src="itemImage" alt="Placemuseum image">
      </router-link>
    </div>

    <div class="card-content">
      <router-link :to="itemLink">
        <img src="https://bulma.io/images/placemuseums/96x96.png" alt="Place museum image" title="Tretyakovskaya gallery">
      </router-link>
      <div class="card-title">
        <router-link class="title" :to="itemLink">
          {{item.name}}
        </router-link>
        <router-link class="subtitle" :to="itemLink">
          Monet
        </router-link>
      </div>

      <div class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
        <div class="card-patron">
          <div>Patron: <strong>Anonymous</strong></div>
          <!-- <div>Sience: <strong>10/04/18</strong></div> -->
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <a href="#" class="card-footer-item  is-primary is-medium1">Become a Patron</a>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['item'],
  computed: {
    itemLink: function () {
      return '/gallery/' + this.item.id
    },
    itemImage: function () {
      return '/static/images/items/' + this.item.id + '.jpg'
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 360px;
  margin: 1rem;
  flex-grow: 1;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  position: relative;
  box-sizing: inherit;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card-image {
  display: block;
  position: relative;
  width: 100%;
  height: 280px;
}

.card-image img {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.card-content {
  padding: 1.5rem;
  // padding-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}

.card-content img {
  display: inline;
  max-height: 48px;
  max-width: 48px;
  padding: 0;
  padding-top: 0.1rem;
}

.card-title {
  align-items: flex-start;
  display: flex;
  text-align: left;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 1rem;
  margin-bottom: 0.75rem;
}

.title,
.subtitle {
  width: 100%;
  word-break: break-word;
  margin: 0;
  text-decoration: none;
}

.title {
  color: #363636;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.125;
}

.subtitle {
  font-size: 1rem;
  font-weight: 400;
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
}

.card-patron {
  padding-top: 1rem;
}

.card-footer {
  // border-top: 1px solid rgba(10, 10, 10, 0.1);
  background-color: #b66ce7;
  width: 100%;
}

.card-footer:hover {
  background-color: #ab64db;
}

.card-footer-item {
  align-items: center;
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  padding: 0.75rem;
}

a.card-footer-item {
  color: white;
  cursor: pointer;
  text-decoration: none;
}
</style>
