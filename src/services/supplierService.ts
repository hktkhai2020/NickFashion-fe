import { apiClient, endpoints } from "@/api";
import { SupplierFormValues, GetSuppliersParams, SupplierResponse } from "@/types";

const supplierService = {
  getSuppliers: async (params?: GetSuppliersParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

    const query = searchParams.toString();
    const url = query ? `${endpoints.suppliers}?${query}` : endpoints.suppliers;
    const response = await apiClient.get<SupplierResponse>(url);
    return response.data;
  },

  createSupplier: async (data: SupplierFormValues) => {
    const response = await apiClient.post(endpoints.createSupplier, data);
    return response.data;
  },

  updateSupplier: async (id: string, data: SupplierFormValues) => {
    const response = await apiClient.put(endpoints.updateSupplier(id), data);
    return response.data;
  },

  deleteSupplier: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteSupplier(id));
    return response.data;
  },
};

export default supplierService;
