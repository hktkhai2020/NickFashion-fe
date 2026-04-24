import { apiClient, endpoints } from "@/api";
import { VariantFormValues, Variant } from "@/types";

interface VariantResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Variant[];
}

interface GetVariantsParams {
  current?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

const variantService = {
  getVariants: async (params?: GetVariantsParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
    if (params?.search) searchParams.set("search", params.search);

    const query = searchParams.toString();
    const url = query ? `${endpoints.variants}?${query}` : endpoints.variants;
    const response = await apiClient.get<VariantResponse>(url);
    return response.data;
  },

  getVariantById: async (id: string) => {
    const response = await apiClient.get<{ success: boolean; data: Variant }>(
      `${endpoints.variants}/${id}`,
    );
    return response.data;
  },

  createVariant: async (data: VariantFormValues) => {
    const response = await apiClient.post(endpoints.createVariant, data);
    return response.data;
  },

  updateVariant: async (id: string, data: VariantFormValues) => {
    const response = await apiClient.put(endpoints.updateVariant(id), data);
    return response.data;
  },

  deleteVariant: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteVariant(id));
    return response.data;
  },
};

export default variantService;
