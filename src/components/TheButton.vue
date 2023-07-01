<template>
  <button
    class="the-button"
    :class="{'the-button__rounded': rounded}"
    :style="{backgroundColor: color}"
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
    color: {
      type: String,
      default: "green",
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
