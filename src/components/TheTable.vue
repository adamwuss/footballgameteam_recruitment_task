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
      <td class="table__td">{{ row.id }}</td>
      <td class="table__td">{{ row.price }}$</td>
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
  data: () => ({
    transactions: [
      {"id":1,"price":185},
      {"id":2,"price":115},
      {"id":3,"price":674},
      {"id":4,"price":322},
      {"id":5,"price":1016},
      {"id":6,"price":16},
      {"id":7,"price":181},
      {"id":8,"price":3},
      {"id":9,"price":120},
      {"id":10,"price":558},
      {"id":11,"price":797},
      {"id":12,"price":469},
      {"id":13,"price":124},
      {"id":14,"price":234},
      {"id":15,"price":1081},
      {"id":16,"price":1126},
      {"id":17,"price":224},
      {"id":18,"price":435},
      {"id":19,"price":1049},
      {"id":20,"price":781},
      {"id":21,"price":982},
      {"id":22,"price":585},
      {"id":23,"price":583},
      {"id":24,"price":1097},
      {"id":25,"price":127},
      {"id":26,"price":218},
      {"id":27,"price":467},
      {"id":28,"price":521},
      {"id":29,"price":618},
      {"id":30,"price":986},
      {"id":31,"price":1105},
      {"id":32,"price":723},
      {"id":33,"price":533},
      {"id":34,"price":24},
      {"id":35,"price":30},
      {"id":36,"price":531},
      {"id":37,"price":1142},
      {"id":38,"price":1030},
      {"id":39,"price":1241},
      {"id":40,"price":833},
      {"id":41,"price":1242},
      {"id":42,"price":93},
      {"id":43,"price":229},
      {"id":44,"price":101},
      {"id":45,"price":744},
      {"id":46,"price":771},
      {"id":47,"price":477},
      {"id":48,"price":779},
      {"id":49,"price":862},
      {"id":50,"price":559},
      {"id":51,"price":771},
      {"id":52,"price":997},
      {"id":53,"price":485},
      {"id":54,"price":1078},
      {"id":55,"price":666},
      {"id":56,"price":1175},
      {"id":57,"price":1062},
      {"id":58,"price":527},
      {"id":59,"price":652},
      {"id":60,"price":657},
      {"id":61,"price":775}
    ],
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
      return this.transactions.slice(this.indexOfFirstTransaction, this.indexOfLastTransaction);
    },
    numberOfPages() {
      return Math.ceil(this.transactions.length / this.transactionsPerPage);
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
