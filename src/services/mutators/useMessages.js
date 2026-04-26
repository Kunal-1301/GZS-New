import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import messageService from '@/services/features/messageService';

export const useMessages = () => {
    const queryClient = useQueryClient();

    const useGetConversations = () => {
        return useQuery({
            queryKey: ['conversations'],
            queryFn: messageService.getConversations,
            staleTime: 30000,
        });
    };

    const useGetConversation = (userId) => {
        return useQuery({
            queryKey: ['conversation', userId],
            queryFn: () => messageService.getConversation(userId),
            enabled: !!userId,
            staleTime: 10000,
        });
    };

    const useSendMessage = () => {
        return useMutation({
            mutationFn: ({ userId, data }) => messageService.sendMessage(userId, data),
            onSuccess: (_, { userId }) => {
                queryClient.invalidateQueries({ queryKey: ['conversation', userId] });
                queryClient.invalidateQueries({ queryKey: ['conversations'] });
            },
        });
    };

    return {
        useGetConversations,
        useGetConversation,
        useSendMessage,
    };
};
