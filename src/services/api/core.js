import axios from 'axios';
import { applyInterceptors } from './interceptors';

const coreClient = axios.create({
    baseURL: import.meta.env.VITE_CORE_API_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const core = applyInterceptors(coreClient);
export default core;
