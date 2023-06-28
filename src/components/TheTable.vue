<template>
  <table class="table">
    <thead>
    <tr>
      <th class="table__th">Full Name</th>
      <th class="table__th">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in currentTransactions" :key="row.id">
      <td class="table__td">{{ row.firstName }} {{ row.lastName }}</td>
      <td />
    </tr>
    <tr>
      <td>
        {{ currentPage }} of {{ numberOfPages }}
      </td>
      <td>
        <button
            @click="handlePrevPage"
            :disabled="currentPage === 1"
        >
          {{ "<" }}
        </button>
        <button
            @click="handleNextPage"
            :disabled="currentPage === numberOfPages"
        >
          {{ ">" }}
        </button>
      </td>
    </tr>
    </tbody>
  </table>
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
    transactionsPerPage: 6,
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
.table {
  width: 100%;
  border-spacing: 0;

  &__td {
    text-align: left;
    padding: 16px;
  }

  &__th {
    text-align: left;
    padding: 16px;
  }

  tr {
    height: 50px;
  }

  tr:nth-child(odd) {
    background-color: #F2F2F2
  }

  button {
    border: none;
    cursor: pointer;
    font-size: 15px;
    margin-right: 5px;

    &:disabled {
      color: grey;
      cursor: default;
    }
  }
}
</style>
