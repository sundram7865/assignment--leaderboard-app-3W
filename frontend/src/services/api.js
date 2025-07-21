import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // should be 'http://localhost:5000' in .env
  timeout: 5000,
});

// Users API
export const fetchUsers = () => API.get('/api/users');
export const fetchTopUsers = (limit = 5) => API.get('/api/users/top', { params: { limit } });
export const createUser = (name) => API.post('/api/users', { name });

// Points API
export const claimPoints = (userId) => API.post('/api/points/claim', { userId });
export const fetchPointsHistory = (userId='all', page = 1, limit = 10) => {
  return API.get(`/api/points/history/${userId}`, { params: { page, limit } });
};

// Global error handler
API.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default API;
