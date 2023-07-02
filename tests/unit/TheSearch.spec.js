import { shallowMount } from '@vue/test-utils';
import TheSearch from '@/components/TheSearch.vue';

describe('TheSearch', () => {
  it('renders the component', async () => {
    const wrapper = shallowMount(TheSearch);
    expect(wrapper.exists()).toBe(true);
  });

  it('updates the value when input changes', async () => {
    const wrapper = shallowMount(TheSearch);
    const input = wrapper.find('input');

    await input.setValue('Search term');
    expect(wrapper.vm.value).toBe('Search term');
  });

  it('emits a "search" event with the input value on input change', async () => {
    const wrapper = shallowMount(TheSearch);
    const input = wrapper.find('input');

    await input.setValue('Search term');
    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')[0][0]).toBe('Search term');
  });
});
