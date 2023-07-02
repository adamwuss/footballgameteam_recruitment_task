import { shallowMount } from '@vue/test-utils';
import TheHome from '@/components/TheHome.vue';
import TheTable from '@/components/TheTable.vue';
import TheSearch from '@/components/TheSearch.vue';
import TheButton from '@/components/TheButton.vue';
import TheIntern from "@/components/TheIntern.vue";

const mock = {
  "data": [
    {
      "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg"
    },
  ],
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mock),
  })
);

describe('TheHome', () => {
  it('renders the component', async () => {
    const wrapper = shallowMount(TheHome);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the search input and add button when not handling an intern', async () => {
    const wrapper = shallowMount(TheHome);
    const searchInput = wrapper.findComponent(TheSearch);
    const addButton = wrapper.findComponent(TheButton);

    expect(searchInput.exists()).toBe(true);
    expect(addButton.exists()).toBe(true);
  });

  it('displays the table when not handling an intern', async () => {
    const wrapper = shallowMount(TheHome);
    const table = wrapper.findComponent(TheTable);

    expect(table.exists()).toBe(true);
  });

  it('displays the intern component when handling an intern',  async () => {
    const wrapper = shallowMount(TheHome, {
      data() {
        return {
          isHandlingIntern: true,
        };
      },
    });

    const internComponent = wrapper.findComponent(TheIntern);
    expect(internComponent.exists()).toBe(true);
  });

  it('emits a "search" event when searching', async () => {
    const wrapper = shallowMount(TheHome);
    const searchInput = wrapper.findComponent(TheSearch);
    await searchInput.vm.$emit('search', 'John');

    expect(wrapper.vm.search).toBe('John');
  });

  it('adds a new intern to the interns list when handling an intern', async () => {
    const wrapper = shallowMount(TheHome, {
      data() {
        return {
          isHandlingIntern: true,
        };
      },
    });

    const newIntern = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      avatar: '',
    };

    await wrapper.vm.handleAddIntern(newIntern);

    expect(wrapper.vm.interns).toContainEqual(newIntern);
  });

  it('updates an existing intern in the interns list when handling an intern', async () => {
    const existingIntern = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      avatar: '',
    };

    const wrapper = shallowMount(TheHome, {
      data() {
        return {
          isHandlingIntern: true,
          interns: [existingIntern],
        };
      },
    });

    const updatedIntern = {
      id: 1,
      first_name: 'Jane',
      last_name: 'Smith',
      avatar: '',
    };

    await wrapper.vm.handleAddIntern(updatedIntern);

    expect(wrapper.vm.interns).toContainEqual(updatedIntern);
  });

  it('removes an intern from the interns list when deleting', async () => {
    const internToDelete = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      avatar: '',
    };

    const wrapper = shallowMount(TheHome, {
      data() {
        return {
          interns: [internToDelete],
        };
      },
    });

    await wrapper.vm.handleDelete(1);

    expect(wrapper.vm.interns).not.toContainEqual(internToDelete);
  });

  it('sets the editingIntern data when editing an intern', async () => {
    const existingIntern = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      avatar: '',
    };

    const wrapper = shallowMount(TheHome, {
      data() {
        return {
          interns: [existingIntern],
        };
      },
    });

    await wrapper.vm.handleEdit(1);

    expect(wrapper.vm.editingIntern).toEqual(existingIntern);
  });

  it('clears the editingIntern data and sets isHandlingIntern to false when closing the intern component', async () => {
    const wrapper = shallowMount(TheHome, {
      data() {
        return {
          isHandlingIntern: true,
          editingIntern: {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            avatar: '',
          },
        };
      },
    });

    const internComponent = wrapper.findComponent(TheIntern);
    await internComponent.vm.$emit('close');

    expect(wrapper.vm.editingIntern).toEqual({});
    expect(wrapper.vm.isHandlingIntern).toBe(false);
  });

  it('sets isHandlingIntern to false when canceling the intern component', async () => {
    const wrapper = shallowMount(TheHome, {
      data() {
        return {
          isHandlingIntern: true,
        };
      },
    });

    const internComponent = wrapper.findComponent(TheIntern);
    await internComponent.vm.$emit('cancel');

    expect(wrapper.vm.isHandlingIntern).toBe(false);
  });

  it('filters the interns list based on the search query', async () => {
    const interns = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        avatar: '',
      },
      {
        id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        avatar: '',
      },
      {
        id: 3,
        first_name: 'Bob',
        last_name: 'Johnson',
        avatar: '',
      },
    ];

    const wrapper = shallowMount(TheHome, {
      data() {
        return {
          interns,
          search: 'Jo',
        };
      },
    });

    const filteredInterns = wrapper.vm.filteredInterns;

    expect(filteredInterns).toHaveLength(2);
    expect(filteredInterns).toContainEqual(interns[0]);
    expect(filteredInterns).toContainEqual(interns[2]);
    expect(filteredInterns).not.toContainEqual(interns[1]);
  });
});
