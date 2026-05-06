// src/hooks/useAuthInit.ts
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import useUserStore from "@/store/useUserStore";
import useCartStore from "@/store/useCartStore";
import { cartService } from "@/services";

const useAuthInit = () => {
  const { user, setUser, removeUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Luôn gọi getProfile trước
        // Nếu token hết hạn → backend trả 401 → interceptor tự refresh
        const response = await authService.getProfile();
        const cartResponse = await cartService.getCart(response.user._id);
        if (response.user) {
          setUser(response.user);
        }
        if (cartResponse) {
          setCart(cartResponse.data);
        }
      } catch (error: any) {
        // Nếu getProfile thất bại do 401 → thử refresh 1 lần cuối
        if (error?.response?.status === 401) {
          try {
            await authService.refreshToken();
            const retry = await authService.getProfile();
            if (retry.user) {
              setUser(retry.user);
            }
          } catch {
            // Refresh thất bại → xoá token + logout
            localStorage.removeItem("token");
            removeUser();
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  return { user, loading };
};

export default useAuthInit;
