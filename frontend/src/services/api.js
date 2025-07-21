import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
});

// Users API
export const fetchUsers = () => API.get('/users');
export const fetchTopUsers = (limit = 5) => API.get('/users/top', { params: { limit } });
export const createUser = (name) => API.post('/users', { name });

// Points API
export const claimPoints = (userId) => API.post('/points/claim', { userId });
export const fetchPointsHistory = (userId, page = 1, limit = 10) => {
  
  return API.get(`/points/history/${userId}`, { params: { page, limit } });
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
