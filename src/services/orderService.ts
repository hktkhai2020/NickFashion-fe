// Order Service
import { apiClient, endpoints } from '@/api';
import { Order, CreateOrderPayload, PaginatedResponse } from '@/types';

export const orderService = {
  createOrder: async (data: CreateOrderPayload) => {
    const response = await apiClient.post<Order>(endpoints.orders, data);
    return response.data;
  },
  
  getOrders: async (params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get<PaginatedResponse<Order>>(endpoints.orderHistory, {
      params,
    });
    return response.data;
  },
  
  getOrderById: async (orderId: string) => {
    const response = await apiClient.get<Order>(endpoints.orderDetail(orderId));
    return response.data;
  },
  
  cancelOrder: async (orderId: string) => {
    const response = await apiClient.post<Order>(endpoints.cancelOrder(orderId));
    return response.data;
  },
};
