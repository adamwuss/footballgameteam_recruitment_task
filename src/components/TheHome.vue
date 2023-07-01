<template>
 <div class="the-home">
   <div v-if="!isAddingIntern">
     <div class="the-home__header">
       <TheSearch @search="handleSearch" />
       <TheButton @click="isAddingIntern = true" rounded>
         <ThePlus />
         Add User
       </TheButton>
     </div>
     <TheTable
         :interns="filteredInterns"
         :numberOfPages="numberOfPages"
         :callbackClick="callbackClick"
         :isLoading="isLoading"
     />
   </div>
   <TheIntern
     v-else
     @close="isAddingIntern = false"
   />
 </div>
</template>

<script>
import TheTable from '@/components/TheTable.vue'
import TheSearch from '@/components/TheSearch.vue';
import TheButton from '@/components/TheButton.vue';
import TheIntern from "@/components/TheIntern.vue";
import { getInterns } from '@/api/getInterns';
import ThePlus from "@/components/icons/ThePlus.vue";
export default {
  name: 'TheHome',
  components: {
    ThePlus,
    TheTable,
    TheSearch,
    TheButton,
    TheIntern,
  },
  data: () => ({
    interns: [],
    numberOfPages: 1,
    search: '',
    isLoading: false,
    isAddingIntern: false,
  }),
  async mounted() {
    await this.callbackClick();
  },
  methods: {
    handleSearch(search) {
      this.search = search;
    },
    async callbackClick(page) {
      this.isLoading = true;

      const data = await getInterns(page)
      this.interns = data.data;
      this.numberOfPages = data.total_pages;

      this.isLoading = false;
    },
  },
  computed: {
    filteredInterns() {
      return this.interns.filter(intern => `${intern.first_name} ${intern.last_name}`
        .toLowerCase().includes(this.search.toLowerCase()));
    },
  },
}
</script>

<style scoped lang="scss">
.the-home {
  background: white;
  padding: 30px;
  border-radius: 10px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
}
</style>
