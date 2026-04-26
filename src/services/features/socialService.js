import core from '@/services/api/core';
import { CORE } from '@/services/api/endpoints';

const socialService = {
    createPost: async (postData) =>
        core.post(CORE.SOCIAL.CREATE_POST, postData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    getFeed: async (params = {}) => core.get(CORE.SOCIAL.FEED, { params }),

    getUserPosts: async (username, params = {}) => core.get(CORE.SOCIAL.USER_POSTS(username), { params }),

    getSubProfilePosts: async (username, type, params = {}) =>
        core.get(CORE.SOCIAL.SUB_POSTS(username, type), { params }),

    likePost: async (postId) => core.post(CORE.SOCIAL.LIKE(postId)),

    commentOnPost: async (postId, content) => core.post(CORE.SOCIAL.COMMENT(postId), { content }),

    deletePost: async (postId) => core.delete(CORE.SOCIAL.DELETE_POST(postId)),

    getFriendsList: async () => core.get(CORE.SOCIAL.FRIENDS),

    sendFriendRequest: async (userId) => core.post(CORE.SOCIAL.SEND_REQUEST(userId)),

    acceptFriendRequest: async (requestId) => core.post(CORE.SOCIAL.ACCEPT_REQUEST(requestId)),

    followProfile: async (userId) => core.post(CORE.SOCIAL.FOLLOW(userId)),

    blockUser: async (userId) => core.post(CORE.SOCIAL.BLOCK(userId)),

    getSuggestions: async () => core.get(CORE.SOCIAL.SUGGESTIONS),

    respondToFriendRequest: async (requestId, status) => core.put(CORE.FRIENDS.RESPOND(requestId), { status }),

    followSubProfile: async (username, type) => core.post(CORE.FOLLOW.FOLLOW(username, type)),

    unfollowSubProfile: async (username, type) => core.delete(CORE.FOLLOW.UNFOLLOW(username, type)),
};

export default socialService;
