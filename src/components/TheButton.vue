<template>
  <button
    class="the-button"
    :class="{'the-button__rounded': rounded}"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "TheButton",
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style scoped lang="scss">
.the-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  width: 150px;
  background: green;
  color: white;
  border: none;
  border-radius: 5px;
  gap: 5px;
  fill: white;
  cursor: pointer;

  &__rounded {
    border-radius: 20px;
  }
}
</style>
