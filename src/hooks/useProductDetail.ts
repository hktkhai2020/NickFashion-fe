import { useState } from "react";
import { notification } from "antd";
import { cartService } from "@/services";
import wishlistService from "@/services/wishlistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductBySlug } from "@/hooks/useProductBySlug";

const useProductDetail = (slug?: string) => {
  const queryClient = useQueryClient();
  const [activeColor, setActiveColor] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [_api, contextHolder] = notification.useNotification();

  // Fetch product with TanStack Query
  const { data: productData, isLoading, isError, error } = useProductBySlug(slug || "");
  const product = productData?.data;

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: ({
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
    }) =>
      cartService.addToCart(
        userId,
        productId,
        variantId,
        quantity,
        price,
      ),
    onSuccess: () => {
      _api.success({
        message: "Thêm vào giỏ hàng thành công",
        placement: "top",
      });
    },
    onError: () => {
      _api.error({
        message: "Thêm vào giỏ hàng thất bại",
        placement: "top",
      });
    },
  });

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

  const handleAddToCart = ({
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
    addToCartMutation.mutate({
      userId,
      productId,
      variantId,
      quantity,
      price,
    });
  };

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
    addToCartMutation,
    isLoading,
    isError,
    error,
  };
};

export default useProductDetail;
