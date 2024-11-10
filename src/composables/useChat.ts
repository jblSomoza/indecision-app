import { ref } from "vue";

import { sleep } from "@/helpers/sleep";
import type { ChatMessage } from "@/interfaces/chat-message.interface";
import type { YesNoResponse } from "@/interfaces/yes-no.response";

export const useChat = () => {

    const messages = ref<ChatMessage[]>([]);

    const getHerResponse = async () => {
        const response = await fetch("https://yesno.wtf/api");
        const data = (await response.json() as YesNoResponse);

        return data;
    }

    const onNewMessage = async (text: string) => {
        if (text.trim().length === 0) return;

        const newMessage: ChatMessage = {
            id: new Date().getTime(),
            message: text,
            itsMine: true
        };

        messages.value.push(newMessage);

        if (!text.endsWith("?")) return;

        await sleep(1.5);

        const { answer, image } = await getHerResponse();
        messages.value.push({
            id: new Date().getTime(),
            message: answer,
            itsMine: false,
            image
        })
    };

    return {
        messages,
        onNewMessage
    }
}