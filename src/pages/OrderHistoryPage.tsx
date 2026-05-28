import React from "react";
import { Image, Spin } from "antd";
import {
  LoadingOutlined,
  ShoppingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import useOrder from "@/hooks/useOrder";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types";
import { useNavigate } from "react-router-dom";
const OrderHistoryPage: React.FC = () => {
  const { orders, loading } = useOrder();
  const navigate = useNavigate();
  const getStatusConfig = (status: OrderStatus) => {
    const configs: Record<
      OrderStatus,
      { label: string; color: string; bg: string }
    > = {
      pending: { label: "Chờ xác nhận", color: "#92400e", bg: "#fef3c7" },
      confirmed: { label: "Đã xác nhận", color: "#1d4ed8", bg: "#dbeafe" },
      processing: { label: "Đang xử lý", color: "#7c3aed", bg: "#ede9fe" },
      shipped: { label: "Đang giao hàng", color: "#c2410c", bg: "#ffedd5" },
      delivered: { label: "Đã giao hàng", color: "#166534", bg: "#dcfce7" },
      cancelled: { label: "Đã hủy", color: "#dc2626", bg: "#fee2e2" },
      refunded: { label: "Đã hoàn tiền", color: "#6b7280", bg: "#f3f4f6" },
      return_requested: {
        label: "Yêu cầu trả hàng",
        color: "#c2410c",
        bg: "#ffedd5",
      },
      returning: { label: "Đang trả hàng", color: "#c2410c", bg: "#ffedd5" },
      returned: { label: "Đã trả hàng", color: "#6b7280", bg: "#f3f4f6" },
    };
    return (
      configs[status] || { label: status, color: "#6b7280", bg: "#f3f4f6" }
    );
  };

  const getPaymentStatusConfig = (status: PaymentStatus) => {
    const configs: Record<
      PaymentStatus,
      { label: string; color: string; bg: string }
    > = {
      pending: { label: "Chưa thanh toán", color: "#92400e", bg: "#fef3c7" },
      paid: { label: "Đã thanh toán", color: "#166534", bg: "#dcfce7" },
      failed: { label: "Thanh toán thất bại", color: "#dc2626", bg: "#fee2e2" },
      refunded: { label: "Đã hoàn tiền", color: "#6b7280", bg: "#f3f4f6" },
      partial_refunded: {
        label: "Hoàn tiền một phần",
        color: "#c2410c",
        bg: "#ffedd5",
      },
    };
    return (
      configs[status] || { label: status, color: "#6b7280", bg: "#f3f4f6" }
    );
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    const labels: Record<PaymentMethod, string> = {
      cod: "COD",
      bank_transfer: "Chuyển khoản",
      momo: "MoMo",
      vnpay: "VNPay",
      zalopay: "ZaloPay",
    };
    return labels[method] || method;
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="lg:w-[70%]! w-full border border-[#e5eaf0] rounded-xl lg:p-8 p-4 flex items-center justify-center min-h-[300px]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
      </div>
    );
  }

  return (
    <div className="lg:w-[70%]! w-full flex flex-col gap-6 border-[1px] border-[#e5eaf0] rounded-1! lg:p-[2rem]! p-[1rem]!">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-[#1a1a1a] leading-tight">
          Lịch sử đơn hàng
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="w-full min-h-[300px]  flex flex-col items-center justify-center py-16 gap-4 border border-dashed border-[#d1d5db] rounded-xl bg-[#fafafa]">
          <div className="w-16 h-16 rounded-full bg-[#f3f4f6] flex items-center justify-center">
            <ShoppingOutlined style={{ fontSize: 28, color: "#9ca3af" }} />
          </div>
          <div className="text-center">
            <p className="text-[16px] font-semibold text-[#374151]">
              Bạn chưa có đơn hàng nào
            </p>
            <p className="text-[13px] text-[#9ca3af] mt-1">
              Hãy bắt đầu mua sắm để tạo đơn hàng đầu tiên
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 ">
          {orders.map((order) => {
            const status = getStatusConfig(order.status);
            const payment = getPaymentStatusConfig(order.paymentStatus);
            const totalItems = order.products.reduce(
              (sum, p) => sum + p.quantity,
              0,
            );
            const hasDiscount = order.discountAmount > 0;
            const discountPercent =
              hasDiscount && order.subtotal > 0
                ? Math.round((order.discountAmount / order.subtotal) * 100)
                : 0;

            return (
              <div
                key={order._id}
                className="bg-white border border-[#e5eaf0] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#61a678]/30 transition-all duration-300 cursor-pointer group  lg:p-[2rem]! p-[1rem]!"
                onClick={() => navigate(`/customer/order/${order._id}/detail`)}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-5 py-4 bg-[#fafafa] border-b border-[#e5eaf0]">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                        Mã đơn hàng
                      </span>
                      <span className="text-[15px] font-bold text-[#1a1a1a]">
                        {order.orderNumber}
                      </span>
                    </div>
                    <div className="w-px h-8 bg-[#e5eaf0]" />
                    <div className="flex flex-col">
                      <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                        Ngày đặt
                      </span>
                      <span className="text-[14px] font-medium text-[#374151]">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <div className="w-px h-8 bg-[#e5eaf0]" />
                    <div className="flex flex-col hidden lg:flex">
                      <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                        Tổng sản phẩm
                      </span>
                      <span className="text-[14px] font-medium text-[#374151]">
                        {totalItems} sản phẩm
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="px-2! py-1.5! rounded-full text-[13px] font-semibold text-center"
                      style={{
                        color: status.color,
                        backgroundColor: status.bg,
                      }}
                    >
                      {status.label}
                    </div>
                  </div>
                </div>

                {/* Products List */}
                <div className="px-5 py-4 flex flex-col gap-3">
                  {order.products.map((product, index) => {
                    const itemDiscount =
                      product.price > 0 &&
                      product.totalPrice < product.price * product.quantity
                        ? Math.round(
                            ((product.price * product.quantity -
                              product.totalPrice) /
                              (product.price * product.quantity)) *
                              100,
                          )
                        : 0;

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-lg border border-[#e5eaf0] overflow-hidden flex-shrink-0 bg-[#f9fafb]">
                          <Image
                            src={product.thumbnail || ""}
                            fallback="https://via.placeholder.com/64/e5eaf0/9ca3af?text=No+Image"
                            preview={false}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-[#1a1a1a] leading-snug line-clamp-2">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            {product.color && (
                              <span className="text-[12px] text-[#6b7280] bg-[#f3f4f6] px-2 py-0.5 rounded  hidden lg:block">
                                Color: {product.color}
                              </span>
                            )}
                            {product.size && (
                              <span className="text-[12px] text-[#6b7280] bg-[#f3f4f6] px-2 py-0.5 rounded hidden lg:block">
                                Size: {product.size}
                              </span>
                            )}
                            <span className="text-[12px] text-[#6b7280] bg-[#f3f4f6] px-2 py-0.5 rounded font-medium">
                              x{product.quantity}
                            </span>
                            {itemDiscount > 0 && (
                              <span className="text-[11px] text-white bg-[#ef4444] px-1.5 py-0.5 rounded font-bold">
                                -{itemDiscount}%
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          {itemDiscount > 0 ? (
                            <div className="flex flex-col items-end gap-0.5">
                              <span className="text-[14px] font-bold text-[#da291c]">
                                {formatPrice(product.totalPrice)}
                              </span>
                              <span className="text-[12px] text-[#9ca3af] line-through">
                                {formatPrice(product.price * product.quantity)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[14px] font-bold text-[#1a1a1a]">
                              {formatPrice(product.totalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between px-5 py-4 bg-[#fafafa] border-t border-[#e5eaf0]">
                  <div className="flex items-center gap-4">
                    {/* Payment status */}
                    <div
                      className="px-2.5 py-1 rounded-md text-[12px] font-semibold text-center"
                      style={{
                        color: payment.color,
                        backgroundColor: payment.bg,
                      }}
                    >
                      {payment.label}
                    </div>
                    {/* Payment method */}
                    <div className="flex items-center gap-1.5 hidden lg:flex">
                      <span className="text-[12px] text-[#9ca3af]">
                        Thanh toán:
                      </span>
                      <span className="text-[13px] font-medium text-[#374151]">
                        {getPaymentMethodLabel(order.paymentMethod)}
                      </span>
                    </div>
                    {/* Discount badge */}
                    {hasDiscount && (
                      <div className="flex items-center gap-1.5 text-[#dc2626] hidden lg:flex">
                        <TagOutlined />
                        <span className="text-[13px] font-semibold">
                          -{formatPrice(order.discountAmount)} (
                          {discountPercent}%)
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    {hasDiscount && (
                      <span className="text-[14px] text-[#9ca3af] line-through hidden lg:block">
                        {formatPrice(order.subtotal)}
                      </span>
                    )}
                    <span className="text-[22px] font-bold text-[#da291c]">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
