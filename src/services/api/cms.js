import axios from 'axios';
import { applyInterceptors } from './interceptors';

const cmsClient = axios.create({
    baseURL: import.meta.env.VITE_CMS_API_URL || 'http://localhost:8080/api/cms',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000, // 3 second timeout to prevent hanging when backend is down
});

export const cms = applyInterceptors(cmsClient);
export default cms;
