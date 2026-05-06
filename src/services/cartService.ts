// Cart Service
import { apiClient, endpoints } from "@/api";
import { CartResponse } from "@/types";

export const cartService = {
  getCart: async (userId: string) => {
    const response = await apiClient.get<CartResponse>(
      endpoints.getCart(userId),
    );
    return response.data;
  },
  addToCart: async (
    userId: string,
    productId: string,
    variantId: string,
    quantity: number,
    price: number,
  ) => {
    const response = await apiClient.post(endpoints.addToCart, {
      userId,
      productId,
      variantId,
      quantity,
      price,
    });
    return response.data;
  },
  removeItemFromCart: async (userId: string, variantId: string) => {
    const response = await apiClient.delete(endpoints.removeFromCart, {
      data: {
        userId,
        variantId,
      },
    });
    return response.data;
  },
  toggleCartItem: async (userId: string, variantId: string) => {
    const response = await apiClient.post(endpoints.toggleCartItem, {
      userId,
      variantId,
    });
    return response.data;
  },
  selectAllCartItems: async (userId: string) => {
    const response = await apiClient.post(endpoints.selectAllCartItems, {
      userId,
    });
    return response.data;
  },
  unselectAllCartItems: async (userId: string) => {
    const response = await apiClient.post(endpoints.unselectAllCartItems, {
      userId,
    });
    return response.data;
  },
  updateCartItemQuantity: async (
    userId: string,
    variantId: string,
    quantity: number,
  ) => {
    const response = await apiClient.put(endpoints.updateCartItemQuantity, {
      userId,
      variantId,
      quantity,
    });
    return response.data;
  },
  applyCoupon: async (
    userId: string,
    code: string,
    value: number,
    type: "percentage" | "fixed",
  ) => {
    const response = await apiClient.post(endpoints.applyCouponToCart, {
      userId,
      code,
      value,
      type,
    });
    return response.data;
  },
  clearCart: async (userId: string) => {
    const response = await apiClient.post(endpoints.clearCart, {
      userId,
    });
    return response.data;
  },
};
