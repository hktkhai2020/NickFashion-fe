// User Service
import { apiClient, endpoints } from '@/api';
import { User, Address } from '@/types';

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get<User>(endpoints.userProfile);
    return response.data;
  },
  
  updateProfile: async (data: Partial<User>) => {
    const response = await apiClient.put<User>(endpoints.updateProfile, data);
    return response.data;
  },
  
  getAddresses: async () => {
    const response = await apiClient.get<Address[]>(endpoints.addresses);
    return response.data;
  },
  
  addAddress: async (data: Omit<Address, 'id'>) => {
    const response = await apiClient.post<Address>(endpoints.addAddress, data);
    return response.data;
  },
  
  updateAddress: async (id: string, data: Partial<Address>) => {
    const response = await apiClient.put<Address>(endpoints.updateAddress(id), data);
    return response.data;
  },
  
  deleteAddress: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteAddress(id));
    return response.data;
  },
  
  setDefaultAddress: async (id: string) => {
    const response = await apiClient.put(endpoints.setDefaultAddress(id));
    return response.data;
  },
};
