import {
  Col,
  Descriptions,
  Divider,
  Drawer,
  Image,
  Row,
  Steps,
  Table,
  Tag,
  Typography,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Order, OrderStatus, PaymentStatus } from "@/types/order";

const { Text } = Typography;

interface DetailOrderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  order: Order | null;
  onEdit: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

const STATUS_CONFIG: Record<OrderStatus, { color: string; label: string }> = {
  pending: { color: "gold", label: "Chờ xác nhận" },
  confirmed: { color: "blue", label: "Đã xác nhận" },
  processing: { color: "processing", label: "Đang chuẩn bị" },
  shipped: { color: "cyan", label: "Đã giao vận" },
  delivered: { color: "success", label: "Đã giao" },
  cancelled: { color: "error", label: "Đã hủy" },
  refunded: { color: "purple", label: "Đã hoàn tiền" },
  return_requested: { color: "orange", label: "Yêu cầu trả" },
  returning: { color: "lime", label: "Đang trả hàng" },
  returned: { color: "default", label: "Đã trả hàng" },
};

const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { color: string; label: string }> = {
  pending: { color: "gold", label: "Chờ thanh toán" },
  paid: { color: "success", label: "Đã thanh toán" },
  failed: { color: "error", label: "Thanh toán thất bại" },
  refunded: { color: "purple", label: "Đã hoàn tiền" },
  partial_refunded: { color: "orange", label: "Hoàn tiền một phần" },
};

const DetailOrder: React.FC<DetailOrderProps> = ({
  isOpen,
  setIsOpen,
  order,
  onEdit,
}) => {
  if (!order) return null;

  const totalQuantity = order.products.reduce((sum, p) => sum + p.quantity, 0);

  const statusHistorySteps = order.statusHistory?.slice().reverse().map((h) => ({
    title: STATUS_CONFIG[h.status]?.label || h.status,
    description: h.updatedAt
      ? new Date(h.updatedAt).toLocaleString("vi-VN")
      : "",
    icon: <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_CONFIG[h.status]?.color || "#ccc" }} />,
  })) || [];

  const productColumns = [
    {
      title: "Sản phẩm",
      key: "product",
      render: (_: unknown, record: (typeof order.products)[0]) => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {record.thumbnail ? (
            <Image
              src={record.thumbnail}
              width={48}
              height={48}
              style={{ objectFit: "cover", borderRadius: 4, border: "1px solid #f0f0f0" }}
            />
          ) : (
            <div style={{ width: 48, height: 48, background: "#f5f5f5", borderRadius: 4 }} />
          )}
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: 11, color: "#888" }}>
              {record.color ? `Màu: ${record.color}  ` : ""}
              {record.size ? `Size: ${record.size}` : ""}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      align: "right" as const,
      width: 120,
      render: (price: number) => formatCurrency(price),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center" as const,
      width: 80,
    },
    {
      title: "Tổng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "right" as const,
      width: 130,
      render: (total: number) => (
        <Text strong style={{ color: "#e74c3c" }}>
          {formatCurrency(total)}
        </Text>
      ),
    },
  ];

  return (
    <Drawer
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Chi tiết đơn hàng: {order.orderNumber}</span>
          <Tag color={STATUS_CONFIG[order.status]?.color}>
            {STATUS_CONFIG[order.status]?.label}
          </Tag>
        </div>
      }
      placement="right"
      width={800}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      extra={
        <button
          onClick={onEdit}
          style={{
            border: "none",
            background: "orange",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: 4,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <EditOutlined /> Cập nhật
        </button>
      }
    >
      <Row gutter={16}>
        <Col span={12}>
          <Descriptions column={1} size="small" title="Thông tin khách hàng">
            <Descriptions.Item label="Họ tên">
              {order.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {order.customerEmail}
            </Descriptions.Item>
            <Descriptions.Item label="Điện thoại">
              {order.customerPhone}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ giao">
              {order.shippingAddress}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions column={1} size="small" title="Thông tin thanh toán">
            <Descriptions.Item label="Phương thức">
              <Tag>{order.paymentMethod?.toUpperCase()}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái TT">
              <Tag color={PAYMENT_STATUS_CONFIG[order.paymentStatus]?.color}>
                {PAYMENT_STATUS_CONFIG[order.paymentStatus]?.label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đặt">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString("vi-VN")
                : "-"}
            </Descriptions.Item>
            {order.trackingNumber && (
              <Descriptions.Item label="Mã vận đơn">
                <Text copyable style={{ fontFamily: "monospace" }}>
                  {order.trackingNumber}
                </Text>
              </Descriptions.Item>
            )}
            {order.shippingCarrier && (
              <Descriptions.Item label="Đơn vị vận chuyển">
                {order.shippingCarrier}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>

      {statusHistorySteps.length > 0 && (
        <>
          <Divider style={{ margin: "12px 0" }}>Lịch sử trạng thái</Divider>
          <Steps
            direction="vertical"
            size="small"
            current={statusHistorySteps.length}
            items={statusHistorySteps}
          />
        </>
      )}

      <Divider style={{ margin: "12px 0" }}>Danh sách sản phẩm</Divider>
      <Table
        dataSource={order.products}
        columns={productColumns}
        rowKey={(_: unknown, index?: number) => String(index)}
        pagination={false}
        size="small"
        footer={() => (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
            <div>
              Tổng số sản phẩm: <Text strong>{totalQuantity}</Text>
            </div>
            <div>
              Tạm tính: <Text>{formatCurrency(order.subtotal)}</Text>
            </div>
            {order.discountAmount > 0 && (
              <div style={{ color: "#2e7d32" }}>
                Giảm giá: -{formatCurrency(order.discountAmount)}
                {order.discountCode && (
                  <Tag color="blue" style={{ marginLeft: 8 }}>
                    {order.discountCode}
                  </Tag>
                )}
              </div>
            )}
            <div style={{ fontSize: 16 }}>
              <Text strong>
                Thành tiền:{" "}
                <Text strong style={{ color: "#e74c3c", fontSize: 18 }}>
                  {formatCurrency(order.totalPrice)}
                </Text>
              </Text>
            </div>
          </div>
        )}
      />

      {(order.customerNote || order.adminNote) && (
        <>
          <Divider style={{ margin: "12px 0" }}>Ghi chú</Divider>
          {order.customerNote && (
            <div style={{ marginBottom: 8 }}>
              <Text type="secondary">Ghi chú khách hàng: </Text>
              <Text>{order.customerNote}</Text>
            </div>
          )}
          {order.adminNote && (
            <div>
              <Text type="secondary">Ghi chú admin: </Text>
              <Text style={{ fontStyle: "italic" }}>{order.adminNote}</Text>
            </div>
          )}
        </>
      )}

      {order.estimatedDelivery && (
        <div style={{ marginTop: 12 }}>
          <Text type="secondary">
            Dự kiến giao:{" "}
            {new Date(order.estimatedDelivery).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </div>
      )}
    </Drawer>
  );
};

export default DetailOrder;
