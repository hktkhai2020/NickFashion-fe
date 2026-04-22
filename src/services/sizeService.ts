import { apiClient, endpoints } from "@/api";
import { SizeFormValues, GetSizesParams, SizeResponse } from "@/types";

const sizeService = {
  getSizes: async (params?: GetSizesParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

    const query = searchParams.toString();
    const url = query ? `${endpoints.sizes}?${query}` : endpoints.sizes;
    const response = await apiClient.get<SizeResponse>(url);
    return response.data;
  },

  createSize: async (data: SizeFormValues) => {
    const response = await apiClient.post(endpoints.createSize, data);
    return response.data;
  },

  updateSize: async (id: string, data: SizeFormValues) => {
    const response = await apiClient.put(endpoints.updateSize(id), data);
    return response.data;
  },

  deleteSize: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteSize(id));
    return response.data;
  },
};

export default sizeService;
