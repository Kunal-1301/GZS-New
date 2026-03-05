// ── Profile Skill System Data ─────────────────────────────────────

export const SUB_PROFILES = [
    {
        id: 'game-creation',
        title: 'GAME CREATION & DEVELOPMENT',
        description: 'Build gameplay systems, engines, and technical foundations.',
        roles: [
            'Game Designer', 'Game Developer / Programmer', 'Level Designer', 'Game Engine Developer',
            'Game Systems Designer', 'AI Engineer', 'Network Engineer', 'Cybersecurity Analyst',
            'LiveOps Manager', 'Game Monetization Expert', 'Tech Support Specialist', 'Metaverse Developer',
            'VR/AR Developer', 'Blockchain/NFT Game Developer', 'BCI Game Developer', 'Neural Input Engineer',
            'Virtual Physics Realism Engineer', 'Digital Twin Game Engineer', 'AI Game Director',
            'Procedural World Architect', 'AI Balancing Engineer', 'Synthetic Player Behavior Analyst',
            'Massive Scale Multiplayer Architect', 'Latency Optimization Engineer',
            'Cloud Gaming Optimization Specialist', 'Edge Computing Game Engineer', 'Distributed Simulation Engineer'
        ],
        skillGroups: [
            'Gameplay Design & Mechanics', 'Programming & Scripting', 'Engine & Tools',
            'AI & Behavior Systems', 'Multiplayer & Networking', 'Performance & Optimization',
            'LiveOps & Systems Economy', 'XR / Experimental Tech', 'Infrastructure & Scale'
        ]
    },
    {
        id: 'esports',
        title: 'ESPORTS, PLAY & PERFORMANCE',
        description: 'Compete, coach, analyze, or officiate games.',
        roles: [
            'Professional Gamer', 'Esports Coach', 'Esports Analyst', 'Shoutcaster / Commentator',
            'AI Match Referee', 'Esports Data Scientist', 'Virtual Crowd Experience Designer',
            'Fan Engagement Engineer', 'Esports Integrity Officer'
        ],
        skillGroups: [
            'Mechanical Skill', 'Game Sense & Strategy', 'Communication & Teamplay',
            'Leadership & Shotcalling', 'Coaching & Player Development', 'Analysis & Review',
            'Broadcast & Commentary', 'Rules, Fair Play & Integrity'
        ]
    },
    {
        id: 'content-media',
        title: 'CONTENT, MEDIA & COMMUNITY',
        description: 'Create content, manage communities, and engage audiences.',
        roles: [
            'Streamer', 'Gaming YouTuber', 'Video Producer / Editor', 'Gaming Podcaster',
            'Influencer / Brand Ambassador', 'Game Journalist', 'Community Manager',
            'Social Media Manager', 'Marketing Specialist', 'Public Relations (PR) Manager',
            'Event Manager', 'Partnership Manager', 'Community-Driven Game Curator',
            'UGC Ecosystem Architect', 'Creator Economy Game Designer', 'Fan-Driven Story Moderator',
            'Interactive IP Expansion Designer'
        ],
        skillGroups: [
            'Content Creation', 'Live Performance', 'Storytelling & Presentation',
            'Community Management', 'Audience Engagement', 'Growth & Distribution',
            'Event Hosting & Moderation', 'Brand Collaboration'
        ]
    },
    {
        id: 'business-strategy',
        title: 'BUSINESS, STRATEGY & FUTURE SYSTEMS',
        description: 'Plan, manage, monetize, and govern gaming projects.',
        roles: [
            'Game Producer', 'Project Manager', 'Game Publisher', 'Business Development Manager',
            'Game Licensing Specialist', 'Investor / Entrepreneur', 'Digital Asset Economist',
            'In-Game Central Bank Designer', 'Tokenized Reward Systems Architect', 'Virtual Taxation Designer',
            'Player-to-Player Economy Analyst', 'Virtual Economy Regulator', 'Digital Society Designer',
            'Reputation System Designer', 'Player Dispute Resolution Manager', 'Gaming Lawyer',
            'Virtual Property Rights Specialist', 'Digital Identity & Ownership Lawyer',
            'Algorithm Transparency Auditor', 'Child Safety Policy Designer',
            'Cross-Border Digital Law Consultant', 'Chief Metaverse Officer',
            'Virtual Civilization Strategist', 'Playable Society Designer', 'Digital Reality Product Strategist'
        ],
        skillGroups: [
            'Production & Project Management', 'Business Development & Partnerships',
            'Monetization & Economy Design', 'Publishing & Distribution Strategy',
            'Operations & Scaling', 'Governance, Policy & Compliance', 'Trust, Safety & Ethics',
            'Future Systems & Strategic Design'
        ]
    },
    {
        id: 'art-visual',
        title: 'ART, VISUAL & CHARACTER DESIGN',
        description: 'Create the visual identity and assets of games.',
        roles: [
            'Concept Artist', 'Character Artist', 'Environment Artist', '3D Modeler',
            'Texture Artist', 'Animator', 'VFX Artist', 'Rigging Artist', 'Avatar Identity Designer',
            'Mixed Reality Environment Designer', 'Haptic Experience Designer'
        ],
        skillGroups: [
            'Character Design & Anatomy', 'Concept Art & Ideation', 'Environment & World Art',
            'Illustration & Composition', '3D Modeling & Sculpting', 'Texturing & Materials',
            'Animation & Motion', 'VFX & Visual Effects', 'Visual Storytelling'
        ]
    },
    {
        id: 'writing-narrative',
        title: 'WRITING, NARRATIVE & EDITORIAL',
        description: 'Write stories, dialogue, analysis, and documentation.',
        roles: [
            'Game Writer', 'Narrative Designer', 'Localization Writer', 'AI Narrative Generator',
            'Emotional Experience Designer', 'Player Psychology Engineer',
            'Digital Addiction Mitigation Specialist', 'Neuro-Gaming Researcher',
            'Mental Health Game Designer', 'Game-Based Learning Architect', 'Virtual Campus Designer',
            'Corporate Training Game Designer', 'Skill-to-Career Mapping Designer',
            'Playable Resume Architect', 'Human-AI Interaction Philosopher'
        ],
        skillGroups: [
            'Narrative Design & Structure', 'Dialogue & Character Voice', 'World-Building & Lore',
            'Editorial & Critical Analysis', 'Research & Fact-Checking', 'Technical & System Writing',
            'Player Psychology & Emotion', 'Educational & Instructional Writing'
        ]
    },
    {
        id: 'music-audio',
        title: 'MUSIC, AUDIO & SOUND DESIGN',
        description: 'Create music, sound effects, and voice experiences.',
        roles: [
            'Sound Designer', 'Composer', 'Audio Engineer', 'Voice Actor', 'Foley Artist',
            'Adaptive Audio Designer'
        ],
        skillGroups: [
            'Music Composition', 'Sound Design (SFX)', 'Adaptive / Interactive Audio',
            'Mixing & Mastering', 'Voice Recording & Direction', 'Audio Implementation',
            'Audio Storytelling & Emotion'
        ]
    },
];

