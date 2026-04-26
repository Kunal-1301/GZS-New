import core from '@/services/api/core';
import { CORE } from '@/services/api/endpoints';

const authService = {
    login: async (credentials) => core.post(CORE.AUTH.LOGIN, credentials),

    register: async (userData) => core.post(CORE.AUTH.REGISTER, userData),

    logout: async () => core.post(CORE.AUTH.LOGOUT),

    refresh: async (refreshToken) => core.post(CORE.AUTH.REFRESH, refreshToken ? { refresh_token: refreshToken } : {}),

    verifyEmail: async (token) => core.post(CORE.AUTH.VERIFY_EMAIL, { token }),

    forgotPassword: async (email) => core.post(CORE.AUTH.FORGOT_PASSWORD, { email }),

    resetPassword: async (token, password) => core.post(CORE.AUTH.RESET_PASSWORD, { token, password }),
};

export default authService;
