import orderService from "@/services/orderService";
import { Order } from "@/types";
import { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";

const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useUserStore((state) => state.user?._id);

  useEffect(() => {
    if (!userId) {
      return;
    }
    let ignore = false;
    orderService
      .getOrdersByUserId(userId)
      .then((response) => {
        if (!ignore && response.success) {
          setOrders(response.data || []);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [userId]);

  return { orders, loading };
};

export default useOrder;
