import cms from '@/services/api/cms';
import { CMS } from '@/services/api/endpoints';

const blogsService = {
    getBlogs: async (params = {}) => cms.get(CMS.BLOGS.LIST, { params }),

    getBlogBySlug: async (slug) => cms.get(CMS.BLOGS.BY_SLUG(slug)),

    getFeaturedBlogs: async () => cms.get(CMS.BLOGS.FEATURED),

    getCategories: async () => cms.get(CMS.BLOGS.CATEGORIES),

    likeBlog: async (slug) => cms.post(CMS.BLOGS.LIKE(slug)),

    createBlog: async (blogData) => cms.post(CMS.BLOGS.CREATE, blogData),

    updateBlog: async (id, blogData) => cms.put(CMS.BLOGS.UPDATE(id), blogData),

    deleteBlog: async (id) => cms.delete(CMS.BLOGS.DELETE(id)),
};

export default blogsService;
