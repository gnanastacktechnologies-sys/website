import axios from 'axios';

const normalizeApiBaseUrl = (rawValue) => {
  if (!rawValue) return 'http://localhost:5000/api/v1';

  let value = String(rawValue).trim();

  // Handle accidental full assignment paste like:
  // "VITE_API_BASE_URL=https:/example.com/api/v1"
  value = value.replace(/^\/?VITE_API_BASE_URL\s*=\s*/i, '');

  // Fix malformed protocol "https:/domain" -> "https://domain"
  value = value.replace(/^https:\/(?!\/)/i, 'https://');
  value = value.replace(/^http:\/(?!\/)/i, 'http://');

  // Remove trailing slash for consistent route joining
  value = value.replace(/\/+$/, '');

  return value || 'http://localhost:5000/api/v1';
};

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
