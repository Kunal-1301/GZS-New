/* 
  MOCK API SERVICE (PERSISTENCE LAYER)
  This service acts as the central "Source of Truth" for the application.
  In a real scenario, this would communicate with a SQL/NoSQL database.
*/

// --- PERSISTENCE HELPERS ---
const STORAGE_KEY = 'gz_mock_db';

const INITIAL_DATABASE = {
    users: [
        { id: 'U1', user: 'khali_gaming', type: 'Game Creation', created: '2026-03-01', status: 'Active', email: 'khali@example.com' },
        { id: 'U2', user: 'art_wizard', type: 'Art & Design', created: '2026-03-02', status: 'Active', email: 'art@example.com' },
        { id: 'U3', user: 'dev_pro', type: 'Programming', created: '2026-03-04', status: 'Pending', email: 'dev@example.com' },
        { id: 'U4', user: 'music_man', type: 'Music & Audio', created: '2026-02-28', status: 'Suspended', email: 'music@example.com' },
    ],
    proofs: [
        { id: 'P1', user: 'khali_gaming', subType: 'Game Creation', group: 'Unity', skill: 'C# Scripting', proofType: 'GitHub Link', submitted: '1 Hr Ago', status: 'Pending Review' },
        { id: 'P2', user: 'art_wizard', subType: 'Art & Design', group: '2D Art', skill: 'Character Sprites', proofType: 'Asset File', submitted: '3 Hrs Ago', status: 'Pending Review' },
        { id: 'P3', user: 'khali_gaming', subType: 'Game Creation', group: 'Level Design', skill: 'Greyboxing', proofType: 'Portfolio Link', submitted: '2 Days Ago', status: 'Approved' },
    ],
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
    activity: [
        { id: 'A1', user: 'khali_gaming', content: 'Added a new skill: Character Design', profile: 'Art & Design', date: '2 Hrs Ago', status: 'Active' },
        { id: 'A2', user: 'gamer_1', content: 'Verified skill: Unity Engine', profile: 'Game Creation', date: '1 Day Ago', status: 'Deleted' },
    ],
    results: [
        { id: 'R1', event: 'VALORANT WINTER SHOWDOWN', match: 'Grand Finals', winner: 'Team Liquid', runnerUp: 'Fnatic', score: '3 - 2', date: '2026-03-01' },
        { id: 'R2', event: 'CS2 MASTERS SERIES', match: 'Semi Finals', winner: 'G2 Esports', runnerUp: 'Vitality', score: '2 - 1', date: '2026-03-02' },
    ],
    sponsorships: [
        { id: 'S1', name: 'Red Bull', tier: 'Global Partner', event: 'All Majors', status: 'Active', valedUntil: '2026-12-31' },
        { id: 'S2', name: 'Logitech G', tier: 'Peripheral Partner', event: 'Valorant Series', status: 'Active', valedUntil: '2026-08-15' },
    ],
    community_posts: [
        { id: "01", title: "Best Settings for Valorant Ranked 2026", type: "Tips", status: "Published", updated: "1 Day Ago", author: "User123" },
        { id: "02", title: "My Journey from Silver to Diamond", type: "Story", status: "Published", updated: "3 Days Ago", author: "GamerX" },
        { id: "03", title: "Looking for teammates — APAC Servers", type: "LFG", status: "Published", updated: "5 Hrs Ago", author: "ProPlayer1" },
        { id: "04", title: "Is Apex Legends dying in 2026?", type: "Discussion", status: "Flagged", updated: "2 Days Ago", author: "User456" },
    ],
    registrations: [
        { id: 'REG1', user: 'team_phoenix5', tournament: 'VALORANT WINTER SHOWDOWN II 2026', team: 'Phoenix Five', members: 5, status: 'Pending', date: '2026-03-01' },
        { id: 'REG2', user: 'pro_gamer_99', tournament: 'CS2 MASTERS SERIES', team: 'Solo', members: 1, status: 'Approved', date: '2026-03-02' },
        { id: 'REG3', user: 'Team Titans', tournament: 'BGMI ROYALE INVITATIONAL', team: 'Titans E-Sports', members: 4, status: 'Pending', date: '2026-03-04' },
    ],
    reviews: [
        { id: "01", title: "Valorant — The Perfect Tactical Shooter", game: "Valorant", rating: "9/10", status: "Published", updated: "2 Days Ago", author: "Editor One" },
        { id: "02", title: "Cyberpunk 2077 Redeeming Arc 2025", game: "Cyberpunk", rating: "8/10", status: "Draft", updated: "4 Days Ago", author: "Admin Name" },
    ],
    brackets: [
        { id: 'B1', name: 'Valorant Cup - Group A', type: 'Double Elimination', size: '16 Teams', status: 'Active', event: 'Valorant Cup' },
        { id: 'B2', name: 'BGMI Invitational - Semis', type: 'Points Table', size: '20 Teams', status: 'Active', event: 'BGMI Invitational' },
        { id: 'B3', name: 'A Way Out - Race Bracket', type: 'Single Elimination', size: '8 Teams', status: 'Finished', event: 'A Way Out' },
    ]
};

// Load from LocalStorage or fallback to INITIAL
const loadDB = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATABASE;
};

