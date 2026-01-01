import axios from 'axios';

const API_BASE_URL = 'http://app.undefineddevelopers.online/empowering/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
