import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { loginUser, logoutUser, getCurrentUser } from '../services/authService';

export type UserRole = 'NORMALUSER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  address?: string;
  jobRole?: string;
  qualifications?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
          // Set authorization header for all future requests
          api.defaults.headers.common['Authorization'] = `Basic ${btoa(`${userData.email}:${localStorage.getItem('tempPassword')}`)}`;
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      // Store email for persistence (password is handled by the api service)
      localStorage.setItem('email', email);
      // Temporarily store password for Basic Auth (not secure, will be replaced with JWT)
      localStorage.setItem('tempPassword', password);
      // Set authorization header for all future requests
      api.defaults.headers.common['Authorization'] = `Basic ${btoa(`${email}:${password}`)}`;
      toast.success('Login successful!');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/api/users/register', userData);
      toast.success('Registration successful! Please login.');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    // Clear auth header
    delete api.defaults.headers.common['Authorization'];
    toast.info('You have been logged out.');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout, 
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};