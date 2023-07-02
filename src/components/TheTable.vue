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
        <tr v-for="row in currentInterns" :key="row.id">
          <td class="the-table__avatar">
            <img :src="row.avatar || row.local_image || require('../assets/img/default-user.png')" width="50" height="50" alt="avatar">
          </td>
          <td class="the-table__name">{{ row.first_name }} {{ row.last_name }}</td>
          <td class="the-table__action">
            <TheEdit @click="$emit('edit', row.id)" />
            <TheDelete @click="handleDelete(row.id)" />
          </td>
        </tr>
        </tbody>
      </table>
      <TheSpinner v-else />
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
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    currentPage: 1,
    internsPerPage: 6,
  }),
  methods: {
    handleNextPage() {
      this.currentPage += 1
    },
    handlePrevPage() {
      this.currentPage -= 1
    },
    handleDelete(id) {
      if (this.interns.length % this.internsPerPage === 1) {
        this.handlePrevPage();
      }

      this.$emit('delete', id)
    }
  },
  computed: {
    indexOfLastIntern() {
      return this.currentPage * this.internsPerPage
    },
    indexOfFirstIntern() {
      return this.indexOfLastIntern - this.internsPerPage;
    },
    currentInterns() {
      return [...this.interns].slice(this.indexOfFirstIntern, this.indexOfLastIntern);
    },
    numberOfPages() {
      return Math.ceil(this.interns.length / this.internsPerPage);
    },
  }
}
</script>

<style scoped lang="scss">
.the-table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid #f5f5f5;
  gap: 10px;
  height: 100%;

  &__wrapper {
    margin-bottom: 30px;
    height: 400px;

    @media screen and (min-width: 480px) {
      margin-bottom: 30px;
      height: 400px;
    }
  }

  &__table {
    width: 100%;
    border-spacing: 0;
  }

  &__name {
    text-align: left;
    padding: 16px;
  }

  &__action {
    text-align: right;
    padding-right: 30px;
    fill: grey;

    svg {
      margin-right: 10px;
      width: 20px;
      cursor: pointer;
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

    img {
      margin-left: 20px;
      border-radius: 50%;
    }
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
