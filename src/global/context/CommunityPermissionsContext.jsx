import { createContext, useContext, useState } from 'react';

export const Personas = {
    ACTIVE_EXPERT: {
        id: 'ACTIVE_EXPERT', label: 'Native (+ Expert level)',
        type: 'sub_profile', isMatchingBranch: true, level: 'Expert',
        desc: 'Has the right sub-profile for this branch. High enough level to create rooms.'
    },
    ACTIVE_BEGINNER: {
        id: 'ACTIVE_BEGINNER', label: 'Native (+ Beginner level)',
        type: 'sub_profile', isMatchingBranch: true, level: 'Beginner',
        desc: 'Has the right sub-profile. Too low level to create rooms. Can chat.'
    },
    TOURIST: {
        id: 'TOURIST', label: 'Tourist (Different Sub-Profile)',
        type: 'sub_profile', isMatchingBranch: false, level: 'Hustler',
        desc: 'Browsing a branch they don\'t hold the profile for. Read-only mode.'
    },
    COMPANY: {
        id: 'COMPANY', label: 'Company Profile',
        type: 'company', isMatchingBranch: false, level: null,
        desc: 'Cannot chat. Can only view or use intent-actions (hire, sponsor).'
    },
    MASTER_EMPTY: {
        id: 'MASTER_EMPTY', label: 'Master (No Sub-Profiles)',
        type: 'master', isMatchingBranch: false, level: null,
        desc: 'Hasn\'t made a sub-profile yet. Fully read-only.'
    }
};

export const CommunityPermissionsContext = createContext(null);

export const CommunityPermissionsProvider = ({ children }) => {
    const [currentPersonaKey, setCurrentPersonaKey] = useState('ACTIVE_EXPERT');
    const persona = Personas[currentPersonaKey];

    // The core Permission Matrix Implementation
    const can = (action) => {
        switch (action) {
            case 'view_rooms':
                return true; // Everyone can view

            case 'chat':
            case 'lfg':
            case 'engage':
                // Native sub-profiles only. No tourists, no companies, no masters.
                if (persona.type === 'sub_profile' && persona.isMatchingBranch) return true;
                return false;

            case 'create_room':
            case 'host_event':
                // Native sub-profile + Expert level or higher
                if (persona.type === 'sub_profile' && persona.isMatchingBranch && ['Expert', 'Master', 'Grandmaster'].includes(persona.level)) return true;
                return false;

            case 'company_intent':
                // Companies only (Hiring, Sponsor)
                if (persona.type === 'company') return true;
                return false;

            case 'monetize':
                // Sub-profile + Master level or higher
                if (persona.type === 'sub_profile' && ['Master', 'Grandmaster'].includes(persona.level)) return true;
                return false;

            default:
                return false;
        }
    };

    return (
        <CommunityPermissionsContext.Provider value={{ currentPersonaKey, setCurrentPersonaKey, persona, Personas, can }}>
            {children}
            {/* Dev Tool: Persona Switcher */}
            <div className="fixed bottom-4 right-4 z-[100] bg-white border border-neutral-200 shadow-2xl p-4 rounded-xl flex flex-col gap-2 w-80 text-sm">
                <h4 className="font-black text-neutral-900 text-xs tracking-widest uppercase mb-1">MVP Permission Switcher</h4>
                <select
                    value={currentPersonaKey}
                    onChange={(e) => setCurrentPersonaKey(e.target.value)}
                    className="bg-neutral-50 border border-neutral-200 text-neutral-900 rounded p-2 font-bold outline-none focus:border-[#7C3AED]"
                >
                    {Object.values(Personas).map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                </select>
                <p className="text-[10px] text-neutral-500 font-medium leading-tight mt-1">{persona.desc}</p>
            </div>
        </CommunityPermissionsContext.Provider>
    );
};

export const useCommunityPermissions = () => useContext(CommunityPermissionsContext);
