import axios from 'axios';

// Use localhost for development, Render URL for production
const baseURL = import.meta.env.DEV 
  ? 'http://localhost:5000/api' 
  : 'https://mentor-mentee-yemf.onrender.com/api';

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
