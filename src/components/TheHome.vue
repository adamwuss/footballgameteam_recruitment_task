<template>
 <div class="the-home">
   <div class="the-home__top">
     <TheSearch @search="handleSearch" />
     <TheButton />
   </div>
   <TheTable
     :interns="filteredInterns"
     :numberOfPages="numberOfPages"
     :callbackClick="callbackClick"
   />
 </div>
</template>

<script>
import TheTable from '@/components/TheTable.vue'
import TheSearch from '@/components/TheSearch.vue';
import TheButton from '@/components/TheButton.vue';
import { getInterns } from '@/api/getInterns';
export default {
  name: 'TheHome',
  components: {
    TheTable,
    TheSearch,
    TheButton,
  },
  data: () => ({
    interns: [],
    numberOfPages: 1,
    search: '',
  }),
  async mounted() {
    const data = await getInterns()
    this.interns = data.data;
    this.numberOfPages = data.total_pages;
  },
  methods: {
    handleSearch(search) {
      this.search = search;
    },
    async callbackClick(page) {
      const data = await getInterns(page)
      this.interns = data.data;
      this.numberOfPages = data.total_pages;
    }
  },
  computed: {
    filteredInterns() {
      return this.interns.filter(intern => `${intern.first_name} ${intern.last_name}`.toLowerCase().includes(this.search.toLowerCase()));
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
