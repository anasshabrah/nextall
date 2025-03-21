// File: C:\Users\hanos\nextall\frontend\src\services\http.js
import axios from 'axios';

const baseURL = process.env.BASE_URL;

const http = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 30000,
  withCredentials: true,
});

// Request interceptor: attach token from localStorage if available
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: catch 401 errors, remove token and redirect to login
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Redirect the user to login page when unauthorized
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default http;
