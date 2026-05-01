import { apiClient, endpoints } from "@/api";
import {
  DashboardResponse,
  TopSellingVariantsResponse,
  TopRevenueVariantsResponse,
  MonthlyRevenueResponse,
  DailyRevenueResponse,
  ImportStatisticsResponse,
  ImportQuantityResponse,
} from "@/types";
const adminService = {
  getDashboard: async () => {
    const response = await apiClient.get<DashboardResponse>(
      endpoints.adminDashboard,
    );
    return response.data;
  },
  getTopSellingVariants: async () => {
    const response = await apiClient.get<TopSellingVariantsResponse>(
      endpoints.getTopSellingVariants,
    );
    return response.data;
  },
  getTopRevenueVariants: async () => {
    const response = await apiClient.get<TopRevenueVariantsResponse>(
      endpoints.getTopRevenueVariants,
    );
    return response.data;
  },
  getMonthlyRevenue: async () => {
    const response = await apiClient.get<MonthlyRevenueResponse>(
      endpoints.getMonthlyRevenue,
    );
    return response.data;
  },
  getDailyRevenue: async () => {
    const response = await apiClient.get<DailyRevenueResponse>(
      endpoints.getDailyRevenue,
    );
    return response.data;
  },

  // Import Statistics
  getImportStatistics: async () => {
    const response = await apiClient.get<ImportStatisticsResponse>(
      endpoints.getImportStatistics,
    );
    return response.data;
  },
  getImportQuantity: async () => {
    const response = await apiClient.get<ImportQuantityResponse>(
      endpoints.getImportQuantity,
    );
    return response.data;
  },
};

export default adminService;
