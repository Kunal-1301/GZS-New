import { core } from './core';

export const blogApi = {
    // Get all public blogs
    getPublicBlogs: () => core.get('/blogs/public'),

    // Get specific blog detail
    getBlogDetail: (id) => core.get(`/blogs/${id}`),

    // Create a new blog post (Requires Auth)
    createBlog: (data) => core.post('/blogs', data),
};
