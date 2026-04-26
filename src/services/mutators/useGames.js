import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import gamesService from '../features/gamesService';

export const useGamesList = (params = {}) =>
    useQuery({
        queryKey: ['games', params],
        queryFn: () => gamesService.getGames(params),
    });

export const useGameBySlug = (slug) =>
    useQuery({
        queryKey: ['game', slug],
        queryFn: () => gamesService.getGameBySlug(slug),
        enabled: !!slug,
    });

export const useTrendingGames = () =>
    useQuery({
        queryKey: ['games', 'trending'],
        queryFn: () => gamesService.getTrendingGames(),
    });

export const useFeaturedGames = () =>
    useQuery({
        queryKey: ['games', 'featured'],
        queryFn: () => gamesService.getFeaturedGames(),
    });

export const useSearchGames = (query) =>
    useQuery({
        queryKey: ['games', 'search', query],
        queryFn: () => gamesService.searchGames(query),
        enabled: query?.length >= 2,
    });

export const useCreateGame = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: gamesService.createGame,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['games'] });
        },
    });
};

export const useUpdateGame = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => gamesService.updateGame(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['game', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['games'] });
        },
    });
};

export const useDeleteGame = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: gamesService.deleteGame,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['games'] });
        },
    });
};

export const useUploadGameMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, formData }) => gamesService.uploadMedia(id, formData),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['game', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['games'] });
        },
    });
};

export const useGames = useGamesList;
export const useGame = useGameBySlug;
