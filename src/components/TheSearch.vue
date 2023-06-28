<template>
  <input
    class="the-search"
    type="text"
    placeholder="Search for users..."
    v-model="value"
    @input="$emit('search', value)"
  >
</template>

<script>
export default {
  name: "TheSearch",
  data: () => ({
    value: '',
  })
}
</script>

<style scoped>
  .the-search {
    height: 30px;
    border: none;
    width: 400px;
    margin-bottom: 50px;
    text-indent: 5px;
    color: #2a2a2a;
    background-color: #F2F2F2;
    background-image: url(@/assets/img/search-icon.svg);
    background-repeat: no-repeat;
    background-position: right 10px center;
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #2a2a2a;
    opacity: 1; /* Firefox */
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: #2a2a2a;
  }
</style>
