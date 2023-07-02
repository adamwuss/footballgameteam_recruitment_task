
import { shallowMount } from '@vue/test-utils';
import TheTable from '@/components/TheTable.vue';
import TheEdit from '@/components/icons/TheEdit.vue';
import TheDelete from '@/components/icons/TheDelete.vue';
import TheSpinner from '@/components/TheSpinner.vue';

describe('TheTable', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(TheTable, {
      propsData: {
        interns: [],
        isLoading: false,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the table when not loading', () => {
    const interns = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        avatar: '',
        local_image: '',
      },
    ];

    const wrapper = shallowMount(TheTable, {
      propsData: {
        interns,
        isLoading: false,
      },
    });

    const table = wrapper.find('.the-table__table');
    expect(table.exists()).toBe(true);
  });

  it('displays the spinner when loading', () => {
    const wrapper = shallowMount(TheTable, {
      propsData: {
        interns: [],
        isLoading: true,
      },
    });

    const spinner = wrapper.findComponent(TheSpinner);
    expect(spinner.exists()).toBe(true);
  });

  it('emits a "delete" event with the intern id', async () => {
    const interns = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        avatar: '',
        local_image: '',
      },
    ];

    const wrapper = shallowMount(TheTable, {
      propsData: {
        interns,
        isLoading: false,
      },
    });

    const deleteButton = wrapper.findComponent(TheDelete);
    await deleteButton.trigger('click');

    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')[0][0]).toBe(1);
  });

  it('emits a "edit" event with the intern id', async () => {
    const interns = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        avatar: '',
        local_image: '',
      },
    ];

    const wrapper = shallowMount(TheTable, {
      propsData: {
        interns,
        isLoading: false,
      },
    });

    const editButton = wrapper.findComponent(TheEdit);
    await editButton.trigger('click');

    expect(wrapper.emitted('edit')).toBeTruthy();
    expect(wrapper.emitted('edit')[0][0]).toBe(1);
  });
});
