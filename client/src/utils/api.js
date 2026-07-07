import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = process.env.BASE_URL || 10000;

const attachToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const handleUnauthorized = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

axios.interceptors.request.use(attachToken);
axios.interceptors.response.use(null, handleUnauthorized);

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(attachToken);
api.interceptors.response.use(null, handleUnauthorized);

export default api;