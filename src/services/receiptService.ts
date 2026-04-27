import { apiClient, endpoints } from "@/api";
import {
  ReceiptResponse,
  GetReceiptsParams,
  CreateReceiptPayload,
} from "@/types/receipt";

const receiptService = {
  getReceipts: async (params?: GetReceiptsParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
    if (params?.search) searchParams.set("search", params.search);

    const query = searchParams.toString();
    const url = query ? `${endpoints.receipts}?${query}` : endpoints.receipts;
    const response = await apiClient.get<ReceiptResponse>(url);
    return response.data;
  },

  createReceipt: async (data: CreateReceiptPayload) => {
    const response = await apiClient.post(endpoints.createReceipt, data);
    return response.data;
  },

  cancelReceipt: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteReceipt(id));
    return response.data;
  },
};

export default receiptService;
