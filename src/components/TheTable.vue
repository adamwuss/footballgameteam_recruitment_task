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
        <tr v-for="row in interns" :key="row.id">
          <td />
          <td class="the-table__td">{{ row.first_name }} {{ row.last_name }}</td>
          <td />
        </tr>
        </tbody>
      </table>
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
export default {
  name: "TheTable",
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
  }),
  methods: {
    handleNextPage() {
      this.currentPage += 1
    },
    handlePrevPage() {
      this.currentPage -= 1
    },
    handleClick(page, direction) {
      if (direction === 'next') {
        this.handleNextPage()
      } else if (direction === 'prev') {
        this.handlePrevPage()
      } else {
        this.currentPage = page
      }

      this.callbackClick(this.currentPage)
    },
  },
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
