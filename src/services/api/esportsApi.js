import { cms } from './cms';

export const esportsApi = {
    // Get public tournaments for the landing page
    getPublicTournaments: () => cms.get('/tournaments/public'),

    // Get tournament details
    getTournamentDetails: (id) => cms.get(`/tournaments/${id}`),

    // Register for a tournament
    registerTournament: (id, data) => cms.post(`/tournaments/${id}/register`, data),
};
