// Admin Services - Administrative API operations
import { apiClient, endpoints } from '@/api';
import { PaginatedResponse } from '@/types';

// Types
export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
  brand?: string;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  slug?: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  brand?: string;
  stock: number;
  colors?: { name: string; code: string }[];
  sizes?: string[];
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  productCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: {
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  totalOrders: number;
  totalSpent: number;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  recentOrders: AdminOrder[];
  topProducts: {
    id: string;
    name: string;
    sold: number;
    revenue: number;
  }[];
}

export const adminService = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/admin/dashboard');
    return response.data;
  },

  // Products
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }) => {
    const response = await apiClient.get<PaginatedResponse<AdminProduct>>('/admin/products', { params });
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await apiClient.get<AdminProduct>(`/admin/products/${id}`);
    return response.data;
  },

  createProduct: async (data: CreateProductPayload) => {
    const response = await apiClient.post<AdminProduct>('/admin/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: UpdateProductPayload) => {
    const response = await apiClient.put<AdminProduct>(`/admin/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    await apiClient.delete(`/admin/products/${id}`);
  },

  // Categories
  getCategories: async () => {
    const response = await apiClient.get<AdminCategory[]>('/admin/categories');
    return response.data;
  },

  createCategory: async (data: CreateCategoryPayload) => {
    const response = await apiClient.post<AdminCategory>('/admin/categories', data);
    return response.data;
  },

  updateCategory: async (id: string, data: Partial<CreateCategoryPayload>) => {
    const response = await apiClient.put<AdminCategory>(`/admin/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    await apiClient.delete(`/admin/categories/${id}`);
  },

  // Orders
  getOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await apiClient.get<PaginatedResponse<AdminOrder>>('/admin/orders', { params });
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await apiClient.get<AdminOrder>(`/admin/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string) => {
    const response = await apiClient.put<AdminOrder>(`/admin/orders/${id}/status`, { status });
    return response.data;
  },

  // Customers
  getCustomers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    const response = await apiClient.get<PaginatedResponse<AdminCustomer>>('/admin/customers', { params });
    return response.data;
  },

  getCustomerById: async (id: string) => {
    const response = await apiClient.get<AdminCustomer>(`/admin/customers/${id}`);
    return response.data;
  },

  updateCustomerStatus: async (id: string, isActive: boolean) => {
    const response = await apiClient.put<AdminCustomer>(`/admin/customers/${id}/status`, { isActive });
    return response.data;
  },
};
