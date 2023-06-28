<template>
 <div class="the-home">
   <TheTable />
 </div>
</template>

<script>
import TheTable from './TheTable.vue'
export default {
  name: 'TheHome',
  components: {
    TheTable,
  },
}
</script>

<style scoped lang="scss">
.the-home {
  padding: 20px;
}
</style>
