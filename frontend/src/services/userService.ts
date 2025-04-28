import axios from 'axios';
import { User } from '../context/AuthContext';
import api from './api';

const API_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface UpdateProfileData {
  name?: string;
  address?: string;
  jobRole?: string;
  qualifications?: string[];
}

class UserService {
  async getProfile(): Promise<User> {
    try {
      const response = await apiInstance.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    try {
      const response = await apiInstance.put('/users/me', data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update user profile');
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await apiInstance.put('/users/change-password', {
        currentPassword,
        newPassword
      });
    } catch (error) {
      console.error('Error changing password:', error);
      throw new Error('Failed to change password');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await apiInstance.get('/users/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }
}

export const getProfile = () => new UserService().getProfile();
export const updateProfile = (data: UpdateProfileData) => new UserService().updateProfile(data);
export const getAllUsers = () => new UserService().getAllUsers();

export default new UserService();

export const getUserById = async (userId: string) => {
  const response = await apiInstance.get<User>(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId: string, userData: Partial<User>) => {
  const response = await apiInstance.put<User>(`/users/${userId}`, userData);
  return response.data;
};