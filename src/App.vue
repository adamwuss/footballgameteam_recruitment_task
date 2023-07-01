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
}

body {
  padding: 40px;
  background: #F2F2F2;
  height: 100vh;
}
</style>
