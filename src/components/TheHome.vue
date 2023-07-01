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
       :isLoading="isLoading"
       @delete="handleDelete"
     />
   </div>
   <TheIntern
     v-else
     @close="handleAddIntern"
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
    search: '',
    isLoading: false,
    isAddingIntern: false,
  }),
  async mounted() {
    await this.loadData();
  },
  methods: {
    handleSearch(search) {
      this.search = search;
    },
    async loadData() {
      this.isLoading = true;

      const data = await getInterns()
      this.interns = data.data;
      this.totalPages = data.total_pages;

      for (let i = 2; i <= this.totalPages; i++) {
        const data = await getInterns(String(i));
        this.interns = [...this.interns, ...data.data];
      }

      this.isLoading = false;
    },
    handleAddIntern(intern) {
     this.interns.push(intern);
     this.isAddingIntern = false;
    },
    handleDelete(id) {
      this.interns = this.interns.filter(intern => intern.id !== id)
    }
  },
  computed: {
    filteredInterns() {
      if (!this.search) {
        return this.interns;
      }

      return this.interns.filter(intern => `${intern.first_name} ${intern.last_name}`.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
}
</script>

<style scoped lang="scss">
.the-home {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 25px 0 lightgrey;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
}
</style>
