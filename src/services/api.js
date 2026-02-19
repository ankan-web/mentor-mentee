import axios from 'axios';

// Priority: 1. Vite env var, 2. Localhost for dev, 3. Render URL for prod
const baseURL = import.meta.env.VITE_API_URL 
  || (import.meta.env.DEV 
    ? 'http://localhost:5000/api' 
    : 'https://mentor-mentee-yemf.onrender.com/api');

console.log('API Base URL:', baseURL);

const api = axios.create({
  baseURL,
});

// 🔥 Restore token automatically on app load
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default api;
