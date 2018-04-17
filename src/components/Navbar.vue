<template>
  <nav class="navbar">
    <div class="navbar-group">
      <router-link class="navbar-item navbar-brand" to="/">
        <span><strong>Art Patron </strong>Foundation</span>
      </router-link>
    </div>
    <div class="navbar-group">
      <router-link class="navbar-item menu" to="/gallery">
        Gallery
      </router-link>
      <router-link class="navbar-item menu" to="/authors">
        Authors
      </router-link>
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
    </div>
  </nav>
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  background-color: white;
}

.navbar-brand span {
  text-align: left;
  font-size: 1.5rem;
  padding-left: 0.5rem;
}

.navbar-group {
  width: auto;
  display: flex;
  padding-right: 0.5rem;
}

.navbar-item {
  color: #363636;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.5rem;
}

.navbar-item:hover {
  color: #b66ce7;
}

.router-link-active.menu {
  border-bottom: 3px solid #b66ce7;
}
</style>
