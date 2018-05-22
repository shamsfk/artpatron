<template>
  <div class="navbar">

      <router-link class="navbar-brand" to="/">
        <strong>Art Patron </strong> Foundation
      </router-link>

    <nav class="menu">
      <router-link class="navbar-item menu" to="/gallery">
        Gallery
      </router-link>
      <!-- <router-link class="navbar-item menu" to="/authors">
        Authors
      </router-link> -->
      <router-link class="navbar-item menu" to="/museums">
        Museums
      </router-link>
      <router-link class="navbar-item menu" to="/how">
        How it works
      </router-link>
      <router-link class="navbar-item menu" to="/faq">
        FAQ
      </router-link>
      <router-link class="navbar-item menu" to="/profile">
        Profile
      </router-link>
    </nav>
  </div>

</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.navbar-brand {
  text-align: left;
  font-size: 1.4rem;
  color: #363636;
  text-decoration: none;
  white-space: nowrap;
  height: 100%;
  box-sizing: border-box;
  padding-left: 0.5rem;
  padding-top: 0.2rem;
  padding-bottom: 0.3rem;
}

.navbar-item {
  color: #363636;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  box-sizing: border-box;
}

.navbar-item:hover {
  color: #b66ce7;
}

.router-link-active.menu {
  border-bottom: 3px solid #b66ce7;
}
</style>
