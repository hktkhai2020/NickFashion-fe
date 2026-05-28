import React from "react";
import { Image, Spin, Breadcrumb } from "antd";
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  ExclamationCircleFilled,
  RightOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import useOrderDetail from "@/hooks/useOrderDetail";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types";
import {
  ShoppingOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  TruckOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { formatDate } from "@/utils/format";
import { formatPrice } from "@/utils/format";
const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError, error } = useOrderDetail(id || "");

  const order = data?.data;

  const getStatusConfig = (status: OrderStatus) => {
    const configs: Record<
      OrderStatus,
      { label: string; color: string; bg: string; icon: React.ReactNode }
    > = {
      pending: {
        label: "Chờ xác nhận",
        color: "#92400e",
        bg: "#fef3c7",
        icon: <ClockCircleOutlined />,
      },
      confirmed: {
        label: "Đã xác nhận",
        color: "#1d4ed8",
        bg: "#dbeafe",
        icon: <CheckCircleFilled />,
      },
      processing: {
        label: "Đang xử lý",
        color: "#7c3aed",
        bg: "#ede9fe",
        icon: <ClockCircleOutlined />,
      },
      shipped: {
        label: "Đang giao hàng",
        color: "#c2410c",
        bg: "#ffedd5",
        icon: <TruckOutlined />,
      },
      delivered: {
        label: "Đã giao hàng",
        color: "#166534",
        bg: "#dcfce7",
        icon: <CheckCircleFilled />,
      },
      cancelled: {
        label: "Đã hủy",
        color: "#dc2626",
        bg: "#fee2e2",
        icon: <ExclamationCircleFilled />,
      },
      refunded: {
        label: "Đã hoàn tiền",
        color: "#6b7280",
        bg: "#f3f4f6",
        icon: <CheckCircleFilled />,
      },
      return_requested: {
        label: "Yêu cầu trả hàng",
        color: "#c2410c",
        bg: "#ffedd5",
        icon: <ExclamationCircleFilled />,
      },
      returning: {
        label: "Đang trả hàng",
        color: "#c2410c",
        bg: "#ffedd5",
        icon: <TruckOutlined />,
      },
      returned: {
        label: "Đã trả hàng",
        color: "#6b7280",
        bg: "#f3f4f6",
        icon: <CheckCircleFilled />,
      },
    };
    return (
      configs[status] || {
        label: status,
        color: "#6b7280",
        bg: "#f3f4f6",
        icon: <ClockCircleOutlined />,
      }
    );
  };

  const getPaymentStatusConfig = (status: PaymentStatus) => {
    const configs: Record<
      PaymentStatus,
      { label: string; color: string; bg: string }
    > = {
      pending: { label: "Chưa thanh toán", color: "#92400e", bg: "#fef3c7" },
      paid: { label: "Đã thanh toán", color: "#166534", bg: "#dcfce7" },
      failed: {
        label: "Thanh toán thất bại",
        color: "#dc2626",
        bg: "#fee2e2",
      },
      refunded: { label: "Đã hoàn tiền", color: "#6b7280", bg: "#f3f4f6" },
      partial_refunded: {
        label: "Hoàn tiền một phần",
        color: "#c2410c",
        bg: "#ffedd5",
      },
    };
    return (
      configs[status] || {
        label: status,
        color: "#6b7280",
        bg: "#f3f4f6",
      }
    );
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    const labels: Record<PaymentMethod, string> = {
      cod: "COD - Thanh toán khi nhận hàng",
      bank_transfer: "Chuyển khoản ngân hàng",
      momo: "Ví MoMo",
      vnpay: "VNPay",
      zalopay: "ZaloPay",
    };
    return labels[method] || method;
  };

  const getShippingMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      standard: "Giao hàng tiêu chuẩn (3-5 ngày)",
      express: "Giao hàng nhanh (1-2 ngày)",
      fast: "Giao hàng hỏa tốc (Same day)",
    };
    return labels[method] || method;
  };

  const statusOrder = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
  ];
  const cancelledStatus = [
    "cancelled",
    "refunded",
    "return_requested",
    "returning",
    "returned",
  ];
  const isCancelled = cancelledStatus.includes(order?.status || "");

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <ExclamationCircleFilled style={{ fontSize: 48, color: "#dc2626" }} />
        <p className="text-[16px] text-[#6b7280]">
          {error?.message || "Không tìm thấy đơn hàng"}
        </p>
        <Link
          to="/customer/orders"
          className="text-[#00613f] font-semibold hover:underline"
        >
          Quay lại lịch sử đơn hàng
        </Link>
      </div>
    );
  }

  const status = getStatusConfig(order.status);
  const payment = getPaymentStatusConfig(order.paymentStatus);
  const totalItems = order.products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="lg:w-[70%]! w-full flex flex-col gap-6 border-[1px] border-[#e5eaf0] rounded-1! lg:p-[2rem]! p-[1rem]!">
      {/* Breadcrumb */}
      <div className="lg:block! hidden!">
        <Breadcrumb
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            {
              title: <Link to="/customer/orders">Lịch sử đơn hàng</Link>,
            },
            { title: order.orderNumber },
          ]}
        />
      </div>

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">
            Chi tiết đơn hàng
          </h1>
          <p className="text-[14px] text-[#6b7280] mt-1!">
            Mã đơn:{" "}
            <span className="font-semibold text-[#1a1a1a]">
              {order.orderNumber}
            </span>{" "}
            | Đặt ngày: {formatDate(order.createdAt)}
          </p>
        </div>
        <div
          className="px-4! py-2! rounded-full text-[14px] font-semibold flex items-center gap-2"
          style={{ color: status.color, backgroundColor: status.bg }}
        >
          {status.icon}
          {status.label}
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Left column - Products & Info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Status timeline */}
          <div className="bg-white border border-[#e5eaf0] rounded-xl p-6!">
            <h2 className="text-[16px] font-bold text-[#1a1a1a] mb-6 flex items-center gap-22">
              <TruckOutlined /> Theo dõi đơn hàng
            </h2>
            <div className="relative">
              {/* Timeline line */}
              {!isCancelled && (
                <div
                  className="absolute top-0 bottom-0 left-[11px] w-[2px] bg-[#e5eaf0]"
                  style={{
                    height: `${Math.min(
                      ((statusOrder.indexOf(order.status) + 1) /
                        statusOrder.length) *
                        100,
                      100,
                    )}%`,
                  }}
                />
              )}

              <div className="flex flex-col gap-0">
                {statusOrder.map((s, index) => {
                  const stepConfig = getStatusConfig(s as OrderStatus);
                  const isActive =
                    statusOrder.indexOf(order.status) >= index ||
                    order.status === s;
                  const isCurrent = order.status === s;
                  return (
                    <div key={s} className="flex items-center gap-4 py-3!">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0"
                        style={{
                          backgroundColor: isActive
                            ? stepConfig.color
                            : "#e5eaf0",
                          color: isActive ? "#fff" : "#9ca3af",
                        }}
                      >
                        {isActive && (
                          <CheckCircleFilled style={{ fontSize: 14 }} />
                        )}
                      </div>
                      <div>
                        <p
                          className="text-[14px] font-semibold"
                          style={{
                            color: isActive ? stepConfig.color : "#9ca3af",
                          }}
                        >
                          {stepConfig.label}
                        </p>
                        {isCurrent && order.statusHistory?.length > 0 && (
                          <p className="text-[12px] text-[#9ca3af] mt-0.5!">
                            {formatDate(
                              order.statusHistory.find(
                                (h) => h.status === order.status,
                              )?.updatedAt || order.updatedAt,
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isCancelled && (
                  <div className="flex items-center gap-4 py-3!">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0"
                      style={{
                        backgroundColor: "#dc2626",
                        color: "#fff",
                      }}
                    >
                      <ExclamationCircleFilled style={{ fontSize: 14 }} />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#dc2626]">
                        {status.label}
                      </p>
                      {order.statusHistory?.length > 0 && (
                        <p className="text-[12px] text-[#9ca3af] mt-0.5!">
                          {formatDate(
                            order.statusHistory.slice(-1)[0]?.updatedAt ||
                              order.updatedAt,
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white border border-[#e5eaf0] rounded-xl p-6!">
            <div className="flex items-center justify-between mb-4!">
              <h2 className="text-[16px] font-bold text-[#1a1a1a] flex items-center gap-2">
                <ShoppingOutlined /> Sản phẩm ({totalItems})
              </h2>
            </div>

            <div className="flex flex-col gap-3">
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
                    className="flex items-center gap-4 p-3! rounded-lg border border-[#e5eaf0] hover:bg-[#fafafa] transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#f9fafb]">
                      <Image
                        src={product.thumbnail || ""}
                        fallback="https://via.placeholder.com/80/e5eaf0/9ca3af?text=No+Image"
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
                      <p className="text-[14px] font-semibold text-[#1a1a1a] line-clamp-2">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-3 mt-2! flex-wrap">
                        {product.color && (
                          <span className="text-[12px] text-[#6b7280] bg-[#f3f4f6] px-2! py-0.5! rounded">
                            Color: {product.color}
                          </span>
                        )}
                        {product.size && (
                          <span className="text-[12px] text-[#6b7280] bg-[#f3f4f6] px-2! py-0.5! rounded">
                            Size: {product.size}
                          </span>
                        )}
                        <span className="text-[12px] text-[#6b7280] bg-[#f3f4f6] px-2! py-0.5! rounded font-medium">
                          x{product.quantity}
                        </span>
                        {itemDiscount > 0 && (
                          <span className="text-[11px] text-white bg-[#ef4444] px-1.5! py-0.5! rounded font-bold">
                            -{itemDiscount}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
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
          </div>
        </div>

        {/* Right column - Summary & Info */}
        <div className="w-full lg:w-[380px] flex flex-col gap-6">
          {/* Order summary */}
          <div className="bg-white border border-[#e5eaf0] rounded-xl p-6!">
            <h2 className="text-[16px] font-bold text-[#1a1a1a] mb-4!">
              Tổng quan đơn hàng
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-[14px]">
                <span className="text-[#6b7280]">Tạm tính</span>
                <span className="text-[#1a1a1a] font-medium">
                  {formatPrice(order.subtotal)}
                </span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-[14px] text-[#dc2626]">
                  <span className="flex items-center gap-1">
                    <TagOutlined /> Giảm giá
                    {order.discountCode && (
                      <span className="text-[12px] bg-[#fee2e2] text-[#dc2626] px-1.5! py-0.5! rounded ml-1! font-semibold">
                        {order.discountCode}
                      </span>
                    )}
                  </span>
                  <span className="font-medium">
                    -{formatPrice(order.discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[14px]">
                <span className="text-[#6b7280]">Phí vận chuyển</span>
                <span className="text-[#1a1a1a] font-medium">Miễn phí</span>
              </div>

              <div className="border-t border-[#e5eaf0] pt-3! flex justify-between items-baseline">
                <span className="text-[16px] font-bold text-[#1a1a1a]">
                  Tổng cộng
                </span>
                <span className="text-[20px] font-bold text-[#da291c]">
                  {formatPrice(order.totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-white border border-[#e5eaf0] rounded-xl p-6!">
            <h2 className="text-[16px] font-bold text-[#1a1a1a] mb-4! flex items-center gap-2">
              <CreditCardOutlined /> Thanh toán
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#6b7280]">Phương thức</span>
                <span className="text-[14px] font-medium text-[#1a1a1a]">
                  {getPaymentMethodLabel(order.paymentMethod)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#6b7280]">Trạng thái</span>
                <div
                  className="px-3! py-1! rounded-full text-[12px] font-semibold"
                  style={{
                    color: payment.color,
                    backgroundColor: payment.bg,
                  }}
                >
                  {payment.label}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping info */}
          <div className="bg-white border border-[#e5eaf0] rounded-xl p-6!">
            <h2 className="text-[16px] font-bold text-[#1a1a1a] mb-4! flex items-center gap-2">
              <EnvironmentOutlined /> Địa chỉ giao hàng
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                  Người nhận
                </span>
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-[#6b7280]" />
                  <span className="text-[14px] font-medium text-[#1a1a1a]">
                    {order.customerName}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                  Số điện thoại
                </span>
                <span className="text-[14px] text-[#1a1a1a]">
                  {order.customerPhone}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                  Địa chỉ
                </span>
                <span className="text-[14px] text-[#1a1a1a] leading-relaxed">
                  {order.shippingAddress}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                  Vận chuyển
                </span>
                <span className="text-[14px] text-[#1a1a1a] flex items-center gap-2">
                  <TruckOutlined />
                  {getShippingMethodLabel(order.shippingMethod)}
                </span>
              </div>

              {order.trackingNumber && (
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                    Mã vận đơn
                  </span>
                  <span className="text-[14px] font-mono font-semibold text-[#1a1a1a]">
                    {order.trackingNumber}
                  </span>
                </div>
              )}

              {order.customerNote && (
                <div className="flex flex-col gap-1 bg-[#f9fafb] p-3 rounded-lg">
                  <span className="text-[12px] text-[#9ca3af] uppercase tracking-wide">
                    Ghi chú
                  </span>
                  <span className="text-[14px] text-[#374151] italic">
                    {order.customerNote}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Back button */}
          <Link
            to="/customer/orders"
            className="w-full h-[44px] bg-[#f5f5f5] hover:bg-[#e5eaf0] text-[#374151] text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <RightOutlined style={{ transform: "rotate(180deg)" }} />
            Quay lại lịch sử đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
