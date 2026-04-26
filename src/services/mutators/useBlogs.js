import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import blogsService from '../features/blogsService';

export const useBlogsList = (params = {}) =>
    useQuery({
        queryKey: ['blogs', params],
        queryFn: () => blogsService.getBlogs(params),
    });

export const useBlogBySlug = (slug) =>
    useQuery({
        queryKey: ['blog', slug],
        queryFn: () => blogsService.getBlogBySlug(slug),
        enabled: !!slug,
    });

export const useFeaturedBlogs = () =>
    useQuery({
        queryKey: ['blogs', 'featured'],
        queryFn: () => blogsService.getFeaturedBlogs(),
    });

export const useBlogCategories = () =>
    useQuery({
        queryKey: ['blogs', 'categories'],
        queryFn: () => blogsService.getCategories(),
    });

export const useLikeBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: blogsService.likeBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: blogsService.createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => blogsService.updateBlog(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['blog', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: blogsService.deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useBlogs = useBlogsList;
export const useBlog = useBlogBySlug;
