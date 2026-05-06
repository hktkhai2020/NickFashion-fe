import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "@/services/productService";
import { ProductDetailBySlug } from "@/types";
import { notification } from "antd";
import { cartService } from "@/services";
import useCart from  "@/hooks/useCart"
const useProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductDetailBySlug | null>(null);
  const [activeColor, setActiveColor] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [_api, contextHolder] = notification.useNotification();
  const { reloadCart } = useCart();
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const response = await productService.getProductBySlug(slug);

        if (response) {
          setProduct(response.data);
          setActiveColor(response.data.colorGroups[0].color._id);
        } else {
          console.log("Không tìm thấy sản phẩm");
        }
      } catch (err: unknown) {
        console.log("Đã có lỗi xảy ra", err);
      } finally {
        // do nothing
      }
    };

    fetchProduct();
  }, [slug]);

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

  return {
    product,
    activeColor,
    setActiveColor,
    selectedVariant,
    setSelectedVariant,
    handleAddToCart,
    contextHolder,
  };
};

export default useProductDetail;
