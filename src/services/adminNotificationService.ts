import { apiClient, endpoints } from "@/api";
import { deleteNotification, getNotification,markAllAsReadNotification } from "@/types";
const adminNotificationService = {
  getAdminNotifications: async (page: number, limit: number) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const response = await apiClient.get<getNotification>(
      `${endpoints.getAdminNotifications}?${params.toString()}`,
    );
    return response.data;
  },
  markAllAsReadAdmin: async () => {
    const response = await apiClient.put<markAllAsReadNotification>(
      `${endpoints.markAllAsReadAdmin}`,
    );
    console.log("response:",response);
    return response.data;
  },
  deleteNotificationAdmin: async (notificationId: string) => {
    const response = await apiClient.delete<deleteNotification>(
      `${endpoints.deleteNotificationAdmin(notificationId)}`,
    );
    return response.data;
  },
};

export default adminNotificationService;
