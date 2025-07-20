import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Correct base URL
  timeout: 5000, // Recommended timeout
});

// Users API - Note the '/users' prefix is already in baseURL
export const fetchUsers = () => API.get('/users'); // Correct (calls /api/users)
export const fetchTopUsers = (limit = 5) => API.get('/users/top', { params: { limit } }); // Better parameter handling
export const createUser = (name) => API.post('/users', { name }); // Correct

// Points API - Must include full path since baseURL is /api
export const claimPoints = (userId) => API.post('/points/claim', { userId }); // Will call /api/points/claim
export const fetchPointsHistory = (userId) => API.get(`/points/history/${userId}`); // Will call /api/points/history/:userId

// Add response interceptor for consistent error handling
API.interceptors.response.use(
  response => response.data, // Directly return the data
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default API;