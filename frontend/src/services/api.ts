import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Updated to point to Spring Boot backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach auth headers
api.interceptors.request.use(
  (config) => {
    // Check for stored credentials
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('tempPassword');
    
    if (email && password && !config.headers.Authorization) {
      config.headers.Authorization = `Basic ${btoa(`${email}:${password}`)}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      const status = error.response.status;
      
      switch (status) {
        case 400:
          errorMessage = error.response.data?.message || 'Bad request';
          break;
        case 401:
          errorMessage = 'Unauthorized - Please log in again';
          // If we get a 401, we should log the user out
          if (window.location.pathname !== '/login') {
            // Clear stored credentials
            localStorage.removeItem('email');
            localStorage.removeItem('tempPassword');
            // Redirect to login page after a short delay
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
          }
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 500:
          errorMessage = 'Server error - Please try again later';
          break;
        default:
          errorMessage = `Error ${status}: ${error.response.data?.message || 'Something went wrong'}`;
      }
    } else if (error.request) {
      // Request was made but no response was received
      errorMessage = 'No response from server - Please check your connection';
    }
    
    // Only show toast for non-auth errors (auth component will handle those)
    if (!error.config.url.includes('/login')) {
      toast.error(errorMessage);
    }
    
    return Promise.reject(error);
  }
);

export default api;