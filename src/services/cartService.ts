// Cart Service
import { apiClient, endpoints } from '@/api';
import { Cart, AddToCartPayload } from '@/types';

export const cartService = {
  getCart: async () => {
    const response = await apiClient.get<Cart>(endpoints.cart);
    return response.data;
  },
  
  addToCart: async (data: AddToCartPayload) => {
    const response = await apiClient.post<Cart>(endpoints.addToCart, data);
    return response.data;
  },
  
  updateCartItem: async (itemId: string, quantity: number) => {
    const response = await apiClient.put<Cart>(endpoints.updateCart(itemId), { quantity });
    return response.data;
  },
  
  removeFromCart: async (itemId: string) => {
    const response = await apiClient.delete<Cart>(endpoints.removeFromCart(itemId));
    return response.data;
  },
  
  clearCart: async () => {
    const response = await apiClient.delete<Cart>(endpoints.clearCart);
    return response.data;
  },
};
