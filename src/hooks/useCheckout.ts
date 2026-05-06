import useUserStore from "@/store/useUserStore";
import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import paymentService from "@/services/paymentService";
import { message } from "antd";
import { cartService } from "@/services";
import useCart from "@/hooks/useCart";
type FieldType = {
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerEmail?: string;
};

const useCheckout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const user = useUserStore((state) => state.user);
  const [step, setStep] = useState<number>(1);
  const cart = useCartStore((state) => state.cart);
  const [customerInfo, setCustomerInfo] = useState<FieldType>({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    customerEmail: "",
  });
  const { reloadCart } = useCart();
  const createPayment = async () => {
    try {
      const response = await paymentService.createPayment({
        userId: user?._id,
        customerName: customerInfo.customerName,
        customerPhone: customerInfo.customerPhone,
        shippingAddress: customerInfo.customerAddress,
        customerEmail: customerInfo.customerEmail,
        products: cart?.items.map((item) => ({
          productId: item.productId._id,
          variantId: item.variantId._id,
          name: item.productId.name,
          thumbnail: item.productId.thumbnail,
          color: item.variantId.color._id,
          size: item.variantId.size._id,
          price: item.price,
          costPrice: item.productId.costPrice,
          quantity: item.quantity,
        })),
        discountCode: cart?.appliedCoupon?.code,
        discountAmount: cart?.appliedCoupon?.code
          ? cart?.subtotal - cart?.total
          : 0,
      });
      const responseClearCart = await cartService.clearCart(user?._id || "");
      if (response && responseClearCart) {
        messageApi.success("Thanh toán thành công");
        setStep(2);
        await reloadCart();
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };
  return {
    contextHolder,
    user,
    step,
    setStep,
    cart,
    setCustomerInfo,
    createPayment,
  };
};

export default useCheckout;
