// Product Service
import { apiClient, endpoints } from '@/api';
import { Product, ProductFilter, ProductReview, PaginatedResponse } from '@/types';

export const productService = {
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    filter?: ProductFilter;
  }) => {
    const response = await apiClient.get<PaginatedResponse<Product>>(endpoints.products, {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 12,
        ...params?.filter,
      },
    });
    return response.data;
  },
  
  getProductBySlug: async (slug: string) => {
    const response = await apiClient.get<Product>(endpoints.productDetail(slug));
    return response.data;
  },
  
  getFeaturedProducts: async (limit?: number) => {
    const response = await apiClient.get<Product[]>(endpoints.featuredProducts, {
      params: { limit },
    });
    return response.data;
  },
  
  getNewProducts: async (limit?: number) => {
    const response = await apiClient.get<Product[]>(endpoints.newProducts, {
      params: { limit },
    });
    return response.data;
  },
  
  getProductReviews: async (productId: string) => {
    const response = await apiClient.get<ProductReview[]>(endpoints.productReviews(productId));
    return response.data;
  },
  
  createReview: async (productId: string, data: {
    rating: number;
    comment: string;
    images?: string[];
  }) => {
    const response = await apiClient.post(endpoints.createReview, {
      productId,
      ...data,
    });
    return response.data;
  },
  
  searchProducts: async (query: string, page?: number, limit?: number) => {
    const response = await apiClient.get<PaginatedResponse<Product>>(endpoints.search, {
      params: { q: query, page, limit },
    });
    return response.data;
  },
};
