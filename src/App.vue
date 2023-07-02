<template>
  <TheHome />
</template>

<script>
import TheHome from './components/TheHome.vue'

export default {
  name: 'App',
  components: {
    TheHome,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #F2F2F2;
  height: 100vh;

  @media screen and (min-width: 480px) {
    padding: 40px;
  }
}
</style>
