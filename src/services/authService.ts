// Auth Service
import { apiClient, endpoints } from '@/api';
import { UserLogin, UserRegister, User } from '@/types';

export const authService = {
  login: async (credentials: UserLogin) => {
    const response = await apiClient.post(endpoints.login, credentials);
    return response.data;
  },
  
  register: async (data: UserRegister) => {
    const response = await apiClient.post(endpoints.register, data);
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post(endpoints.logout);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await apiClient.get<User>(endpoints.userProfile);
    return response.data;
  },
  
  updateProfile: async (data: Partial<User>) => {
    const response = await apiClient.put(endpoints.updateProfile, data);
    return response.data;
  },
  
  changePassword: async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await apiClient.put(endpoints.changePassword, passwords);
    return response.data;
  },
};
