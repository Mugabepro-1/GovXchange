import axios from 'axios';
import { User } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/api';

class AuthService {
  async login(email: string, password: string): Promise<User> {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await axios.post(`${API_URL}/users/register`, { name, email, password });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }
}

export const loginUser = (email: string, password: string) => new AuthService().login(email, password);
export const registerUser = (name: string, email: string, password: string) => new AuthService().register(name, email, password);
export const logoutUser = () => new AuthService().logout();
export const getCurrentUser = () => new AuthService().getCurrentUser();

export default new AuthService();