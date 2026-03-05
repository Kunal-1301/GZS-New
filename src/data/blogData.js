import placeholderWhite from '@assets/images/placeholderWhite.svg';

// Dummy Database: Blog Posts
export const blogPosts = [
    {
        id: 1,
        title: 'The Future of Open-World Gaming',
        description: 'Exploring how next-gen hardware is pushing the boundaries of open-world game design with larger maps, better AI, and seamless multiplayer integration.',
        image: placeholderWhite,
        likes: 2453,
        category: 'Industry',
        author: 'Alex Chen',
        date: '2026-02-15',
        readTime: '8 min read',
        highlighted: true,
    },
    {
        id: 2,
        title: 'Top 10 Indie Games to Watch in 2026',
        description: 'From pixel art masterpieces to narrative-driven adventures, these indie titles are set to make waves this year.',
        image: placeholderWhite,
        likes: 1876,
        category: 'Reviews',
        author: 'Sarah Martinez',
        date: '2026-02-12',
        readTime: '6 min read',
        highlighted: true,
    },
    {
        id: 3,
        title: 'Mastering Competitive FPS: Pro Tips',
        description: 'Learn the strategies and techniques used by professional esports players to dominate in competitive shooters.',
        image: placeholderWhite,
        likes: 3211,
        category: 'Guides',
        author: 'Mike Thompson',
        date: '2026-02-10',
        readTime: '12 min read',
        highlighted: false,
    },
    {
        id: 4,
        title: 'The Rise of Cloud Gaming Services',
        description: 'How streaming technology is changing the way we play and what it means for the future of game ownership.',
        image: placeholderWhite,
        likes: 1542,
        category: 'Industry',
        author: 'Emma Wilson',
        date: '2026-02-08',
        readTime: '7 min read',
        highlighted: false,
    },
    {
        id: 5,
        title: 'Building Your Ultimate Gaming Setup',
        description: 'A comprehensive guide to creating the perfect gaming environment, from monitors to peripherals and everything in between.',
        image: placeholderWhite,
        likes: 2187,
        category: 'Hardware',
        author: 'David Park',
        date: '2026-02-05',
        readTime: '10 min read',
        highlighted: false,
    },
    {
        id: 6,
        title: 'Retro Gaming Revival: Why Old is Gold',
        description: 'The nostalgia wave is stronger than ever. Discover why classic games are making a massive comeback.',
        image: placeholderWhite,
        likes: 1893,
        category: 'Culture',
        author: 'Lisa Johnson',
        date: '2026-02-03',
        readTime: '5 min read',
        highlighted: false,
    },
    {
        id: 7,
        title: 'VR Gaming: Beyond the Hype',
        description: 'A realistic look at where virtual reality gaming stands today and what improvements are needed for mainstream adoption.',
        image: placeholderWhite,
        likes: 1234,
        category: 'Technology',
        author: 'James Lee',
        date: '2026-02-01',
        readTime: '9 min read',
        highlighted: false,
    },
    {
        id: 8,
        title: 'The Art of Game Sound Design',
        description: 'How audio engineers create immersive soundscapes that bring virtual worlds to life.',
        image: placeholderWhite,
        likes: 987,
        category: 'Behind the Scenes',
        author: 'Rachel Kim',
        date: '2026-01-28',
        readTime: '6 min read',
        highlighted: false,
    },
];

// Dummy Database: Gallery Images (for horizontal scroll section)
export const galleryImages = [
    { id: 1, title: 'Cyberpunk City', image: placeholderWhite, category: 'Sci-Fi' },
    { id: 2, title: 'Fantasy Realm', image: placeholderWhite, category: 'RPG' },
    { id: 3, title: 'Racing Thunder', image: placeholderWhite, category: 'Racing' },
    { id: 4, title: 'Battle Royale', image: placeholderWhite, category: 'Action' },
    { id: 5, title: 'Space Odyssey', image: placeholderWhite, category: 'Adventure' },
    { id: 6, title: 'Horror Mansion', image: placeholderWhite, category: 'Horror' },
    { id: 7, title: 'Sports Arena', image: placeholderWhite, category: 'Sports' },
    { id: 8, title: 'Puzzle Dimensions', image: placeholderWhite, category: 'Puzzle' },
];

// Categories for filtering
export const categories = [
    'All',
    'Industry',
    'Reviews',
    'Guides',
    'Hardware',
    'Culture',
    'Technology',
    'Behind the Scenes',
];

// Sort options
export const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'oldest', label: 'Oldest' },
];

// Blog types for write blog form
export const blogTypes = [
    'Article',
    'Guide',
    'Review',
    'Listicle',
    'Opinion',
    'News',
    'Interview',
];
