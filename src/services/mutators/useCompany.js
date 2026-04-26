import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import companyService from '@/services/features/companyService';

export const useCompany = () => {
    const queryClient = useQueryClient();

    const useCompanyDetail = (slug) => {
        return useQuery({
            queryKey: ['company', slug],
            queryFn: () => companyService.getCompanyBySlug(slug),
            enabled: !!slug,
        });
    };

    const useMyCompany = () => {
        return useQuery({
            queryKey: ['company', 'me'],
            queryFn: companyService.getMyCompany,
        });
    };

    const useCompanyTeam = (slug) => {
        return useQuery({
            queryKey: ['company', slug, 'team'],
            queryFn: () => companyService.getTeam(slug),
            enabled: !!slug,
        });
    };

    const useOpenRoles = (slug) => {
        return useQuery({
            queryKey: ['company', slug, 'roles'],
            queryFn: () => companyService.getOpenRoles(slug),
            enabled: !!slug,
        });
    };

    const useCompanyAnalytics = (slug) => {
        return useQuery({
            queryKey: ['company', slug, 'analytics'],
            queryFn: () => companyService.getAnalytics(slug),
            enabled: !!slug,
        });
    };

    const useCreateCompany = () => {
        return useMutation({
            mutationFn: companyService.createCompany,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['company'] });
            },
        });
    };

    return {
        useCompanyDetail,
        useMyCompany,
        useCompanyTeam,
        useOpenRoles,
        useCompanyAnalytics,
        useCreateCompany,
    };
};
