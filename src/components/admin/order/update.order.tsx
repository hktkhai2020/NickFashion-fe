import {
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Divider,
  Tag,
} from "antd";
import { ActionType } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import orderService from "@/services/orderService";
import { Order, OrderStatus, PaymentStatus } from "@/types/order";

interface UpdateOrderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  order: Order | null;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Chờ xác nhận" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "processing", label: "Đang chuẩn bị" },
  { value: "shipped", label: "Đã giao vận" },
  { value: "delivered", label: "Đã giao hàng" },
  { value: "cancelled", label: "Đã hủy" },
  { value: "refunded", label: "Đã hoàn tiền" },
  { value: "return_requested", label: "Yêu cầu trả hàng" },
  { value: "returning", label: "Đang trả hàng" },
  { value: "returned", label: "Đã trả hàng" },
];

const PAYMENT_STATUS_OPTIONS: { value: PaymentStatus; label: string }[] = [
  { value: "pending", label: "Chờ thanh toán" },
  { value: "paid", label: "Đã thanh toán" },
  { value: "failed", label: "Thanh toán thất bại" },
  { value: "refunded", label: "Đã hoàn tiền" },
  { value: "partial_refunded", label: "Hoàn tiền một phần" },
];

const UpdateOrder: React.FC<UpdateOrderProps> = ({
  isOpen,
  setIsOpen,
  actionRef,
  order,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | undefined>();
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState<PaymentStatus | undefined>();

  useEffect(() => {
    if (isOpen && order) {
      queueMicrotask(() => {
        form.setFieldsValue({
          status: order.status,
          paymentStatus: order.paymentStatus,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone,
          shippingAddress: order.shippingAddress,
          adminNote: order.adminNote,
        });
        setCurrentStatus(order.status);
        setCurrentPaymentStatus(order.paymentStatus);
      });
    }
  }, [isOpen, order, form]);

  const onFinish = async () => {
    if (!order) return;
    setLoading(true);
    try {
      const values = form.getFieldsValue(true);

      const payload = {
        status: values.status,
        paymentStatus: values.paymentStatus,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        shippingAddress: values.shippingAddress,
        adminNote: values.adminNote || "",
      };

      const response = await orderService.updateOrder(order._id, payload);

      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Cập nhật đơn hàng thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      message.error(err?.response?.data?.message || "Cập nhật đơn hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Cập nhật đơn hàng: ${order?.orderNumber}`}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => {
        setIsOpen(false);
        form.resetFields();
      }}
      maskClosable={false}
      okText="Cập nhật"
      cancelText="Hủy"
      confirmLoading={loading}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Divider orientation="left">Cập nhật trạng thái</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Trạng thái đơn hàng"
              name="status"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select
                placeholder="Chọn trạng thái"
                onChange={(v) => setCurrentStatus(v)}
                options={STATUS_OPTIONS.map((opt) => ({
                  ...opt,
                  label: (
                    <span>
                      {opt.label}
                      {currentStatus === opt.value && (
                        <Tag color="blue" style={{ marginLeft: 8 }}>
                          Hiện tại
                        </Tag>
                      )}
                    </span>
                  ),
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Trạng thái thanh toán"
              name="paymentStatus"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái TT" }]}
            >
              <Select
                placeholder="Chọn trạng thái thanh toán"
                onChange={(v) => setCurrentPaymentStatus(v)}
                options={PAYMENT_STATUS_OPTIONS.map((opt) => ({
                  ...opt,
                  label: (
                    <span>
                      {opt.label}
                      {currentPaymentStatus === opt.value && (
                        <Tag color="blue" style={{ marginLeft: 8 }}>
                          Hiện tại
                        </Tag>
                      )}
                    </span>
                  ),
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Thông tin giao hàng</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Họ tên khách hàng"
              name="customerName"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Họ tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="customerPhone"
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Email"
          name="customerEmail"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ giao hàng"
          name="shippingAddress"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input.TextArea placeholder="Địa chỉ giao hàng" rows={2} />
        </Form.Item>

        <Divider orientation="left">Ghi chú</Divider>

        <Form.Item label="Ghi chú admin" name="adminNote">
          <Input.TextArea
            placeholder="Nhập ghi chú nội bộ (không hiển thị với khách)"
            rows={2}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateOrder;
