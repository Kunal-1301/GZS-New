import { fastapiClient } from './clients';

export const blogApi = {
    // Get all public blogs
    getPublicBlogs: () => fastapiClient.get('/blogs/public'),

    // Get specific blog detail
    getBlogDetail: (id) => fastapiClient.get(`/blogs/${id}`),

    // Create a new blog post (Requires Auth)
    createBlog: (data) => fastapiClient.post('/blogs', data),
};
