import {
  Col,
  Descriptions,
  Divider,
  Drawer,
  Image,
  Row,
  Tag,
} from "antd";
import { Variant } from "@/types/product";

interface DetailVariantProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  variant: Variant | null;
}

const DetailVariant: React.FC<DetailVariantProps> = ({
  isOpen,
  setIsOpen,
  variant,
}) => {
  if (!variant) return null;

  const productName =
    typeof variant.productId === "object"
      ? (variant.productId as { name: string }).name
      : "-";

  const colorObj = variant.color as {
    name: string;
    hexCode?: string;
  } | null;

  const sizeName =
    typeof variant.size === "object"
      ? (variant.size as { name: string }).name
      : "-";

  return (
    <Drawer
      title="Chi tiết biến thể"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      footer={null}
      width={700}
    >
      <Descriptions column={2} bordered size="small">
        <Descriptions.Item label="Sản phẩm" span={2}>
          {productName}
        </Descriptions.Item>
        <Descriptions.Item label="Màu sắc">
          {colorObj ? (
            <span>
              {colorObj.hexCode && (
                <span
                  style={{
                    display: "inline-block",
                    width: 16,
                    height: 16,
                    backgroundColor: colorObj.hexCode,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    marginRight: 6,
                    verticalAlign: "middle",
                  }}
                />
              )}
              {colorObj.name}
            </span>
          ) : (
            "-"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Kích thước">{sizeName}</Descriptions.Item>
        <Descriptions.Item label="Tồn kho">
          <Tag color={variant.stock > 0 ? "green" : "red"}>
            {variant.stock}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Đã bán">{variant.soldCount}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={variant.isActive ? "green" : "red"}>
            {variant.isActive ? "Hoạt động" : "Không hoạt động"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {variant.createdAt
            ? new Date(variant.createdAt).toLocaleString("vi-VN")
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {variant.updatedAt
            ? new Date(variant.updatedAt).toLocaleString("vi-VN")
            : "-"}
        </Descriptions.Item>
      </Descriptions>

      {variant.images && variant.images.length > 0 && (
        <>
          <Divider>Ảnh biến thể</Divider>
          <Row gutter={[8, 8]}>
            {variant.images.map((url, index) => (
              <Col key={index}>
                <Image
                  src={url}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", borderRadius: 4 }}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Drawer>
  );
};

export default DetailVariant;
