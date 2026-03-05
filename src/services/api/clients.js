import axios from 'axios';

const createClient = (baseURL) => {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request Interceptor for Auth
    client.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('gz_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response Interceptor for Errors
    client.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response?.status === 401) {
                // Potential logout logic
                localStorage.removeItem('gz_token');
            }
            return Promise.reject(error);
        }
    );

    return client;
};

// FastAPI - Users, Profiles, Auth
export const fastapiClient = createClient(import.meta.env.VITE_FASTAPI_URL || '/api/v1');

// CMS - Games, Blogs, Esports, Admin
export const cmsClient = createClient(import.meta.env.VITE_CMS_URL || '/api/cms');

export default { fastapiClient, cmsClient };
