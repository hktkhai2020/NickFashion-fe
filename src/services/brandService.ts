import { apiClient, endpoints } from "@/api";
import { BrandFormValues, GetBrandsParams, BrandResponse } from "@/types";

const brandService = {
  getBrands: async (params?: GetBrandsParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

    const query = searchParams.toString();
    const url = query ? `${endpoints.brands}?${query}` : endpoints.brands;
    const response = await apiClient.get<BrandResponse>(url);
    return response.data;
  },

  createBrand: async (data: BrandFormValues) => {
    const response = await apiClient.post(endpoints.createBrand, data);
    return response.data;
  },

  updateBrand: async (id: string, data: BrandFormValues) => {
    const response = await apiClient.put(endpoints.updateBrand(id), data);
    return response.data;
  },

  deleteBrand: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteBrand(id));
    return response.data;
  },
};

export default brandService;
