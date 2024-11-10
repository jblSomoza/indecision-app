import { mount } from "@vue/test-utils";
import ChatBubble from "@/components/chat/ChatBubble.vue";

describe('ChatBubble', () => {
    test('should render a message', () => {
        // Arrange
        const message = 'Hello, World!';
        const wrapper = mount(ChatBubble, {
            props: { message: message, itsMine: true }
        });

        expect(wrapper.find('.bg-blue-200').exists()).toBe(true);
        expect(wrapper.find('.bg-blue-200').text()).toBeTruthy();
        expect(wrapper.find('.bg-blue-200').text()).toBe(message);

        expect(wrapper.find('.bg-gray-300').exists()).toBeFalsy();
    });

    test('renders received message', () => {
        // Arrange
        const message = 'Hello, World!';
        const wrapper = mount(ChatBubble, {
            props: { message: message, itsMine: false }
        });

        expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
        expect(wrapper.find('.bg-gray-300').text()).toBeTruthy();
        expect(wrapper.find('.bg-gray-300').text()).toBe(message);

        expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
        expect(wrapper.find('img').exists()).toBeFalsy();
    });

    test('renders received message with image', () => {
        // Arrange
        const message = 'Hello, World!';
        const wrapper = mount(ChatBubble, {
            props: { message: message, itsMine: false, image: 'example.jpg' }
        });

        expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
        expect(wrapper.find('.bg-gray-300').text()).toBeTruthy();
        expect(wrapper.find('.bg-gray-300').text()).toBe(message);

        expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
        expect(wrapper.find('img').exists()).toBeTruthy();
        expect(wrapper.find('img').attributes('src')).toBe('example.jpg');
    });
});