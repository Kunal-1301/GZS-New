// ── Profile Skill System Data ─────────────────────────────────────

export const SUB_PROFILES = [
    {
        id: 'game-creation',
        title: 'GAME CREATION & DEVELOPMENT',
        description: 'Build gameplay systems, engines, and technical foundations.',
    },
    {
        id: 'esports',
        title: 'ESPORTS, PLAY & PERFORMANCE',
        description: 'Compete, coach, analyze, or officiate games.',
    },
    {
        id: 'content-media',
        title: 'CONTENT, MEDIA & COMMUNITY',
        description: 'Create content, manage communities, and engage audiences.',
    },
    {
        id: 'business-strategy',
        title: 'BUSINESS, STRATEGY & FUTURE SYSTEMS',
        description: 'Plan, manage, monetize, and govern gaming projects.',
    },
    {
        id: 'art-visual',
        title: 'ART, VISUAL & CHARACTER DESIGN',
        description: 'Create the visual identity and assets of games.',
    },
    {
        id: 'writing-narrative',
        title: 'WRITING, NARRATIVE & EDITORIAL',
        description: 'Write stories, dialogue, analysis, and documentation.',
    },
    {
        id: 'music-audio',
        title: 'MUSIC, AUDIO & SOUND DESIGN',
        description: 'Create music, sound effects, and voice experiences.',
    },
];

export const SKILL_GROUPS = [
    'Character Anatomy',
    'Stylized Rendering',
    'Concept Art & Ideation',
    'Game Asset Design',
    '3D Modelling',
    'UI/UX for Games',
    'Environment Design',
    'Lighting & Shading',
];

export const SKILL_LEVELS = ['Learning', 'Basic', 'Competent', 'Advanced', 'Expert'];

export const PROOF_TYPES = [
    'Portfolio link',
    'File upload',
    'Video / demo link',
    'Code repo',
    'Gameplay clip',
];

export const DUMMY_SKILLS = [
    { id: 1, category: 'Character Anatomy', name: 'Stylized Character Anatomy', verified: false },
    { id: 2, category: 'Stylized Rendering', name: 'Stylized Character Anatomy', verified: true },
    { id: 3, category: 'Concept Art', name: 'Stylized Character Anatomy', verified: true },
    { id: 4, category: 'Game Asset Design', name: 'Stylized Character Anatomy', verified: false },
    { id: 5, category: 'Lighting', name: 'Stylized Character Anatomy', verified: true },
    { id: 6, category: '3D Modelling', name: 'Stylized Character Anatomy', verified: false },
    { id: 7, category: 'Environment Design', name: 'Stylized Character Anatomy', verified: true },
    { id: 8, category: 'UI / UX for Games', name: 'Stylized Character Anatomy', verified: true },
];

export const DUMMY_PROJECTS = [
    {
        id: 1,
        type: 'Personal Project',
        status: 'Completed',
        title: 'STYLIZED CHARACTER CONCEPT SET',
        description:
            'A set of stylized character concepts exploring anatomy, proportion, and silhouette. A set of stylized character concepts exploring anatomy, proportion, and silhouette. A set of stylized character concepts exploring anatomy, proportion, and silhouette.',
        skills: ['Stylized Character Anatomy', 'Concept Art & Ideation'],
        contact: 'mail: xyz@gmail.com',
    },
    {
        id: 2,
        type: 'Team / Indie Project',
        status: 'In Progress',
        title: 'INDIE GAME ENVIRONMENT ASSETS',
        description:
            'Environment props and visual assets created for a small indie game prototype.',
        skills: ['Environment Design', '3D Modelling'],
        contact: null,
    },
];

export const DUMMY_ACTIVITY = [
    { id: 1, title: 'EXPLORING STYLIZED FACIAL PROPORTIONS' },
    { id: 2, title: 'EXPLORING STYLIZED FACIAL PROPORTIONS' },
    { id: 3, title: 'EXPLORING STYLIZED FACIAL PROPORTIONS' },
    { id: 4, title: 'EXPLORING STYLIZED FACIAL PROPORTIONS' },
    { id: 5, title: 'EXPLORING STYLIZED FACIAL PROPORTIONS' },
    { id: 6, title: 'EXPLORING STYLIZED FACIAL PROPORTIONS' },
];

export const PROFILE_STATUS_ITEMS = [
    { label: 'SKILLS', status: '0 ADDED' },
    { label: 'SKILL VERIFICATION', status: 'NOT STARTED' },
    { label: 'TOOLS & WORKFLOW', status: 'NOT ADDED' },
    { label: 'PROJECTS & PROOF OF WORK', status: 'NOT ADDED' },
    { label: 'AVAILABILITY & ENGAGEMENT', status: 'NOT SET' },
    { label: 'POSTS & MEDIA', status: 'NO ACTIVITY' },
];
