import axios from 'axios';
import { StorageService } from '../utils/storage';

const API_BASE_URL = 'http://app.undefineddevelopers.online/empowering/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Bearer token
apiClient.interceptors.request.use(
  async config => {
    const token = await StorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear tokens
      await StorageService.clearTokens();
      // Optionally navigate to login screen
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
