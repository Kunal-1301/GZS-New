import placeholderWhite from '@assets/images/placeholderWhite.svg';
import { blogPosts } from './blogData';

// ============================================
// USER BLOGS - localStorage Service Layer
// ============================================
const USER_BLOGS_KEY = 'userBlogs';

/**
 * Blog Schema (matches blogPosts structure):
 * {
 *   id: number,           // Date.now() for user blogs
 *   title: string,
 *   description: string,  // Auto-generated from content
 *   image: string,        // placeholderWhite for user blogs
 *   likes: number,        // Starts at 0 for new blogs
 *   category: string,
 *   author: string,
 *   date: string,         // YYYY-MM-DD format
 *   readTime: string,     // Calculated from content length
 *   highlighted: boolean, // false for user blogs
 *   content: string,      // Full blog content (user blogs only)
 *   type: string,         // Blog type (user blogs only)
 * }
 */

/**
 * Get user-created blogs from localStorage
 */
export const getUserBlogs = () => {
    try {
        const stored = localStorage.getItem(USER_BLOGS_KEY);
        if (!stored) return [];
        return JSON.parse(stored);
    } catch (error) {
        console.error('Error reading user blogs:', error);
        return [];
    }
};

/**
 * Save user blogs to localStorage
 */
export const saveUserBlogs = (blogs) => {
    try {
        localStorage.setItem(USER_BLOGS_KEY, JSON.stringify(blogs));
        return true;
    } catch (error) {
        console.error('Error saving user blogs:', error);
        return false;
    }
};

/**
 * Generate description from content (first 150 chars)
 */
export const generateDescription = (content, maxLength = 150) => {
    if (!content) return '';
    const cleaned = content.replace(/\n/g, ' ').trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.slice(0, maxLength) + '...';
};

/**
 * Calculate read time based on content length
 * Average reading speed: 200 words per minute
 */
export const calculateReadTime = (content) => {
    if (!content) return '1 min read';
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
};

/**
 * Format date to YYYY-MM-DD
 */
export const formatDateForStorage = (date = new Date()) => {
    return date.toISOString().split('T')[0];
};

/**
 * Add a new user blog with correct schema
 */
export const addUserBlog = (blogData) => {
    const userBlogs = getUserBlogs();

    const newBlog = {
        id: Date.now(),
        title: blogData.title,
        description: generateDescription(blogData.content),
        image: placeholderWhite,
        likes: 0,
        category: blogData.category,
        author: blogData.author,
        date: formatDateForStorage(),
        readTime: calculateReadTime(blogData.content),
        highlighted: false,
        content: blogData.content,
        type: blogData.type,
        isUserCreated: true,
    };

    const updatedBlogs = [newBlog, ...userBlogs];
    saveUserBlogs(updatedBlogs);
    return newBlog;
};

/**
 * Get all blogs (static + user-created), sorted by date
 */
export const getAllBlogs = () => {
    const userBlogs = getUserBlogs();
    const allBlogs = [...userBlogs, ...blogPosts];
    return allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
};
