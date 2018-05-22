<template>
  <div class="main">
    <div class="jumbo">
      <!-- <div class="jumbo-title">Art Patron Foundation</div> -->
      <router-link class="link" to="/gallery">
        <div class="jumbo-subtitle">PATRONIZE AND EARN</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main {
  margin: 0;
  padding: 0;
}

.jumbo {
  height: 100vh;
  background-color: white;
  background-image: url("/static/images/jumbo.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  // background-position: left top;
  background-position: center top;
  // filter: grayscale(20%) brightness(100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.jumbo-title {
  margin: 0;
  padding: 0;
  margin-top: 2rem;
  font-weight: 100;
  font-size: 3rem;
  color: white;
  height: auto;
  // text-shadow: 0px 0px 0px #000000;
  padding-right: 1rem;
}
.jumbo-subtitle {
  margin: 0;
  padding: 0;
  font-weight: 100;
  font-size: 2rem;
  color: white;
  height: auto;
  padding: 1rem;
  border: 0;
  // text-shadow: 1px 1px 0px #000000;
  background-color: #999999;
}
.link {
  text-decoration: none;
}
.jumbo-subtitle:hover {
  background-color: #b66ce7;
}
</style>
