import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mentor-mentee-yemf.onrender.com/api',
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
