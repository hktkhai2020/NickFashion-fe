import { apiClient, endpoints } from "@/api";
import { DashboardResponse } from "@/types";
const adminService = {
  getDashboard: async () => {
    const response = await apiClient.get<DashboardResponse>(endpoints.adminDashboard);
    return response.data;
  },
};

export default adminService;