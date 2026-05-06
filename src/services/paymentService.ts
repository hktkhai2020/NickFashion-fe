import { apiClient, endpoints } from "@/api";
import { PaymentResponse } from "@/types/payment";

const paymentService = {
  createPayment: async (data: any) => {
    const response = await apiClient.post<PaymentResponse>(endpoints.createPayment, data);
    return response.data;
  },
};

export default paymentService;
