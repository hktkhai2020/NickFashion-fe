import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { notification } from "antd";
import adminNotificationService from "@/services/adminNotificationService";
import { useEffect } from "react";
import socketService from "@/lib/socket";
import useUserStore from "@/store/useUserStore";

const useAdminNotifications = () => {
  const user = useUserStore((state) => state.user);
  const QueryClient = useQueryClient();
  const [_api, context] = notification.useNotification();

  const {
    data: dataNotifications,
    isPending: isPendingNotifications,
    isError: isErrorNotifications,
    error: errorNotifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["adminNotifications"],
    queryFn: ({ pageParam = 1 }) =>
      adminNotificationService.getAdminNotifications(pageParam, 6),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.page < lastPage.data.total
        ? lastPage.data.page + 1
        : undefined;
    },
  });
  const markAllAsReadAdmin = async () => {
    const response = await adminNotificationService.markAllAsReadAdmin();
    QueryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
    if (!response.success) {
      _api.error({
        message: "Lỗi kết nối",
        description: response.message,
      });
    }
  };
  const deleteNotificationAdmin = async (notificationId: string) => {
    const response =
      await adminNotificationService.deleteNotificationAdmin(notificationId);
    QueryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
    if (!response.success) {
      _api.error({
        message: "Lỗi kết nối",
        description: response.message,
      });
    }
  };
  const clearNotifications = () => {
    QueryClient.removeQueries({ queryKey: ["adminNotifications"] });
  }
  useEffect(() => {
    if (user?.role == "admin") {
      const socket = socketService.getSocket();
      socket?.on("new_pending_order", (data) => {
        QueryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
        console.log("Hệ thống admin có thông báo mới");
        _api.info({
          message: `khách hàng ${data.customerName} vừa đặt hàng`,
          description: `Vào kiểm tra đơn ${data.orderId} vừa đặt từ khách hàng`,
          placement: "topRight",
        });
      });
      return () => {
        socket?.off("new_pending_order");
      };
    }
  }, [QueryClient]);

  return {
    dataNotifications,
    isPendingNotifications,
    isErrorNotifications,
    errorNotifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    _api,
    context,
    markAllAsReadAdmin,
    deleteNotificationAdmin,
    clearNotifications
  };
};

export default useAdminNotifications;
