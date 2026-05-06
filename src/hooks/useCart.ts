import { cartService } from "@/services";
import useUserStore from "@/store/useUserStore";
import useCartStore from "@/store/useCartStore";
import { message } from "antd";
import { useState } from "react";
import couponService from "@/services/couponService";

const useCart = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const userId = useUserStore((state) => state.user?._id);
  const setCart = useCartStore((state) => state.setCart);
  const [isLoading, setIsLoading] = useState(false);
  const reloadCart = async () => {
    const response = await cartService.getCart(userId || "");
    setCart(response.data);
  };
  const handleRemoveItem = async (variantId: string) => {
    console.log("variantId", variantId);
    setIsLoading(true);
    const response = await cartService.removeItemFromCart(
      userId || "",
      variantId,
    );
    if (response) {
      messageApi.success("Xóa sản phẩm khỏi giỏ hàng thành công");
    } else {
      messageApi.error("Xóa sản phẩm khỏi giỏ hàng thất bại");
    }
    await reloadCart();
    setIsLoading(false);
  };

  const handleToggleCartItem = async (variantId: string) => {
    try {
      setIsLoading(true);
      await cartService.toggleCartItem(userId || "", variantId);
    } catch (error: any) {
      messageApi.error("Cập nhật trạng thái sản phẩm thất bại", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    await reloadCart();
  };

  const handleSelectAllCartItems = async () => {
    try {
      setIsLoading(true);
      await cartService.selectAllCartItems(userId || "");
    } catch (error: any) {
      messageApi.error("Chọn tất cả sản phẩm thất bại", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    await reloadCart();
    setIsLoading(false);
  };
  const handleUnselectAllCartItems = async () => {
    try {
      setIsLoading(true);
      await cartService.unselectAllCartItems(userId || "");
    } catch (error: any) {
      messageApi.error("Bỏ chọn tất cả sản phẩm thất bại", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    await reloadCart();
  };
  const handleUpdateCartItemQuantity = async ({
    variantId,
    quantity,
  }: {
    variantId: string;
    quantity: number;
  }) => {
    try {
      setIsLoading(true);
      await cartService.updateCartItemQuantity(
        userId || "",
        variantId,
        quantity,
      );
    } catch (error: any) {
      messageApi.error("Cập nhật số lượng sản phẩm thất bại", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    await reloadCart();
  };

  const handleApplyCoupon = async (code: string) => {
    const cart = useCartStore.getState().cart;

    try {
      setIsLoading(true);
      const responseCoupon = await couponService.applyCoupon(
        code,
        cart?.subtotal || 0,
        cart?.items.map((item) => ({
          productId: item.productId._id,
          variantId: item.variantId._id,
          quantity: item.quantity,
        })) || [],
        userId || "",
      );
      if (responseCoupon.data.valid) {
        console.log("responseCoupon", responseCoupon.data.coupon);
        const responseCart = await cartService.applyCoupon(
          userId || "",
          code,
          responseCoupon.data.coupon.value,
          responseCoupon.data.coupon.type,
        );
        if (responseCart.success) {
          messageApi.success("Áp dụng mã giảm giá thành công");
        } else {
          messageApi.error("Áp dụng mã giảm giá thất bại");
        }
      } else {
        messageApi.error("Áp dụng mã giảm giá thất bại");
      }
    } catch (error: any) {
      console.log("error", error);
      messageApi.error(  error.response.data.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    await reloadCart();
  };

  return {
    handleRemoveItem,
    reloadCart,
    contextHolder,
    isLoading,
    handleToggleCartItem,
    handleSelectAllCartItems,
    handleUnselectAllCartItems,
    handleUpdateCartItemQuantity,
    handleApplyCoupon,
  };
};

export default useCart;
