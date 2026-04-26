import core from '@/services/api/core';
import { CORE } from '@/services/api/endpoints';

const profileService = {
    getMasterProfile: async () => core.get(CORE.PROFILE.ME),

    getMyProfile: async () => core.get(CORE.PROFILE.ME),

    updateProfile: async (profileData) => core.put(CORE.PROFILE.ME_UPDATE, profileData),

    updateMyProfile: async (profileData) => core.put(CORE.PROFILE.ME_UPDATE, profileData),

    getSubProfiles: async () => core.get(CORE.PROFILE.SUB_LIST),

    createSubProfile: async (subProfileData) => core.post(CORE.PROFILE.SUB_CREATE, subProfileData),

    getSubProfileByType: async (type) => core.get(CORE.PROFILE.SUB_BY_TYPE(type)),

    getSubProfile: async (type) => core.get(CORE.PROFILE.SUB_BY_TYPE(type)),

    updateSubProfile: async (type, subProfileData) => core.put(CORE.PROFILE.SUB_UPDATE(type), subProfileData),

    deleteSubProfile: async (type) => core.delete(CORE.PROFILE.SUB_DELETE(type)),

    getPublicMaster: async (username) => core.get(CORE.PROFILE.PUBLIC_MASTER(username)),

    getPublicSub: async (username, type) => core.get(CORE.PROFILE.PUBLIC_SUB(username, type)),

    getSkills: async (type) => core.get(CORE.PROFILE.SKILLS(type)),

    addSkill: async (type, skillData) => core.post(CORE.PROFILE.SKILL_ADD(type), skillData),

    deleteSkill: async (type, skillId) => core.delete(CORE.PROFILE.SKILL_DELETE(type, skillId)),

    getProjects: async (type) => core.get(CORE.PROFILE.PROJECTS(type)),

    addProject: async (type, projectData) => core.post(CORE.PROFILE.PROJECT_ADD(type), projectData),

    updateProject: async (type, projectId, projectData) =>
        core.put(CORE.PROFILE.PROJECT_UPDATE(type, projectId), projectData),

    deleteProject: async (type, projectId) => core.delete(CORE.PROFILE.PROJECT_DELETE(type, projectId)),
};

export default profileService;
