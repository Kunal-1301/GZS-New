import cms from '@/services/api/cms';
import { CMS } from '@/services/api/endpoints';

const gamesService = {
    getGames: async (params = {}) => cms.get(CMS.GAMES.LIST, { params }),

    getGameBySlug: async (slug) => cms.get(CMS.GAMES.BY_SLUG(slug)),

    getTrendingGames: async () => cms.get(CMS.GAMES.TRENDING),

    getFeaturedGames: async () => cms.get(CMS.GAMES.FEATURED),

    searchGames: async (query) => cms.get(CMS.SEARCH, { params: { q: query, type: 'games' } }),

    createGame: async (gameData) => cms.post(CMS.GAMES.CREATE, gameData),

    updateGame: async (id, gameData) => cms.put(CMS.GAMES.UPDATE(id), gameData),

    deleteGame: async (id) => cms.delete(CMS.GAMES.DELETE(id)),

    uploadMedia: async (id, formData) =>
        cms.post(CMS.GAMES.UPLOAD_MEDIA(id), formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    updateStatus: async (id, status) => cms.put(CMS.GAMES.STATUS(id), { status }),
};

export default gamesService;
