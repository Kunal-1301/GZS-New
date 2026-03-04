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
    ]
};

export const mockApiService = {
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
    }
};
