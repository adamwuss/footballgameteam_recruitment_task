<template>
 <div class="the-home">
   <div v-if="!isHandlingIntern">
     <div class="the-home__header">
       <TheSearch @search="handleSearch" />
       <TheButton @click="isHandlingIntern = true" rounded>
         <ThePlus />
         Add User
       </TheButton>
     </div>
     <TheTable
       :interns="filteredInterns"
       :isLoading="isLoading"
       @delete="handleDelete"
       @edit="handleEdit"
     />
   </div>
   <TheIntern
     v-else
     :editingIntern="editingIntern"
     @close="handleAddIntern"
     @cancel="isHandlingIntern = false"
   />
 </div>
</template>

<script>
import TheTable from '@/components/TheTable.vue'
import TheSearch from '@/components/TheSearch.vue';
import TheButton from '@/components/TheButton.vue';
import TheIntern from "@/components/TheIntern.vue";
import {getInterns} from '@/api/getInterns';
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
    isHandlingIntern: false,
    editingIntern: {},
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
      if (data) {
        this.interns = data.data;
        this.totalPages = data.total_pages;

        for (let i = 2; i <= this.totalPages; i++) {
          const data = await getInterns(String(i));
          this.interns = [...this.interns, ...data.data];
        }
      }

      this.isLoading = false;
    },
    handleAddIntern(newIntern) {
      const intern = this.interns.find(user => user.id === newIntern.id)
      if (intern) {
        intern.first_name = newIntern.first_name;
        intern.last_name = newIntern.last_name;
        intern.avatar = newIntern.avatar;
      } else {
        this.interns.push(newIntern);
      }

     this.editingIntern = {};
     this.isHandlingIntern = false;
    },
    handleDelete(id) {
      this.interns = this.interns.filter(intern => intern.id !== id)
    },
    handleEdit(id) {
      this.editingIntern = this.interns.find(intern => intern.id === id) || {};
      this.isHandlingIntern = true;
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
  height: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
}
</style>
