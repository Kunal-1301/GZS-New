/**
 * assets.js — Legacy re-export file
 *
 * Data has been split into focused domain files:
 *   src/data/images.js      — Image imports/exports
 *   src/data/blogData.js    — Blog posts, gallery, categories, sort options, blog types
 *   src/data/blogService.js — localStorage CRUD + utility functions
 *   src/data/gameData.js    — Game post data
 *
 * This file re-exports everything for backward compatibility.
 * Consumers should update their imports to use the domain files directly.
 */

// Images
export { images, default as placeholderWhite } from '../shared/data/images';

// Blog data
export { blogPosts, galleryImages, categories, sortOptions, blogTypes } from '../shared/data/blogData';

// Blog service (localStorage + utilities)
export {
  getUserBlogs,
  saveUserBlogs,
  generateDescription,
  calculateReadTime,
  formatDateForStorage,
  addUserBlog,
  getAllBlogs,
} from '../shared/data/blogService';

// Game data
export { gamePostData } from '../shared/data/gameData';
