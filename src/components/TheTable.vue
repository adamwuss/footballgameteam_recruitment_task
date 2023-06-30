<template>
  <div class="the-table">
    <div
      class="the-table__wrapper"
      :class="{'the-table__center-flex': isLoading}"
    >
      <table class="the-table__table" v-if="!isLoading">
        <thead>
        <tr>
          <th class="the-table__avatar" />
          <th class="the-table__name">Full Name</th>
          <th class="the-table__action">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in interns" :key="row.id">
          <td class="the-table__avatar">
            <img :src="row.avatar" width="50" alt="avatar">
          </td>
          <td class="the-table__name">{{ row.first_name }} {{ row.last_name }}</td>
          <td class="the-table__action">
            <TheEdit />
            <TheDelete />
          </td>
        </tr>
        </tbody>
      </table>
      <TheSpinner v-else />
    </div>
    <div class="the-table__pagination">
      <button
        @click="handleClick(null, 'prev')"
        :disabled="currentPage === 1"
        class="the-table__pagination-button"
      >
        {{ "<<" }}
      </button>
      <button
        v-for="page in numberOfPages"
        :key="page"
        class="the-table__pagination-button"
        :class="{'the-table__button-active': currentPage === page}"
        @click="handleClick(page)"
      >
        {{ page }}
      </button>
      <button
        @click="handleClick(null, 'next')"
        :disabled="currentPage === numberOfPages"
        class="the-table__pagination-button"
      >
        {{ ">>" }}
      </button>
    </div>
  </div>
</template>

<script>
import TheEdit from '@/components/icons/TheEdit.vue';
import TheDelete from '@/components/icons/TheDelete.vue';
import TheSpinner from '@/components/TheSpinner.vue';
export default {
  name: "TheTable",
  components: {
    TheEdit,
    TheDelete,
    TheSpinner
  },
  props: {
    interns: {
      type: Array,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    callbackClick: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    currentPage: 1,
    isLoading: false,
  }),
  methods: {
    handleNextPage() {
      this.currentPage += 1;
    },
    handlePrevPage() {
      this.currentPage -= 1;
    },
    async handleClick(page, direction) {
      this.isLoading = true
      if (direction === 'next') {
        this.handleNextPage()
      } else if (direction === 'prev') {
        this.handlePrevPage()
      } else {
        this.currentPage = page
      }

      await this.callbackClick(this.currentPage)
      this.isLoading = false
    },
  },
}
</script>

<style scoped lang="scss">
.the-table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid #f5f5f5;

  &__wrapper {
    margin-bottom: 30px;
    height: 400px;
  }

  &__table {
    width: 100%;
    border-spacing: 0;
  }

  &__name {
    text-align: left;
    padding: 16px;
  }

  &__avatar img {
    margin-left: 20px;
    border-radius: 50%;
  }

  &__action {
    text-align: right;
    padding-right: 30px;
    fill: grey;

    svg {
      margin-right: 10px;
      width: 20px;
    }
  }

  &__center-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  tr {
    text-align: left;
    height: 60px;
  }

  tr:nth-child(even) {
    background-color: #F2F2F2
  }

  &__avatar {
    width: 5%;
  }

  &__pagination {
    display: flex;
    width: min-content;
    border-radius: 5px;
  }

  &__pagination-button {
    padding: 0;
    height: 30px;
    width: 30px;
    cursor: pointer;
    font-size: 15px;
    background-color: white;
    border: 1px solid #ddd;

    &:disabled {
      cursor: default;
    }
  }

  &__button-active {
    background-color: green;
    color: white;
  }
}
</style>
