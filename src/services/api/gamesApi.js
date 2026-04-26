import { cms } from './cms';

export const gamesApi = {
    // CMS access for game listings
    getGames: () => cms.get('/games'),

    // Update game status
    updateGameStatus: (id, status) => cms.patch(`/games/${id}/status`, { status }),
};
