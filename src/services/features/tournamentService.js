import core from '@/services/api/core';
import { CORE } from '@/services/api/endpoints';

const tournamentService = {
    getTournaments: async (params = {}) => core.get(CORE.TOURNAMENTS.LIST, { params }),

    getTournamentBySlug: async (slug) => core.get(CORE.TOURNAMENTS.BY_SLUG(slug)),

    getBracketData: async (slug) => core.get(CORE.TOURNAMENTS.BRACKET(slug)),

    getResults: async (slug) => core.get(CORE.TOURNAMENTS.RESULTS(slug)),

    register: async (id, registrationData = {}) => core.post(CORE.TOURNAMENTS.REGISTER(id), registrationData),

    createTournament: async (tournamentData) => core.post(CORE.TOURNAMENTS.CREATE, tournamentData),

    updateTournament: async (id, tournamentData) => core.put(CORE.TOURNAMENTS.UPDATE(id), tournamentData),

    updateBracket: async (id, bracketData) => core.put(CORE.TOURNAMENTS.UPDATE_BRACKET(id), bracketData),

    generateBracket: async (id) => core.post(CORE.TOURNAMENTS.GENERATE_BRACKET(id)),

    deleteTournament: async (id) => core.delete(CORE.TOURNAMENTS.DELETE(id)),
};

export default tournamentService;
