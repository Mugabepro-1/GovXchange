import api from './api';

interface LoginResponse {
  id: string;
  email: string;
  role: string;
  address?: string;
  jobRole?: string;
  qualifications?: string[];
}

export const loginUser = async (email: string, password: string) => {
  try {
    // Create Basic Auth header
    const authHeader = `Basic ${btoa(`${email}:${password}`)}`;
    
    // Make login request
    const response = await api.post<LoginResponse>(
      '/auth/login', // Updated to match Spring Security endpoint
      {}, 
      {
        headers: {
          'Authorization': authHeader
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  // Check if we have stored credentials
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('tempPassword');
  
  if (!email || !password) return null;
  
  try {
    // Create Basic Auth header
    const authHeader = `Basic ${btoa(`${email}:${password}`)}`;
    
    // Get current user info
    const response = await api.get<LoginResponse>(
      '/users/me', // Updated to match Spring endpoint
      {
        headers: {
          'Authorization': authHeader
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const logoutUser = () => {
  // Clear stored credentials
  localStorage.removeItem('email');
  localStorage.removeItem('tempPassword');
};

export const registerUser = async (userData: any) => {
  return await api.post('/auth/register', userData); // Updated to match Spring endpoint
};