import { apiClient, endpoints } from "@/api";
import { Order, OrderResponse, GetOrdersParams } from "@/types";

const orderService = {
  getOrders: async (params?: GetOrdersParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
    if (params?.status) searchParams.set("status", params.status);
    if (params?.paymentMethod) searchParams.set("paymentMethod", params.paymentMethod);
    if (params?.paymentStatus) searchParams.set("paymentStatus", params.paymentStatus);
    if (params?.startDate) searchParams.set("startDate", params.startDate);
    if (params?.endDate) searchParams.set("endDate", params.endDate);
    if (params?.customerName) searchParams.set("customerName", params.customerName);
    if (params?.search) searchParams.set("search", params.search);

    const query = searchParams.toString();
    const url = query ? `${endpoints.adminOrders}?${query}` : endpoints.adminOrders;
    const response = await apiClient.get<OrderResponse>(url);
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await apiClient.get<{ success: boolean; data: Order }>(
      `${endpoints.adminOrders}/${id}`,
    );
    return response.data;
  },

  getOrdersByUserId: async (userId: string) => {
    const response = await apiClient.get<{ success: boolean; data: Order[] }>(
      endpoints.getOrderByUserId(userId),
    );
    return response.data;
  },

  updateOrder: async (id: string, data: Record<string, unknown>) => {
    const response = await apiClient.put(
      endpoints.updateOrder(id),
      data,
    );
    return response.data;
  },

  deleteOrder: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteOrder(id));
    return response.data;
  },
  getOrderDetails: async (id: string) => {
    const response = await apiClient.get<{ success: boolean; data: Order }>(
      endpoints.getOrderDetails(id),
    );
    return response.data;
  },  
};

export default orderService;