export const SKILL_LEVELS = ['Learning', 'Basic', 'Competent', 'Advanced', 'Expert'];

export const PROOF_TYPES = [
    'Portfolio link', 'File upload', 'Video / demo link', 'Code repo', 'Gameplay clip',
];

export const DUMMY_SKILLS = [
    { id: 1, category: 'Character Anatomy', name: 'Stylized Character Anatomy', verified: false, profileId: 'art-visual' },
    { id: 2, category: 'Stylized Rendering', name: 'Ambient Occlusion Baking', verified: true, profileId: 'art-visual' },
    { id: 3, category: 'Programming', name: 'UE5 Blueprint Systems', verified: true, profileId: 'game-creation' },
    { id: 4, category: 'Mechanical Skill', name: 'Aim & Tracking', verified: true, profileId: 'esports' },
];

export const DUMMY_PROJECTS = [
    {
        id: 1, type: 'Personal Project', status: 'Completed',
        title: 'STYLIZED CHARACTER CONCEPT SET',
        description: 'A set of stylized character concepts exploring anatomy, proportion, and silhouette.',
        skills: ['Stylized Character Anatomy', 'Concept Art & Ideation'],
        contact: 'mail: xyz@gmail.com',
        profileId: 'art-visual'
    },
];

export const DUMMY_FACADE_STATS = [
    { id: 'esports', views: 4200, interactions: 1200, score: 88, status: 'Active' },
    { id: 'art-visual', views: 8900, interactions: 3400, score: 94, status: 'Active' },
    { id: 'game-creation', views: 1200, interactions: 450, score: 76, status: 'Hidden' },
    { id: 'content-media', views: 6700, interactions: 2100, score: 82, status: 'Draft' },
];

export const DUMMY_PLATFORM_HISTORY = [
    { id: 1, type: 'milestone', text: 'Achieved "Radiant" rank in Valorant', facade: 'Esports', date: '2h ago' },
    { id: 2, type: 'upload', text: 'Uploaded 5 new Concept Sketches', facade: 'Artist', date: '5h ago' },
    { id: 3, type: 'certification', text: 'Skill "UE5 Blueprinting" verified by Gzone', facade: 'Dev', date: '1d ago' },
    { id: 4, type: 'social', text: 'Gained 200 followers on integrated Twitch', facade: 'Creator', date: '2d ago' },
    { id: 5, type: 'project', text: 'Started "Project: Neon Strife" Devlog', facade: 'Dev', date: '3d ago' },
];

export const DUMMY_ACTIVITY = [
    { id: 1, title: 'EXPLORING STYLIZED FACIAL PROPORTIONS', profileId: 'art-visual' },
    { id: 2, title: 'OPTIMIZING NETWORK LATENCY IN UE5', profileId: 'game-creation' },
];

export const PROFILE_STATUS_ITEMS = [
    { label: 'SKILLS', status: '4 ADDED' },
    { label: 'SKILL VERIFICATION', status: '2 PENDING' },
    { label: 'TOOLS & WORKFLOW', status: '8 CONFIGURED' },
    { label: 'PROJECTS & PROOF OF WORK', status: '1 PUBLISHED' },
    { label: 'AVAILABILITY & ENGAGEMENT', status: 'ACTIVE (LFG)' },
    { label: 'POSTS & MEDIA', status: 'WEEKLY TRENDING' },
];

