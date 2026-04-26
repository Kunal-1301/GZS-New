import { mockApiService } from '@services/mockApiService';

const verificationService = {
  async listVerifications() {
    return mockApiService.getAllSkillProofs();
  },

  async decideVerification(id, decision) {
    return mockApiService.updateSkillProof(id, {
      status: decision,
      reviewed_at: new Date().toISOString(),
    });
  },
};

export default verificationService;
