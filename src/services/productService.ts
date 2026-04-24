import { apiClient, endpoints } from "@/api";
import {
  ProductFormValues,
  GetProductsParams,
  ProductResponse,
  Product,
} from "@/types";

const productService = {
  getProducts: async (params?: GetProductsParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

    const query = searchParams.toString();
    const url = query ? `${endpoints.getProducts}?${query}` : endpoints.getProducts;
    const response = await apiClient.get<ProductResponse>(url as string);
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await apiClient.get<{ success: boolean; data: Product }>(
      endpoints.productDetail(id)
    );
    return response.data;
  },

  getProductBySlug: async (slug: string) => {
    const response = await apiClient.get<{ success: boolean; data: Product }>(
      endpoints.getProductBySlug(slug)
    );
    return response.data;
  },

  createProduct: async (data: ProductFormValues) => {
    const response = await apiClient.post(endpoints.createProduct, data);
    return response.data;
  },

  updateProduct: async (id: string, data: ProductFormValues) => {
    const response = await apiClient.put(endpoints.updateProduct(id), data);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteProduct(id));
    return response.data;
  },
};

export default productService;
