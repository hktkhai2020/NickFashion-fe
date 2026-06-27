import { apiClient, endpoints } from "@/api";
import { deleteNotification, getNotification,markAllAsReadNotification } from "@/types";
const notificationService = {
  getNotifications: async (page: number, limit: number) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const response = await apiClient.get<getNotification>(
      `${endpoints.getNotifications}?${params.toString()}`,
    );
    return response.data;
  },
  markAllAsReadNotification: async () => {
    const response = await apiClient.put<markAllAsReadNotification>(
      `${endpoints.markAllAsReadNotifications}`,
    );
    return response.data;
  },
  deleteNotification: async (notificationId: string) => {
    const response = await apiClient.delete<deleteNotification>(
      `${endpoints.deleteNotification(notificationId)}`,
    );
    return response.data;
  },
};

export default notificationService;