const saveDB = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

let DB = loadDB();

export const mockApiService = {
    // RESET UTILITY
    resetDatabase: async () => {
        DB = INITIAL_DATABASE;
        saveDB(DB);
        return true;
    },

    // --- USERS ---
    getAllUsers: async () => [...DB.users],
    updateUser: async (id, data) => {
        DB.users = DB.users.map(u => u.id === id ? { ...u, ...data } : u);
        saveDB(DB);
        return true;
    },
    deleteUser: async (id) => {
        DB.users = DB.users.filter(u => u.id !== id);
        saveDB(DB);
        return true;
    },

    // --- PROOFS ---
    getAllProofs: async () => [...DB.proofs],
    updateProof: async (id, data) => {
        DB.proofs = DB.proofs.map(p => p.id === id ? { ...p, ...data } : p);
        saveDB(DB);
        return true;
    },

    // --- ACTIVITY ---
    getAllActivity: async () => [...DB.activity],
    deleteActivity: async (id) => {
        DB.activity = DB.activity.filter(a => a.id !== id);
        saveDB(DB);
        return true;
    },

    // --- TOURNAMENTS ---
    getPublicTournaments: async () => DB.tournaments.filter(t => t.is_public),
    getAllTournaments: async () => [...DB.tournaments],
    updateTournament: async (id, data) => {
        DB.tournaments = DB.tournaments.map(t => t.id === id ? { ...t, ...data } : t);
        saveDB(DB);
        return true;
    },
    addTournament: async (data) => {
        const newT = { ...data, id: Date.now() };
        DB.tournaments = [newT, ...DB.tournaments];
        saveDB(DB);
        return newT;
    },
    deleteTournament: async (id) => {
        DB.tournaments = DB.tournaments.filter(t => t.id !== id);
        saveDB(DB);
        return true;
    },

    // --- RESULTS ---
    getAllResults: async () => [...DB.results],
    addResult: async (data) => {
        const newR = { ...data, id: `R${Date.now()}` };
        DB.results = [newR, ...DB.results];
        saveDB(DB);
        return newR;
    },
    updateResult: async (id, data) => {
        DB.results = DB.results.map(r => r.id === id ? { ...r, ...data } : r);
        saveDB(DB);
        return true;
    },
    deleteResult: async (id) => {
        DB.results = DB.results.filter(r => r.id !== id);
        saveDB(DB);
        return true;
    },

    // --- SPONSORS ---
    getAllSponsors: async () => [...DB.sponsorships],
    addSponsor: async (data) => {
        const newS = { ...data, id: `S${Date.now()}` };
        DB.sponsorships = [newS, ...DB.sponsorships];
        saveDB(DB);
        return newS;
    },
    updateSponsor: async (id, data) => {
        DB.sponsorships = DB.sponsorships.map(s => s.id === id ? { ...s, ...data } : s);
        saveDB(DB);
        return true;
    },
    deleteSponsor: async (id) => {
        DB.sponsorships = DB.sponsorships.filter(s => s.id !== id);
        saveDB(DB);
        return true;
    },

    // --- REGISTRATIONS ---
    getAllRegistrations: async () => [...DB.registrations],
    updateRegistration: async (id, data) => {
        DB.registrations = DB.registrations.map(r => r.id === id ? { ...r, ...data } : r);
        saveDB(DB);
        return true;
    },
    deleteRegistration: async (id) => {
        DB.registrations = DB.registrations.filter(r => r.id !== id);
        saveDB(DB);
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
        saveDB(DB);
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
        saveDB(DB);
        return true;
    },
    deleteBlog: async (id) => {
        DB.blogs = DB.blogs.filter(b => b.id !== id);
        saveDB(DB);
        return true;
    },

    // --- BRACKETS ---
    getAllBrackets: async () => [...DB.brackets],
    addBracket: async (data) => {
        const newB = { ...data, id: `B${Date.now()}` };
        DB.brackets = [newB, ...DB.brackets];
        saveDB(DB);
        return newB;
    },
    updateBracket: async (id, data) => {
        DB.brackets = DB.brackets.map(b => b.id === id ? { ...b, ...data } : b);
        saveDB(DB);
        return true;
    },
    deleteBracket: async (id) => {
        DB.brackets = DB.brackets.filter(b => b.id !== id);
        saveDB(DB);
        return true;
    },

    // --- COMMUNITY POSTS ---
    getAllCommunityPosts: async () => [...DB.community_posts],
    updateCommunityPost: async (id, data) => {
        DB.community_posts = DB.community_posts.map(p => p.id === id ? { ...p, ...data } : p);
        saveDB(DB);
        return true;
    },
    deleteCommunityPost: async (id) => {
        DB.community_posts = DB.community_posts.filter(p => p.id !== id);
        saveDB(DB);
        return true;
    },

    // --- REVIEWS ---
    getAllReviews: async () => [...DB.reviews],
    updateReview: async (id, data) => {
        DB.reviews = DB.reviews.map(r => r.id === id ? { ...r, ...data } : r);
        saveDB(DB);
        return true;
    },
    deleteReview: async (id) => {
        DB.reviews = DB.reviews.filter(r => r.id !== id);
        saveDB(DB);
        return true;
    }
};



