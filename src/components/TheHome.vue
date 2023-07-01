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
    interns: {},
    numberOfPages: 1,
    perPage: 6,
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

      if (Object.keys(this.interns).includes(String(page))) {
        this.isLoading = false;
        return
      } else {
        console.log("page", page)
        const data = await getInterns(page)
        this.interns[data.page] = data.data;
        this.numberOfPages = data.total_pages;
        this.perPage = data.per_page;
      }

      this.isLoading = false;
    },
  },
  computed: {
    filteredInterns() {
      if (!this.search) {
        return this.interns;
      }

      const deepCopy = JSON.parse(JSON.stringify(this.interns));

      Object.keys(deepCopy).forEach(key => {
        deepCopy[key] = this.interns[key].filter(intern => `${intern.first_name} ${intern.last_name}`
          .toLowerCase().includes(this.search.toLowerCase()));
      });

      return deepCopy;
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
