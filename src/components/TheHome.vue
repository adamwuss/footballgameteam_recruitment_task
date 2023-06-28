<template>
 <div class="the-home">
   <div class="the-home__top">
     <TheSearch @search="handleSearch" />
     <TheButton />
   </div>
   <TheTable :interns="filteredInterns" />
 </div>
</template>

<script>
import TheTable from '@/components/TheTable.vue'
import TheSearch from '@/components/TheSearch.vue';
import TheButton from '@/components/TheButton.vue';
export default {
  name: 'TheHome',
  components: {
    TheTable,
    TheSearch,
    TheButton,
  },
  data: () => ({
    interns: [
      { id: 1, firstName: 'John', lastName: 'Smith' },
      { id: 2, firstName: 'Alice', lastName: 'Johnson' },
      { id: 3, firstName: 'Michael', lastName: 'Williams' },
      { id: 4, firstName: 'Emily', lastName: 'Jones' },
      { id: 5, firstName: 'William', lastName: 'Brown' },
      { id: 6, firstName: 'Sophia', lastName: 'Davis' },
      { id: 7, firstName: 'James', lastName: 'Miller' },
      { id: 8, firstName: 'Olivia', lastName: 'Wilson' },
      { id: 9, firstName: 'Benjamin', lastName: 'Moore' },
      { id: 10, firstName: 'Emma', lastName: 'Taylor' },
      { id: 11, firstName: 'Daniel', lastName: 'Anderson' },
      { id: 12, firstName: 'Ava', lastName: 'Thomas' },
      { id: 13, firstName: 'Alexander', lastName: 'Martinez' },
      { id: 14, firstName: 'Mia', lastName: 'Harris' },
      { id: 15, firstName: 'Henry', lastName: 'Clark' },
      { id: 16, firstName: 'Isabella', lastName: 'Lewis' },
      { id: 17, firstName: 'Ethan', lastName: 'Young' },
      { id: 18, firstName: 'Charlotte', lastName: 'Lee' },
      { id: 19, firstName: 'Liam', lastName: 'Walker' },
      { id: 20, firstName: 'Sophie', lastName: 'Hall' },
      { id: 21, firstName: 'Mason', lastName: 'Allen' },
      { id: 22, firstName: 'Harper', lastName: 'Green' },
      { id: 23, firstName: 'Jacob', lastName: 'Baker' },
      { id: 24, firstName: 'Ella', lastName: 'King' },
      { id: 25, firstName: 'Matthew', lastName: 'Scott' },
      { id: 26, firstName: 'Grace', lastName: 'Taylor' },
      { id: 27, firstName: 'Landon', lastName: 'Anderson' },
      { id: 28, firstName: 'Scarlett', lastName: 'White' },
      { id: 29, firstName: 'Logan', lastName: 'Martin' },
      { id: 30, firstName: 'Chloe', lastName: 'Thompson' },
      { id: 31, firstName: 'Lucas', lastName: 'Wilson' },
      { id: 32, firstName: 'Avery', lastName: 'Turner' },
      { id: 33, firstName: 'Jackson', lastName: 'Brown' },
      { id: 34, firstName: 'Lily', lastName: 'Lewis' },
      { id: 35, firstName: 'Sebastian', lastName: 'Harris' },
      { id: 36, firstName: 'Zoe', lastName: 'Martin' },
      { id: 37, firstName: 'Caleb', lastName: 'Clark' },
      { id: 39, firstName: 'Eleanor', lastName: 'Walker' },
      { id: 40, firstName: 'Gabriel', lastName: 'Allen' },
      { id: 41, firstName: 'Penelope', lastName: 'Green' },
      { id: 42, firstName: 'Ryan', lastName: 'Baker' },
      { id: 43, firstName: 'Hannah', lastName: 'King' },
      { id: 44, firstName: 'David', lastName: 'Scott' },
      { id: 45, firstName: 'Aria', lastName: 'Taylor' },
      { id: 46, firstName: 'Owen', lastName: 'Anderson' },
      { id: 47, firstName: 'Nora', lastName: 'White' },
      { id: 48, firstName: 'Samuel', lastName: 'Martin' },
      { id: 49, firstName: 'Victoria', lastName: 'Thompson' },
      { id: 50, firstName: 'Isaac', lastName: 'Wilson' },
      { id: 51, firstName: 'Leah', lastName: 'Turner' },
      { id: 52, firstName: 'Nathan', lastName: 'Brown' },
      { id: 53, firstName: 'Sofia', lastName: 'Lewis' },
      { id: 54, firstName: 'Elijah', lastName: 'Harris' },
      { id: 55, firstName: 'Audrey', lastName: 'Martin' },
      { id: 56, firstName: 'Christopher', lastName: 'Clark' },
      { id: 57, firstName: 'Mila', lastName: 'Walker' },
      { id: 58, firstName: 'Julian', lastName: 'Allen' },
      { id: 59, firstName: 'Claire', lastName: 'Green' },
      { id: 60, firstName: 'Jonathan', lastName: 'Baker' },
      { id: 61, firstName: 'Stella', lastName: 'King' },
      { id: 62, firstName: 'Christian', lastName: 'Scott' },
      { id: 63, firstName: 'Bella', lastName: 'Taylor' },
      { id: 64, firstName: 'Andrew', lastName: 'Anderson' },
      { id: 65, firstName: 'Genesis', lastName: 'White' },
      { id: 66, firstName: 'Blake', lastName: 'Martin' },
      { id: 67, firstName: 'Caroline', lastName: 'Thompson' },
      { id: 68, firstName: 'Mateo', lastName: 'Wilson' },
      { id: 69, firstName: 'Nova', lastName: 'Turner' },
      { id: 70, firstName: 'Dominic', lastName: 'Brown' },
      { id: 71, firstName: 'Maya', lastName: 'Lewis' },
      { id: 72, firstName: 'Adam', lastName: 'Harris' },
      { id: 73, firstName: 'Violet', lastName: 'Martin' },
      { id: 74, firstName: 'Leo', lastName: 'Clark' },
      { id: 75, firstName: 'Naomi', lastName: 'Walker' },
      { id: 76, firstName: 'Jeremiah', lastName: 'Allen' },
      { id: 77, firstName: 'Aubrey', lastName: 'Green' },
    ],
    search: '',
  }),
  methods: {
    handleSearch(search) {
      this.search = search;
    },
  },
  computed: {
    filteredInterns() {
      return this.interns.filter(intern => `${intern.firstName} ${intern.lastName}`.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
}
</script>

<style scoped lang="scss">
.the-home {
  padding: 20px;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
}
</style>
