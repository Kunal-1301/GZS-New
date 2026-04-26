import core from '../api/core';
import { CORE } from '../api/endpoints';

export const companyService = {
  getCompanies: async () => {
    const response = await core.get(CORE.COMPANY.LIST);
    return response;
  },

  getCompanyBySlug: async (slug) => {
    const response = await core.get(CORE.COMPANY.BY_SLUG(slug));
    return response;
  },

  getMyCompany: async () => {
    const response = await core.get(CORE.COMPANY.ME);
    return response;
  },

  createCompany: async (data) => {
    const response = await core.post(CORE.COMPANY.CREATE, data);
    return response;
  },

  updateCompany: async (id, data) => {
    const response = await core.put(CORE.COMPANY.UPDATE(id), data);
    return response;
  },

  getMembers: async (id) => {
    const response = await core.get(CORE.COMPANY.MEMBERS(id));
    return response;
  },

  addMember: async (id, data) => {
    const response = await core.post(CORE.COMPANY.MEMBER_ADD(id), data);
    return response;
  },

  removeMember: async (id, userId) => {
    const response = await core.delete(CORE.COMPANY.MEMBER_REMOVE(id, userId));
    return response;
  },

  getOpportunities: async (id) => {
    const response = await core.get(CORE.COMPANY.OPPORTUNITIES(id));
    return response;
  },

  getTalentPool: async (slug) => {
    const response = await core.get(CORE.COMPANY.TALENT_POOL(slug));
    return response;
  },

  getTeam: async (slug) => {
    const response = await core.get(CORE.COMPANY.TEAM(slug));
    return response;
  },

  getOpenRoles: async (slug) => {
    const response = await core.get(CORE.COMPANY.OPEN_ROLES(slug));
    return response;
  },

  getAnalytics: async (slug) => {
    const response = await core.get(CORE.COMPANY.ANALYTICS(slug));
    return response;
  }
};

export default companyService;
