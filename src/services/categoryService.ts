import { apiClient, endpoints } from "@/api";
import { Category, CategoryResponse } from "@/types";

export interface GetCategoriesParams {
  current?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "sortOrder" | "name" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  slug?: string;
}

const categoryService = {
  getCategories: async (params?: GetCategoriesParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
    if (params?.slug) searchParams.set("slug", params.slug);
    const query = searchParams.toString();
    const url = query ? `${endpoints.categories}?${query}` : endpoints.categories;
    const response = await apiClient.get<CategoryResponse>(url);
    return response.data;
  },
  deleteCategory: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteCategory(id));
    return response.data;
  },
  createCategory: async (data: Partial<Category>) => {
    const response = await apiClient.post(endpoints.createCategory, data);
    return response.data;
  },
  updateCategory: async (id: string, data: Partial<Category>) => {
    const response = await apiClient.put(endpoints.updateCategory(id), data);
    return response.data;
  },
};

export default categoryService;
