// ── Profile Skill System Data ─────────────────────────────────────

export const SUB_PROFILES = [
    {
        id: 'dev',
        title: 'GAME CREATION & DEVELOPMENT',
        tagline: 'Build the systems, engines, and technical foundations of games.',
        description: 'Surface technical and systems capability. Allow skill-based hiring. Separate systems work from creative art.',
        roles: [
            'Game Designer', 'Gameplay Programmer', 'Systems Designer', 'Level Designer',
            'Engine Developer', 'AI Engineer', 'Network Engineer', 'LiveOps Manager',
            'VR/AR Developer', 'Multiplayer Architect', 'Cloud Gaming Specialist', 'Technical Artist'
        ],
        skillGroups: [
            'Gameplay Design & Mechanics', 'Programming & Scripting', 'Engine & Tools',
            'AI & Behaviour Systems', 'Multiplayer & Networking', 'Performance & Optimisation',
            'LiveOps & Systems Economy', 'XR / Experimental Tech'
        ],
    },
    {
        id: 'esports',
        title: 'ESPORTS, PLAY & PERFORMANCE',
        tagline: 'Compete, coach, analyse, and officiate at the highest level.',
        description: 'Surface competitive skill and strategic understanding. Standardise esports talent discovery.',
        roles: [
            'Professional Gamer', 'Esports Coach', 'Esports Analyst', 'Shoutcaster / Commentator',
            'Team IGL (In-Game Leader)', 'Referee / Match Official', 'Esports Data Scientist'
        ],
        skillGroups: [
            'Mechanical Skill', 'Game Sense & Strategy', 'Communication & Teamplay',
            'Leadership & Shotcalling', 'Coaching & Player Development', 'Analysis & Review',
            'Broadcast & Commentary', 'Rules, Fair Play & Integrity'
        ],
    },
    {
        id: 'content',
        title: 'CONTENT, MEDIA & COMMUNITY',
        tagline: 'Create, grow, and manage gaming audiences and communities.',
        description: 'Make audience-facing talent discoverable. Separate reach-based value from skill-based work.',
        roles: [
            'Streamer', 'Gaming YouTuber', 'Podcaster', 'Game Journalist',
            'Community Manager', 'Social Media Manager', 'Event Host / Moderator',
            'Influencer / Brand Ambassador', 'UGC Creator'
        ],
        skillGroups: [
            'Content Creation', 'Live Performance', 'Storytelling & Presentation',
            'Community Management', 'Audience Engagement', 'Growth & Distribution',
            'Event Hosting & Moderation', 'Brand Collaboration'
        ],
    },
    {
        id: 'business',
        title: 'BUSINESS, STRATEGY & FUTURE',
        tagline: 'Plan, fund, govern, and scale gaming products and systems.',
        description: 'Make decision-makers and operators discoverable. Formalise future-facing roles.',
        roles: [
            'Game Producer', 'Project / Programme Manager', 'Publisher',
            'Business Development Manager', 'Monetisation / Economy Designer', 'Investor / Entrepreneur',
            'Policy / Governance Specialist', 'Gaming Lawyer'
        ],
        skillGroups: [
            'Production & Project Management', 'Business Development & Partnerships',
            'Monetisation & Economy Design', 'Publishing & Distribution Strategy',
            'Operations & Scaling', 'Governance, Policy & Compliance'
        ],
    },
    {
        id: 'art',
        title: 'ART, VISUAL & CHARACTER DESIGN',
        tagline: 'Create the visual identity and assets that define how games look and feel.',
        description: 'Give artists a first-class career home. Separate visual craft from technical systems.',
        roles: [
            'Concept Artist', 'Character Artist', 'Environment Artist', '2D Artist',
            '3D Artist', 'Illustrator', 'Animator', 'VFX Artist', 'Rigging Artist',
            'Visual / UI Artist', 'Prop / Asset Artist'
        ],
        skillGroups: [
            'Character Design & Anatomy', 'Concept Art & Ideation', 'Environment & World Art',
            'Illustration & Composition', '3D Modelling & Sculpting', 'Texturing & Materials',
            'Animation & Motion', 'VFX & Visual Effects', 'Visual Storytelling'
        ],
    },
    {
        id: 'writing',
        title: 'WRITING, NARRATIVE & EDITORIAL',
        tagline: 'Write the stories, dialogue, and analysis that give games meaning.',
        description: 'Give writers a first-class career identity. Enable skill-based discovery for narrative talent.',
        roles: [
            'Game Writer', 'Narrative Designer', 'Dialogue Writer', 'Lore / Worldbuilding Writer',
            'Game Reviewer', 'Gaming Journalist', 'Editorial Writer', 'Technical Writer (Games)',
            'Localization Writer'
        ],
        skillGroups: [
            'Narrative Design & Structure', 'Dialogue & Character Voice', 'World-Building & Lore',
            'Editorial & Critical Analysis', 'Research & Fact-Checking', 'Technical & System Writing',
            'Player Psychology & Emotion', 'Educational & Instructional Writing'
        ],
    },
    {
        id: 'music',
        title: 'MUSIC, AUDIO & SOUND DESIGN',
        tagline: 'Design the sound, music, and voice that make games feel alive.',
        description: 'Give audio creators a first-class career identity. Enable skill-based discovery for audio talent.',
        roles: [
            'Music Composer (Games)', 'Music Producer (Gaming)', 'Sound Designer (SFX)',
            'Audio Engineer', 'Foley Artist', 'Voice Actor', 'Voice Director',
            'Adaptive / Interactive Audio Designer', 'Wwise / FMOD Implementation Specialist'
        ],
        skillGroups: [
            'Music Composition', 'Sound Design (SFX)', 'Adaptive / Interactive Audio',
            'Mixing & Mastering', 'Voice Recording & Direction', 'Audio Implementation',
            'Audio Storytelling & Emotion'
        ],
    },
];

