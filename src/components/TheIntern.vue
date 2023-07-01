<template>
  <div class="the-intern">
    <div class="the-intern__inputs">
      <label class="the-intern__label">
        <span class="the-intern__text">First Name</span>
        <input class="the-intern__input" type="text" />
      </label>
      <label class="the-intern__label">
        <span class="the-intern__text">Last Name</span>
        <input class="the-intern__input" type="text" />
      </label>
    </div>

    <TheButton @click="handleClick">
      Update Details
    </TheButton>
  </div>
</template>

<script>
import TheButton from "@/components/TheButton.vue";
export default {
  name: "TheIntern",
  components: {
    TheButton,
  },
  methods: {
    handleClick() {
      this.$emit("close");
    },
  },
}
</script>

<style scoped lang="scss">
.the-intern {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  padding: 50px;

  &__inputs {
    display: flex;
    gap: 30px;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__text {
    font-weight: 700;
  }

  &__input {
    width: 400px;
    height: 25px;
  }

  &__submit {
    width: 150px;
    height: 50px;
    padding: 5px 10px;
    background: green;
  }
}

</style>
