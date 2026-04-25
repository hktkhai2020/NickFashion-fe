import {
  Col,
  Descriptions,
  Divider,
  Modal,
  Row,
  Tag,
} from "antd";
import { Coupon } from "@/types/coupon";

interface DetailCouponProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  coupon: Coupon | null;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

const DetailCoupon: React.FC<DetailCouponProps> = ({
  isOpen,
  setIsOpen,
  coupon,
}) => {
  if (!coupon) return null;

  const isExpired =
    coupon.endDate && new Date() > new Date(coupon.endDate);
  const isNotStarted =
    coupon.startDate && new Date() < new Date(coupon.startDate);

  return (
    <Modal
      title={`Chi tiết: ${coupon.code}`}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      width={700}
    >
      <Descriptions column={2} bordered size="small">
        <Descriptions.Item label="Mã coupon" span={2}>
          <Tag color="blue" style={{ fontFamily: "monospace", fontSize: 14 }}>
            {coupon.code}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tên" span={2}>
          {coupon.name}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={2}>
          {coupon.description || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Loại giảm">
          <Tag color={coupon.type === "percentage" ? "blue" : "green"}>
            {coupon.type === "percentage" ? "Phần trăm" : "Cố định (VND)"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Giá trị giảm">
          {coupon.type === "percentage"
            ? `${coupon.value}%`
            : formatCurrency(coupon.value)}
        </Descriptions.Item>
        <Descriptions.Item label="Giảm tối đa">
          {coupon.maxDiscount ? formatCurrency(coupon.maxDiscount) : "Không giới hạn"}
        </Descriptions.Item>
        <Descriptions.Item label="Đơn hàng tối thiểu">
          {coupon.minOrderAmount > 0
            ? formatCurrency(coupon.minOrderAmount)
            : "Không yêu cầu"}
        </Descriptions.Item>
        <Descriptions.Item label="Lượt đã dùng">
          {coupon.usedCount}
          {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Mỗi user dùng tối đa">
          {coupon.usageLimitPerUser} lần
        </Descriptions.Item>
        <Descriptions.Item label="Phạm vi">
          <Tag color={coupon.scope === "public" ? "cyan" : "purple"}>
            {coupon.scope === "public" ? "Công khai" : "Cá nhân"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {isExpired ? (
            <Tag color="default">Đã hết hạn</Tag>
          ) : isNotStarted ? (
            <Tag color="gold">Chưa bắt đầu</Tag>
          ) : coupon.isActive ? (
            <Tag color="success">Hoạt động</Tag>
          ) : (
            <Tag color="error">Không hoạt động</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày bắt đầu">
          {coupon.startDate
            ? new Date(coupon.startDate).toLocaleString("vi-VN")
            : "Không giới hạn"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày kết thúc">
          {coupon.endDate
            ? new Date(coupon.endDate).toLocaleString("vi-VN")
            : "Không giới hạn"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {coupon.createdAt
            ? new Date(coupon.createdAt).toLocaleString("vi-VN")
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {coupon.updatedAt
            ? new Date(coupon.updatedAt).toLocaleString("vi-VN")
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú" span={2}>
          {coupon.note || "-"}
        </Descriptions.Item>
      </Descriptions>

      {coupon.applicableCategories && coupon.applicableCategories.length > 0 && (
        <>
          <Divider>Danh mục áp dụng</Divider>
          <Row gutter={[4, 4]}>
            {coupon.applicableCategories.map((cat) => (
              <Col key={cat._id}>
                <Tag color="blue">{cat.name}</Tag>
              </Col>
            ))}
          </Row>
        </>
      )}

      {coupon.applicableProducts && coupon.applicableProducts.length > 0 && (
        <>
          <Divider>Sản phẩm áp dụng</Divider>
          <Row gutter={[4, 4]}>
            {coupon.applicableProducts.map((prod) => (
              <Col key={prod._id}>
                <Tag color="green">{prod.name}</Tag>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Modal>
  );
};

export default DetailCoupon;
