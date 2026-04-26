import { create } from 'zustand';

const useCommunityStore = create((set) => ({
    activeBranch: null,
    activeChannel: null,
    joinedBranches: [],

    setActiveBranch: (slug) => set({ activeBranch: slug }),
    setActiveChannel: (channel) => set({ activeChannel: channel }),

    joinBranch: (slug) =>
        set((state) => ({
            joinedBranches: state.joinedBranches.includes(slug)
                ? state.joinedBranches
                : [...state.joinedBranches, slug],
        })),

    leaveBranch: (slug) =>
        set((state) => ({
            joinedBranches: state.joinedBranches.filter((b) => b !== slug),
        })),
}));

export default useCommunityStore;
