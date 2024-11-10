import ChatMessages from "@/components/chat/ChatMessages.vue";
import type { ChatMessage } from "@/interfaces/chat-message.interface";
import { mount } from "@vue/test-utils";

const messages: ChatMessage[] = [
    { id: 1, message: 'Hello, World!', itsMine: true },
    { id: 2, message: 'Hi, there!', itsMine: false },
]

describe('ChatMessages', () => {
    const wrapper = mount(ChatMessages, {
        props: {
            messages: messages,
        },
    });

    test('renders messages correctly', () => {
        const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' });
        expect(chatBubbles.length).toBe(messages.length);
    });

    test('scrolls down to the bottom after messages are updated', async () => {

        const scrollMock = vi.fn();
        const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;
        chatRef.scrollTo = scrollMock;

        await wrapper.setProps({
            messages: [
                ...messages,
                { id: 3, message: 'How are you?', itsMine: true },
            ],
        });

        await new Promise((resolve) => setTimeout(resolve, 150));

        expect(scrollMock).toHaveBeenCalledTimes(1);
        expect(scrollMock).toHaveBeenCalledWith({
            top: chatRef.scrollHeight,
            behavior: 'smooth',
        });


    });
});