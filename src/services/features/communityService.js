import core from '@/services/api/core';
import { CORE } from '@/services/api/endpoints';

const communityService = {
    getBranches: async () => core.get(CORE.COMMUNITY.BRANCHES),

    getBranchDetail: async (slug) => core.get(CORE.COMMUNITY.BRANCH(slug)),

    joinBranch: async (slug) => core.post(CORE.COMMUNITY.JOIN(slug)),

    getBranchChannels: async (branch) => core.get(CORE.COMMUNITY.CHANNELS(branch)),

    getChannelDetail: async (branch, channel) => core.get(CORE.COMMUNITY.CHANNEL(branch, channel)),

    getMessageHistory: async (branch, channel, params = {}) =>
        core.get(CORE.COMMUNITY.MESSAGES(branch, channel), { params }),

    sendMessage: async ({ branch, channel, content }) =>
        core.post(CORE.COMMUNITY.SEND_MESSAGE(branch, channel), { content }),

    getGroupsInBranch: async (branch) => core.get(CORE.COMMUNITY.GROUPS(branch)),

    getGroupDetail: async (id) => core.get(CORE.COMMUNITY.GROUP(id)),

    joinGroup: async (id) => core.post(CORE.COMMUNITY.GROUP_JOIN(id)),

    leaveGroup: async (id) => core.delete(CORE.COMMUNITY.GROUP_LEAVE(id)),

    getGroupMessages: async (id, params = {}) => core.get(CORE.COMMUNITY.GROUP_MESSAGES(id), { params }),

    getShowcaseFeed: async (branch, params = {}) => core.get(CORE.COMMUNITY.SHOWCASE(branch), { params }),

    getLFGBoard: async (branch, params = {}) => core.get(CORE.COMMUNITY.LFG(branch), { params }),

    getCommunityEvents: async (branch, params = {}) => core.get(CORE.COMMUNITY.EVENTS(branch), { params }),

    getJoinedCommunities: async () => core.get(CORE.COMMUNITY.MY_JOINED),

    getMyCommunityActivity: async () => core.get(CORE.COMMUNITY.MY_ACTIVITY),

    getLiveStats: async () => core.get(CORE.COMMUNITY.STATS),

    getTrendingPosts: async (params = {}) => core.get(CORE.COMMUNITY.TRENDING, { params }),
};

export default communityService;
