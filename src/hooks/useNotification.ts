import {
    useQueryClient,
    useInfiniteQuery,
  } from "@tanstack/react-query";
  import { notification } from "antd";
  import notificationService from "@/services/notificationService";
  import { useEffect  } from "react";
  import { useNavigate } from "react-router-dom";
  import socketService from "@/lib/socket";
  import useUserStore from "@/store/useUserStore";
  
  const useNotifications = () => {
    const user = useUserStore((state) => state.user);
    const QueryClient = useQueryClient();
    const [_api, context] = notification.useNotification();
    const navigate = useNavigate();
    const {
      data: dataNotifications,
      isPending: isPendingNotifications,
      isError: isErrorNotifications,
      error: errorNotifications,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: ({ pageParam = 1 }) =>
        notificationService.getNotifications(pageParam, 6),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.data.page < lastPage.data.total
          ? lastPage.data.page + 1
          : undefined;
      },
    });
    const markAllAsReadNotification = async () => {
      const response = await notificationService.markAllAsReadNotification();
      QueryClient.invalidateQueries({ queryKey: ["notifications"] });
      if (!response.success) {
        _api.error({
          message: "Lỗi kết nối",
          description: response.message,
        });
      }
    };
    const deleteNotification = async (notificationId: string) => {
      const response = await notificationService.deleteNotification(notificationId);
      QueryClient.invalidateQueries({ queryKey: ["notifications"] });
      if (!response.success) {
        _api.error({
          message: "Lỗi kết nối",
          description: response.message,
        });
      }
    };
    const clearNotifications = () => {
      QueryClient.removeQueries({ queryKey: ["notifications"] });
    };
    useEffect(() => {
      if (user) {
        const socket = socketService.getSocket();
        socket?.on("order_updated", () => {
          QueryClient.invalidateQueries({ queryKey: ["notifications"] });
          console.log("Nhận thông báo mới!");
          _api.info({
            message: `Đơn hàng của bạn vừa được cập nhật`,
            description: `Hãy vào trang đơn hàng để xem chi tiết`,
            placement: "topRight",
          });
        });
        return () => {
          socket?.off("order_updated");
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
      markAllAsReadNotification,
      deleteNotification,
      clearNotifications,
      navigate
    };
  };
  
  export default useNotifications;
  