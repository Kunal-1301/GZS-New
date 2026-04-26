import core from '@/services/api/core';
import { CORE } from '@/services/api/endpoints';

const messageService = {
    getConversations: async () => {
        const response = await core.get(CORE.MESSAGES.LIST);
        return response;
    },

    getConversation: async (userId, params = {}) => {
        const response = await core.get(CORE.MESSAGES.CONVERSATION(userId), { params });
        return response;
    },

    sendMessage: async (userId, messageData) => {
        const response = await core.post(CORE.MESSAGES.SEND(userId), messageData);
        return response;
    },
};

export default messageService;