export const SKILL_LEVELS = ['Learning', 'Basic', 'Competent', 'Advanced', 'Expert'];

export const PROOF_TYPES = [
    'Portfolio link', 'File upload', 'Video / demo link', 'Code repo', 'Gameplay clip',
];

export const DUMMY_SKILLS = [
    {
        id: 1,
        category: 'Character Design & Anatomy',
        name: 'Stylized Character Anatomy',
        verified: false,
        profileId: 'art',
        skillLevel: 'Advanced',
        verification_status: 'unverified',
        proof_urls: [],
    },
    {
        id: 2,
        category: 'Texturing & Materials',
        name: 'Ambient Occlusion Baking',
        verified: true,
        profileId: 'art',
        skillLevel: 'Expert',
        verification_status: 'verified',
        proof_urls: ['https://example.com/portfolio'],
    },
    {
        id: 3,
        category: 'Programming & Scripting',
        name: 'UE5 Blueprint Systems',
        verified: true,
        profileId: 'dev',
        skillLevel: 'Advanced',
        verification_status: 'verified',
        proof_urls: ['https://github.com/example/ue5-project'],
    },
    {
        id: 4,
        category: 'Mechanical Skill',
        name: 'Aim & Tracking',
        verified: true,
        profileId: 'esports',
        skillLevel: 'Expert',
        verification_status: 'verified',
        proof_urls: [],
    },
];

export const DUMMY_PROJECTS = [
    {
        id: 1,
        project_type: 'personal',
        status: 'completed',
        title: 'STYLIZED CHARACTER CONCEPT SET',
        description: 'A set of stylized character concepts exploring anatomy, proportion, and silhouette.',
        skill_tags: ['Stylized Character Anatomy', 'Concept Art & Ideation'],
        sub_profile_id: 'art',
        is_public: true,
        is_featured: true,
        thumbnail_url: 'https://picsum.photos/400/250?random=proj1',
    },
    {
        id: 2,
        project_type: 'professional',
        status: 'completed',
        title: 'TRUTH PROTOCOL',
        description: 'A decentralized verification system for competitive gaming infrastructure.',
        skill_tags: ['UE5 Blueprint Systems', 'Multiplayer & Networking'],
        sub_profile_id: 'dev',
        is_public: true,
        is_featured: false,
        thumbnail_url: 'https://picsum.photos/400/250?random=proj2',
    },
];
