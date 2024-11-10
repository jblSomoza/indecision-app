import { useChat } from "@/composables/useChat";

describe('useChat', () => {
    test('add a new message', async () => {
        const text = 'Hello, World!';
        const { messages, onNewMessage } = useChat();

        await onNewMessage(text);

        expect(messages.value.length).toBe(1);
        expect(messages.value[0]).toEqual({
            id: expect.any(Number),
            message: text,
            itsMine: true
        });
    });

    test('add nothing if the message is empty', async () => {
        const { messages, onNewMessage } = useChat();

        await onNewMessage('');

        expect(messages.value.length).toBe(0);
    });

    test('gets her response correctly', async () => {
        const { messages, onNewMessage } = useChat();

        await onNewMessage('Is this a test?');

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const [myMessage, herMessage] = messages.value;

        expect(messages.value.length).toBe(2);
        expect(herMessage).toEqual({
            id: expect.any(Number),
            message: expect.any(String),
            itsMine: false,
            image: expect.any(String)
        });
        expect(myMessage).toEqual({
            id: expect.any(Number),
            message: 'Is this a test?',
            itsMine: true,
        });
    });

    test('mock response fetch api', async () => {
        const mockResponse = {
            answer: 'yes',
            image: 'https://yesno.wtf/assets/yes/2.gif'
        };

        (window as any).fetch = vi.fn(async () => ({
            json: async () => mockResponse
        }));

        const { messages, onNewMessage } = useChat();

        await onNewMessage('Is this a test?');

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const [, herMessage] = messages.value;
        expect(herMessage).toEqual({
            id: expect.any(Number),
            message: 'yes',
            itsMine: false,
            image: mockResponse.image
        });
    });
});