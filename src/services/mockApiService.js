/* 
  MOCK API SERVICE (PERSISTENCE LAYER)
  This service acts as the central "Source of Truth" for the application.
  In a real scenario, this would communicate with a SQL/NoSQL database.
*/

// Mutable "Database"
let DB = {
    tournaments: [
        { id: 1, name: 'VALORANT WINTER SHOWDOWN II 2026', game: 'VALORANT', prize: '50,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '32', date: '2026-12-20', is_public: true },
        { id: 2, name: 'CS2 MASTERS SERIES', game: 'CS2', prize: '30,000 INR', status: 'ONGOING', type: 'INVITATIONAL', slots: '16', date: '2026-11-15', is_public: true },
        { id: 3, name: 'BGMI ROYALE INVITATIONAL', game: 'BGMI', prize: '25,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '64', date: '2027-01-05', is_public: false },
        { id: 4, name: 'APEX LEGENDS CLASH', game: 'APEX', prize: '15,000 INR', status: 'COMPLETED', type: 'OPEN', slots: '32', date: '2026-10-10', is_public: true },
        { id: 5, name: 'FREE FIRE SURVIVAL', game: 'FREE FIRE', prize: '20,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '48', date: '2027-02-12', is_public: false },
        { id: 6, name: 'EAFC 26 KNOCKOUT', game: 'FIFA', prize: '10,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '16', date: '2026-12-25', is_public: true },
    ],
    games: [
        { id: 101, title: "Uncharted 4: A Thief's End", status: "Published", featured: true, genre: "Action-Adventure", date: '2024-05-10', author: 'Gzone Admin', slug: 'uncharted-4', platform: 'PS4/PS5', description: 'Experience the thrilling conclusion to Nathan Drake’s treasure-hunting journey with stunning visuals and cinematic gameplay.' },
        { id: 102, title: "Detroit: Become Human", status: "Published", featured: true, genre: "Adventure", date: '2024-05-12', author: 'Gzone Admin', slug: 'detroit-human', platform: 'PC/PS4', description: 'Experience a near-future metropolis where human-like androids begin to develop feelings and challenge their programming.' },
        { id: 103, title: "A Way Out", status: "Draft", featured: false, genre: "Co-op Action", date: '2024-05-15', author: 'Moderator', slug: 'a-way-out', platform: 'PC/Console', description: 'A unique co-op experience where two players must work together to escape prison and stay on the run.' },
        { id: 104, title: "Marvel's Spider-Man Remastered", status: "Published", featured: false, genre: "Action", date: '2024-05-20', author: 'Gzone Admin', slug: 'spiderman-remastered', platform: 'PC/PS5', description: 'Experience the original wall-crawler story with enhanced visuals and all DLCs included in this definitive remaster.' },
    ],
    blogs: [
        { id: 201, title: 'The Future of Open-World Gaming', category: 'Industry', status: 'Published', featured: true, updated: '2024-05-21', author: 'Editor', likes: 124, description: 'How artificial intelligence and procedural generation are reshaping the way we explore virtual worlds.' },
        { id: 202, title: 'Top 10 Indie Games 2026', category: 'Reviews', status: 'Published', featured: true, updated: '2024-05-22', author: 'Gzone Admin', likes: 89, description: 'Our curated list of the most innovative and artistic independent titles that stole the spotlight this year.' },
        { id: 203, title: 'VR Gaming: Beyond the Hype', category: 'Technology', status: 'Draft', featured: false, updated: '2024-05-23', author: 'Tech Writer', likes: 45, description: 'Is Virtual Reality finally ready for the mainstream? We look at the latest hardware and software breakthroughs.' },
    ],
    proofs: [
        { id: 'P1', user: 'khali_gaming', subType: 'Game Creation', group: 'Unity', skill: 'C# Scripting', proofType: 'GitHub Link', submitted: '1 Hr Ago', status: 'Pending Review' },
        { id: 'P2', user: 'art_wizard', subType: 'Art & Design', group: '2D Art', skill: 'Character Sprites', proofType: 'Asset File', submitted: '3 Hrs Ago', status: 'Pending Review' },
        { id: 'P3', user: 'khali_gaming', subType: 'Game Creation', group: 'Level Design', skill: 'Greyboxing', proofType: 'Portfolio Link', submitted: '2 Days Ago', status: 'Approved' },
    ],
    activity: [
        { id: 'A1', user: 'khali_gaming', content: 'Added a new skill: Character Design', profile: 'Art & Design', date: '2 Hrs Ago', status: 'Active' },
        { id: 'A2', user: 'gamer_1', content: 'Verified skill: Unity Engine', profile: 'Game Creation', date: '1 Day Ago', status: 'Deleted' },
    ],
    communityPosts: [
        { id: "01", title: "Best Settings for Valorant Ranked 2026", type: "Tips", status: "Published", updated: "1 Day Ago", author: "User123" },
        { id: "02", title: "My Journey from Silver to Diamond", type: "Story", status: "Published", updated: "3 Days Ago", author: "GamerX" },
        { id: "03", title: "Looking for teammates — APAC Servers", type: "LFG", status: "Published", updated: "5 Hrs Ago", author: "ProPlayer1" },
        { id: "04", title: "Is Apex Legends dying in 2026?", type: "Discussion", status: "Flagged", updated: "2 Days Ago", author: "User456" },
        { id: "05", title: "Community Event — Weekly Challenge", type: "Event", status: "In Review", updated: "6 Hrs Ago", author: "Admin Name" },
        { id: "06", title: "New cheat detected?? See this video", type: "Discussion", status: "Flagged", updated: "1 Hr Ago", author: "ToxicGamer99" },
    ],
    users: [
        { id: 'U1', user: 'khali_gaming', type: 'Game Creation & Development', created: '2026-03-01', status: 'Active' },
        { id: 'U2', user: 'art_wizard', type: 'Art, Visual & Character Design', created: '2026-03-02', status: 'Active' },
        { id: 'U3', user: 'content_king', type: 'Content, Media & Community', created: '2026-03-04', status: 'Pending' },
        { id: 'U4', user: 'strategy_fix', type: 'Business, Strategy & Future Systems', created: '2026-02-28', status: 'Active' },
    ],
    organizations: [
        { id: 'O1', name: 'Gzone Studios', industry: 'Game Dev', created: '2025-10-10', status: 'Active' },
        { id: 'O2', name: 'Esports League India', industry: 'Esports', created: '2026-01-15', status: 'Active' },
    ],
    brackets: [
        { id: 'B1', name: 'Valorant Cup - Group A', type: 'Double Elimination', size: '16 Teams', status: 'Active', event: 'Valorant Cup' },
        { id: 'B2', name: 'BGMI Invitational - Semis', type: 'Points Table', size: '20 Teams', status: 'Active', event: 'BGMI Invitational' },
    ],
    results: [
        { id: 'R1', team: 'Team Hydra', event: 'Valorant Cup', rank: '#1 Winner', prize: '$10,000', status: 'Finalized' },
        { id: 'R2', team: 'GodLike Esports', event: 'BGMI Invitational', rank: '#2 RunnerUp', prize: '$5,000', status: 'Pending' },
    ],
    sponsors: [
        { id: 'S1', name: 'Red Bull', tier: 'Global Partner', commitment: '$50,000', status: 'Active', event: 'All' },
        { id: 'S2', name: 'Intel', tier: 'Tech Partner', commitment: '$30,000', status: 'Active', event: 'Valorant Cup' },
    ],
    registrations: [
        { id: 'REG1', team: 'Global Esports', event: 'Valorant Cup', player: 'SkRossi', status: 'Verified', date: '2026-03-01' },
        { id: 'REG2', team: 'Team Soul', event: 'BGMI Invitational', player: 'Mortal', status: 'Pending', date: '2026-03-02' },
        { id: 'REG3', team: 'GodLike', event: 'BGMI Invitational', player: 'Jonathan', status: 'Verified', date: '2026-03-03' },
    ],
    reviews: [
        { id: "01", title: "Valorant — The Perfect Tactical Shooter", game: "Valorant", rating: "9/10", status: "Published", updated: "2 Days Ago", author: "Editor One" },
        { id: "02", title: "Cyberpunk 2077 Redeeming Arc 2025", game: "Cyberpunk", rating: "8/10", status: "Draft", updated: "4 Days Ago", author: "Admin Name" },
        { id: "03", title: "God of War Ragnarok — Epic Conclusion", game: "GoW Ragnarok", rating: "10/10", status: "Published", updated: "1 Week Ago", author: "Editor Two" },
    ]
};

export const mockApiService = {
    // --- ESPORTS EXTENSIONS ---
    getAllBrackets: async () => [...DB.brackets],
    updateBracket: async (id, data) => { DB.brackets = DB.brackets.map(b => b.id === id ? { ...b, ...data } : b); return true; },
    deleteBracket: async (id) => { DB.brackets = DB.brackets.filter(b => b.id !== id); return true; },

    getAllResults: async () => [...DB.results],
    updateResult: async (id, data) => { DB.results = DB.results.map(r => r.id === id ? { ...r, ...data } : r); return true; },
    deleteResult: async (id) => { DB.results = DB.results.filter(r => r.id !== id); return true; },

    getAllSponsors: async () => [...DB.sponsors],
    updateSponsor: async (id, data) => { DB.sponsors = DB.sponsors.map(s => s.id === id ? { ...s, ...data } : s); return true; },
    deleteSponsor: async (id) => { DB.sponsors = DB.sponsors.filter(s => s.id !== id); return true; },

    getAllRegistrations: async () => [...DB.registrations],
    updateRegistration: async (id, data) => { DB.registrations = DB.registrations.map(r => r.id === id ? { ...r, ...data } : r); return true; },
    deleteRegistration: async (id) => { DB.registrations = DB.registrations.filter(r => r.id !== id); return true; },

    getAllReviews: async () => [...DB.reviews],
    updateReview: async (id, data) => { DB.reviews = DB.reviews.map(r => r.id === id ? { ...r, ...data } : r); return true; },
    deleteReview: async (id) => { DB.reviews = DB.reviews.filter(r => r.id !== id); return true; },

    // --- USERS & ORGS ---
    getAllUsers: async () => [...DB.users],
    updateUser: async (id, data) => { DB.users = DB.users.map(u => u.id === id ? { ...u, ...data } : u); return true; },
    deleteUser: async (id) => { DB.users = DB.users.filter(u => u.id !== id); return true; },

    getAllOrganizations: async () => [...DB.organizations],
    updateOrganization: async (id, data) => { DB.organizations = DB.organizations.map(o => o.id === id ? { ...o, ...data } : o); return true; },
    deleteOrganization: async (id) => { DB.organizations = DB.organizations.filter(o => o.id !== id); return true; },
    // --- TOURNAMENTS ---
    getPublicTournaments: async () => DB.tournaments.filter(t => t.is_public),
    getAllTournaments: async () => [...DB.tournaments],
    updateTournament: async (id, data) => {
        DB.tournaments = DB.tournaments.map(t => t.id === id ? { ...t, ...data } : t);
        return true;
    },
    addTournament: async (data) => {
        const newT = { ...data, id: Date.now() };
        DB.tournaments = [newT, ...DB.tournaments];
        return newT;
    },
    deleteTournament: async (id) => {
        DB.tournaments = DB.tournaments.filter(t => t.id !== id);
        return true;
    },

    // --- GAMES ---
    getPublicGames: async (onlyFeatured = false) => {
        let list = DB.games.filter(g => g.status === 'Published');
        if (onlyFeatured) list = list.filter(g => g.featured);
        return list;
    },
    getAllGames: async () => [...DB.games],
    updateGame: async (id, data) => {
        DB.games = DB.games.map(g => g.id === id ? { ...g, ...data } : g);
        return true;
    },

    // --- BLOGS ---
    getPublicBlogs: async (onlyFeatured = false) => {
        let list = DB.blogs.filter(b => b.status === 'Published');
        if (onlyFeatured) list = list.filter(b => b.featured);
        return list;
    },
    getAllBlogs: async () => [...DB.blogs],
    updateBlog: async (id, data) => {
        DB.blogs = DB.blogs.map(b => b.id === id ? { ...b, ...data } : b);
        return true;
    },
    addBlog: async (data) => {
        const newB = { ...data, id: Date.now() };
        DB.blogs = [newB, ...DB.blogs];
        return newB;
    },
    deleteBlog: async (id) => {
        DB.blogs = DB.blogs.filter(b => b.id !== id);
        return true;
    },
    addGame: async (data) => {
        const newG = { ...data, id: Date.now() };
        DB.games = [newG, ...DB.games];
        return newG;
    },
    deleteGame: async (id) => {
        DB.games = DB.games.filter(g => g.id !== id);
        return true;
    },

    // --- PROFILES & PROOFS ---
    getAllSkillProofs: async () => [...DB.proofs],
    updateSkillProof: async (id, data) => {
        DB.proofs = DB.proofs.map(p => p.id === id ? { ...p, ...data } : p);
        return true;
    },
    addSkillProof: async (data) => {
        const newP = { ...data, id: 'P' + Date.now(), submitted: 'Just Now', status: 'Pending Review' };
        DB.proofs = [newP, ...DB.proofs];
        return newP;
    },
    getAllActivity: async () => [...DB.activity],
    addActivity: async (data) => {
        const newA = { ...data, id: 'A' + Date.now(), date: 'Just Now', status: 'Active' };
        DB.activity = [newA, ...DB.activity];
        return newA;
    },
    deleteActivity: async (id) => {
        DB.activity = DB.activity.filter(a => a.id !== id);
        return true;
    },

    // --- COMMUNITY ---
    getAllCommunityPosts: async () => [...DB.communityPosts],
    updateCommunityPost: async (id, data) => {
        DB.communityPosts = DB.communityPosts.map(p => p.id === id ? { ...p, ...data } : p);
        return true;
    },
    deleteCommunityPost: async (id) => {
        DB.communityPosts = DB.communityPosts.filter(p => p.id !== id);
        return true;
    }
};
