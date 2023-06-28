<template>
  <div class="the-table">
    <div class="the-table__wrapper">
      <table class="the-table__table">
        <thead>
        <tr>
          <th class="the-table__avatar" />
          <th class="the-table__th">Full Name</th>
          <th class="the-table__th">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in currentTransactions" :key="row.id">
          <td />
          <td class="the-table__td">{{ row.firstName }} {{ row.lastName }}</td>
          <td />
        </tr>
        </tbody>
      </table>
    </div>
    <div class="the-table__pagination">
      <button
        @click="handlePrevPage"
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
        @click="currentPage = page"
      >
        {{ page }}
      </button>
      <button
        @click="handleNextPage"
        :disabled="currentPage === numberOfPages"
        class="the-table__pagination-button"
      >
        {{ ">>" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheTable",
  props: {
    interns: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    currentPage: 1,
    transactionsPerPage: 10,
  }),
  methods: {
    handleNextPage() {
      this.currentPage += 1
    },
    handlePrevPage() {
      this.currentPage -= 1
    },
  },
  computed: {
    indexOfLastTransaction() {
      return this.currentPage * this.transactionsPerPage
    },
    indexOfFirstTransaction() {
      return this.indexOfLastTransaction - this.transactionsPerPage;
    },
    currentTransactions() {
      return [...this.interns].slice(this.indexOfFirstTransaction, this.indexOfLastTransaction);
    },
    numberOfPages() {
      return Math.ceil(this.interns.length / this.transactionsPerPage);
    },
  }
}
</script>

<style scoped lang="scss">
.the-table {
  border-top: 1px solid #f5f5f5;

  &__wrapper {
    margin-bottom: 30px;
    height: 660px;
  }

  &__table {
    width: 100%;
    height: 200px;
    border-spacing: 0;
  }

  &__td {
    text-align: left;
    padding: 16px;
  }

  &__th {
    text-align: left;
    padding: 16px;
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
