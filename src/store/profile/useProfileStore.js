import { create } from 'zustand';
import { DUMMY_SKILLS } from '@/shared/data/profileSkillData';

const useProfileStore = create((set, get) => ({
    skills: DUMMY_SKILLS,
    subProfiles: [],
    activeSubProfile: null,

    // Actions
    addSkill: (skill) => set((state) => ({
        skills: [...state.skills, { ...skill, id: Date.now(), verified: false, verification_status: 'unverified' }]
    })),

    verifySkill: (skillId) => set((state) => ({
        skills: state.skills.map(s =>
            s.id === skillId ? { ...s, verified: true, verification_status: 'verified' } : s
        )
    })),

    removeSkill: (skillId) => set((state) => ({
        skills: state.skills.filter(s => s.id !== skillId)
    })),

    setActiveSubProfile: (profileId) => set({ activeSubProfile: profileId }),

    setSubProfiles: (profiles) => set({ subProfiles: profiles }),

    getSkillsByProfile: (profileId) => {
        return get().skills.filter(s => s.profileId === profileId);
    },

    getVerifiedCount: (profileId = null) => {
        const skills = get().skills;
        const relevant = profileId ? skills.filter(s => s.profileId === profileId) : skills;
        return relevant.filter(s => s.verified || s.verification_status === 'verified').length;
    },
}));

export default useProfileStore;
