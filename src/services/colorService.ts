import { apiClient, endpoints } from "@/api";
import { ColorFormValues, GetColorsParams, ColorResponse } from "@/types";

const colorService = {
  getColors: async (params?: GetColorsParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

    const query = searchParams.toString();
    const url = query ? `${endpoints.colors}?${query}` : endpoints.colors;
    const response = await apiClient.get<ColorResponse>(url);
    return response.data;
  },

  createColor: async (data: ColorFormValues) => {
    const response = await apiClient.post(endpoints.createColor, data);
    return response.data;
  },

  updateColor: async (id: string, data: ColorFormValues) => {
    const response = await apiClient.put(endpoints.updateColor(id), data);
    return response.data;
  },

  deleteColor: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteColor(id));
    return response.data;
  },
};

export default colorService;
