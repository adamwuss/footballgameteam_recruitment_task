<template>
  <button class="the-button" @click="$emit('click')">
    <ThePlus />
    Add User
  </button>
</template>

<script>
import ThePlus from "@/components/icons/ThePlus.vue";
export default {
  name: "TheButton",
  components: {
    ThePlus,
  },
}
</script>

<style scoped lang="scss">

.the-button {
  padding: 10px 20px;
  background: green;
  color: white;
  border: none;
  border-radius: 20px;
  display: flex;
  gap: 5px;
  align-items: center;
  fill: white;
  cursor: pointer;
}
</style>
