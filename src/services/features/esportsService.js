import core from '@/services/api/core';
import { CORE } from '@/services/api/endpoints';

export const esportsService = {
    getLeaderboard: async (params = {}) => {
        try { return await core.get('/esports/leaderboard', { params }); }
        catch { return []; }
    },
    getMatches: async (params = {}) => {
        try { return await core.get('/esports/matches', { params }); }
        catch { return []; }
    },
    getLiveScores: async () => {
        try { return await core.get('/esports/live'); }
        catch { return []; }
    },
};
