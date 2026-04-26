import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../features/authService';
import profileService from '../features/profileService';
import { useAuth as useAuthContext } from '@/app/providers/AuthProvider';

export const useLogin = () => {
    const { login } = useAuthContext();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials) => authService.login(credentials),
        onSuccess: (data) => {
            if (data.access_token) {
                // Initialize context with token
                login(data.access_token);
                // Clear query cache to fetch new user data
                queryClient.clear();
            }
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (userData) => authService.register(userData),
    });
};

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: (token) => authService.verifyEmail(token),
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email) => authService.forgotPassword(email),
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: ({ token, password }) => authService.resetPassword(token, password),
    });
};
