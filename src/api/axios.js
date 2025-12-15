import axios from 'axios';
import { API_BASE_URL } from '../utils/constant';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_EXCLUDED_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh-token',
];

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      // Network / CORS / server-down error
      return Promise.reject(error);
    }
    // If error is 401 and we haven't tried to refresh yet
    const { status } = error.response;

    const isAuthRoute = AUTH_EXCLUDED_ROUTES.some((route) =>
      originalRequest.url.includes(route)
    );

    // ❌ Do NOT refresh for login/register/refresh routes
    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post('/auth/refresh-token');
        const newAccessToken = data.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;