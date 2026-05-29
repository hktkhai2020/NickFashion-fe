import { useState } from "react";
import { notification } from "antd";
import { cartService } from "@/services";
import wishlistService from "@/services/wishlistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductBySlug } from "@/hooks/useProductBySlug";
import useCart from "@/hooks/useCart";
const useProductDetail = (slug?: string) => {
  const queryClient = useQueryClient();
  const [activeColor, setActiveColor] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [_api, contextHolder] = notification.useNotification();
  const { reloadCart } = useCart();
  // Fetch product with TanStack Query
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useProductBySlug(slug || "");
  const product = productData?.data;

  // Add to cart mutation
  const handleAddToCart = async ({
    userId,
    productId,
    variantId,
    quantity,
    price,
  }: {
    userId: string;
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
  }) => {
    try {
      const response = await cartService.addToCart(
        userId,
        productId,
        variantId,
        quantity,
        price,
      );
      reloadCart();
      if (response) {
        _api.success({
          message: "Thêm vào giỏ hàng thành công",
          placement: "top",
        });
      } else {
        console.log("Thêm vào giỏ hàng thất bại");
      }
    } catch (err: unknown) {
      console.log("Đã có lỗi xảy ra", err);
    }
  };
  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => wishlistService.addToWishlist(productId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      _api.success({
        message: "Thêm vào yêu thích thành công",
        placement: "top",
      });
    },
    onError: () => {
      _api.error({
        message: "Đã có lỗi xảy ra",
        placement: "top",
      });
    },
  });

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => wishlistService.removeFromWishlist(productId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      _api.success({
        message: "Xóa khỏi yêu thích thành công",
        placement: "top",
      });
    },
    onError: () => {
      _api.error({
        message: "Đã có lỗi xảy ra",
        placement: "top",
      });
    },
  });

  return {
    product,
    productId: product?._id || "",
    activeColor,
    setActiveColor,
    selectedVariant,
    setSelectedVariant,
    handleAddToCart,
    _api,
    contextHolder,
    addToWishlistMutation,
    removeFromWishlistMutation,
    isLoading,
    isError,
    error,
  };
};

export default useProductDetail;
