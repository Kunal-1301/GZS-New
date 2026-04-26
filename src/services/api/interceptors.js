import { STORAGE_KEYS } from '@/shared/constants/storage';
import { handleMockFallback } from './mockFallback';

const getRelativeUrl = (config = {}) => {
    const url = config.url || '';
    const baseURL = config.baseURL || '';

    if (baseURL && url.startsWith(baseURL)) {
        return url.slice(baseURL.length);
    }

    return url;
};

export const applyInterceptors = (client) => {
    client.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    client.interceptors.response.use(
        (response) => response.data,
        async (error) => {
            const { config = {}, response } = error;
            const relativeUrl = getRelativeUrl(config);
            const shouldTryMock =
                !response ||
                (response.status >= 400 && response.status < 600) ||
                error.code === 'ECONNREFUSED' ||
                error.code === 'ETIMEDOUT' ||
                error.code === 'ERR_NETWORK';

            console.log('[API] Request failed:', {
                method: config.method,
                url: relativeUrl,
                baseURL: config.baseURL,
                params: config.params,
                status: response?.status,
                errorCode: error.code,
                errorMessage: error.message,
            });

            if (shouldTryMock) {
                try {
                    const mockData = await handleMockFallback(
                        config.method,
                        relativeUrl,
                        config.data,
                        config.params,
                    );

                    if (mockData !== null && mockData !== undefined) {
                        console.log('[API] Mock fallback successful for:', relativeUrl);
                        return mockData;
                    }
                } catch (fallbackError) {
                    console.error('[API] Mock fallback failed:', fallbackError);
                }
            }

            if (response?.status === 401) {
                window.dispatchEvent(new Event('gz-logout'));
            }

            return Promise.reject(error);
        },
    );

    return client;
};
