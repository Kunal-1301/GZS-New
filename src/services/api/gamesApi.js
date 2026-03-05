import { cmsClient } from './clients';

export const gamesApi = {
    // CMS access for game listings
    getGames: () => cmsClient.get('/games'),

    // Update game status
    updateGameStatus: (id, status) => cmsClient.patch(`/games/${id}/status`, { status }),
};
