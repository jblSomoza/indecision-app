import MessageBox from "@/components/chat/MessageBox.vue";
import { mount } from "@vue/test-utils";

describe('MessageBox', () => {
    const wrapper = mount(MessageBox);

    test('renders input and button elements correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find('input[type="text"]').exists()).toBe(true);
        expect(wrapper.find('button').exists()).toBe(true);
        expect(wrapper.find('button svg').exists()).toBe(true);
    });

    test('emits "send" event when button is clicked', async () => {

        await wrapper.find('input[type="text"]').setValue('Hello, World!');
        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted('sendMessage')).toBeTruthy();
        expect(wrapper.emitted('sendMessage')?.[0]).toEqual(['Hello, World!']);

        expect((wrapper.vm as any).message).toBe('');
    });

    test('emits "send" event when Enter key is pressed', async () => {
        await wrapper.find('input[type="text"]').setValue('Hello, World!');
        await wrapper.find('input[type="text"]').trigger('keyup.enter');

        expect(wrapper.emitted('sendMessage')).toBeTruthy();
        expect(wrapper.emitted('sendMessage')?.[1]).toEqual(['Hello, World!']);

        expect((wrapper.vm as any).message).toBe('');
    });

    test('does not emit "send" event when Enter key is pressed and input is empty', async () => {
        const wrapper = mount(MessageBox);
        await wrapper.find('input[type="text"]').setValue('');
        await wrapper.find('input[type="text"]').trigger('keyup.enter');

        expect(wrapper.emitted('sendMessage')).toBeFalsy();
    });
});