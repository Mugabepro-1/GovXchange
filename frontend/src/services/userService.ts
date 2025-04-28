import api from './api';
import { User } from '../context/AuthContext';

export const getAllUsers = async () => {
  const response = await api.get<User[]>('/api/users/all');
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await api.get<User>(`/api/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId: string, userData: Partial<User>) => {
  const response = await api.put<User>(`/api/users/${userId}`, userData);
  return response.data;
};