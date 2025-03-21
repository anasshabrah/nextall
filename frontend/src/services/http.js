// File: C:\Users\hanos\nextall\frontend\src\services\http.js
import axios from 'axios';

/**
 * Helper to get the token from cookies.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} The cookie value or null.
 */
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

/**
 * Retrieves the token from cookies or localStorage.
 * Adjust this function based on where you store your token.
 */
function getToken() {
  if (typeof window !== 'undefined') {
    // Try to get the token from cookies
    const tokenFromCookie = getCookie('token');
    if (tokenFromCookie) {
      return tokenFromCookie;
    }
    // Fallback: try localStorage
    const tokenFromStorage = localStorage.getItem('token');
    return tokenFromStorage || '';
  }
  return '';
}

const baseURL = process.env.BASE_URL;

const http = axios.create({
  baseURL: baseURL + `/api`,
  timeout: 30000,
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
