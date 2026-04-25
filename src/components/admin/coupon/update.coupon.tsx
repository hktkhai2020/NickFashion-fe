import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Switch,
  DatePicker,
} from "antd";
import { ActionType } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import couponService from "@/services/couponService";
import productService from "@/services/productService";
import categoryService from "@/services/categoryService";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Coupon } from "@/types/coupon";
import dayjs from "dayjs";

const UpdateCoupon = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  coupon: Coupon;
}) => {
  const { isOpen, setIsOpen, actionRef, coupon } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [couponType, setCouponType] = useState<"percentage" | "fixed">("percentage");
  const [couponScope, setCouponScope] = useState<"public" | "private">("public");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchRefs = async () => {
        try {
          const [prodRes, catRes] = await Promise.all([
            productService.getProducts({ pageSize: 100 }),
            categoryService.getCategories({ pageSize: 100 }),
          ]);
          if (prodRes.success) setProducts(prodRes.data);
          if (catRes.success) setCategories(catRes.data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchRefs();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && coupon) {
      const type = coupon.type as "percentage" | "fixed";
      const scope = coupon.scope as "public" | "private";

      queueMicrotask(() => {
        setCouponType(type);
        setCouponScope(scope);
        form.setFieldsValue({
          code: coupon.code,
          name: coupon.name,
          description: coupon.description || "",
          type: type,
          value: coupon.value,
          maxDiscount: coupon.maxDiscount,
          minOrderAmount: coupon.minOrderAmount,
          usageLimit: coupon.usageLimit,
          usageLimitPerUser: coupon.usageLimitPerUser,
          applicableCategories:
            coupon.applicableCategories?.map((c) => c._id) || [],
          applicableProducts:
            coupon.applicableProducts?.map((p) => p._id) || [],
          applicableUsers:
            coupon.applicableUsers?.map((u) => u._id) || [],
          startDate: coupon.startDate ? dayjs(coupon.startDate) : null,
          endDate: coupon.endDate ? dayjs(coupon.endDate) : null,
          isActive: coupon.isActive,
          scope: scope,
          note: coupon.note || "",
        });
      });
    }
  }, [isOpen, coupon, form]);

  const onFinish = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue(true);

      const payload = {
        code: values.code?.trim().toUpperCase(),
        name: values.name,
        description: values.description || null,
        type: couponType,
        value: values.value ?? 0,
        maxDiscount: couponType === "percentage" && values.maxDiscount ? values.maxDiscount : null,
        minOrderAmount: values.minOrderAmount ?? 0,
        usageLimit: values.usageLimit ?? null,
        usageLimitPerUser: values.usageLimitPerUser ?? 1,
        applicableUsers: couponScope === "private" ? (values.applicableUsers || []) : [],
        applicableCategories: values.applicableCategories || [],
        applicableProducts: values.applicableProducts || [],
        startDate: values.startDate ? dayjs(values.startDate).toISOString() : null,
        endDate: values.endDate ? dayjs(values.endDate).toISOString() : null,
        isActive: values.isActive ?? true,
        scope: couponScope,
        note: values.note || null,
      };

      const response = await couponService.updateCoupon(coupon._id, payload);

      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setCouponType("percentage");
        setCouponScope("public");
        setTimeout(() => {
          message.success("Cập nhật mã giảm giá thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      message.error(
        err?.response?.data?.message || "Cập nhật mã giảm giá thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật mã giảm giá"
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => {
        setIsOpen(false);
        form.resetFields();
        setCouponType("percentage");
        setCouponScope("public");
      }}
      maskClosable={false}
      okText="Cập nhật"
      cancelText="Hủy"
      confirmLoading={loading}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Mã coupon"
              name="code"
              rules={[
                { required: true, message: "Vui lòng nhập mã coupon" },
                {
                  pattern: /^[A-Za-z0-9_-]+$/,
                  message: "Chỉ chấp nhận chữ cái, số, gạch dưới và gạch ngang",
                },
              ]}
            >
              <Input
                placeholder="VD: SUMMER2026"
                style={{ textTransform: "uppercase" }}
              />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Tên coupon"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên coupon" },
              ]}
            >
              <Input placeholder="VD: Giảm giá mùa hè 2026" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Mô tả ngắn về mã giảm giá" rows={2} />
        </Form.Item>

        <Divider>Thông tin giảm giá</Divider>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Loại giảm" required>
              <Select
                value={couponType}
                onChange={(v) => {
                  setCouponType(v);
                  form.setFieldsValue({ value: 0, maxDiscount: undefined });
                }}
              >
                <Select.Option value="percentage">Phần trăm (%)</Select.Option>
                <Select.Option value="fixed">Cố định (VND)</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={
                couponType === "percentage"
                  ? "Phần trăm (%)"
                  : "Số tiền (VND)"
              }
              name="value"
              rules={[
                { required: true, message: "Vui lòng nhập giá trị giảm" },
              ]}
            >
              <InputNumber
                min={0}
                max={couponType === "percentage" ? 100 : undefined}
                style={{ width: "100%" }}
                placeholder="0"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Giảm tối đa (VND)"
              name="maxDiscount"
              hidden={couponType !== "percentage"}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Không giới hạn"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>Điều kiện áp dụng</Divider>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Đơn hàng tối thiểu (VND)"
              name="minOrderAmount"
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="0 = không giới hạn"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tổng lượt dùng tối đa" name="usageLimit">
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                placeholder="Không giới hạn"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Mỗi user dùng tối đa"
              name="usageLimitPerUser"
            >
              <InputNumber min={1} style={{ width: "100%" }} placeholder="1" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Danh mục áp dụng" name="applicableCategories">
              <Select
                mode="multiple"
                placeholder="Tất cả danh mục"
                allowClear
                options={categories.map((c) => ({
                  value: c._id,
                  label: c.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sản phẩm áp dụng" name="applicableProducts">
              <Select
                mode="multiple"
                placeholder="Tất cả sản phẩm"
                allowClear
                showSearch
                optionFilterProp="label"
                options={products.map((p) => ({
                  value: p._id,
                  label: p.name,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>Thời gian & phạm vi</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Phạm vi" required>
              <Select
                value={couponScope}
                onChange={(v) => {
                  setCouponScope(v);
                  form.setFieldsValue({ applicableUsers: [] });
                }}
              >
                <Select.Option value="public">
                  Công khai (ai cũng dùng được)
                </Select.Option>
                <Select.Option value="private">
                  Cá nhân (chỉ user được chỉ định)
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Hoạt động" name="isActive" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        {couponScope === "private" && (
          <Form.Item
            label="Danh sách user được áp dụng"
            name="applicableUsers"
            extra="Nhập user IDs (cách nhau bởi dấu phẩy)"
          >
            <Select
              mode="tags"
              placeholder="Nhập email hoặc ID user"
              open={false}
            />
          </Form.Item>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Ngày bắt đầu" name="startDate">
              <DatePicker
                showTime
                style={{ width: "100%" }}
                placeholder="Không giới hạn"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày kết thúc" name="endDate">
              <DatePicker
                showTime
                style={{ width: "100%" }}
                placeholder="Không giới hạn"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Ghi chú" name="note">
          <Input.TextArea
            placeholder="Ghi chú nội bộ (không hiển thị với user)"
            rows={2}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCoupon;
