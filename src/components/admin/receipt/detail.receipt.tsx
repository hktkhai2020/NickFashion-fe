import React from "react";
import {
  Col,
  Descriptions,
  Divider,
  Drawer,
  Row,
  Table,
  Typography,
} from "antd";
import { Receipt } from "@/types/receipt";

const { Text } = Typography;

interface DetailReceiptProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  receipt: Receipt | null;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

const DetailReceipt: React.FC<DetailReceiptProps> = ({
  isOpen,
  setIsOpen,
  receipt,
}) => {
  if (!receipt) return null;

  const totalQuantity = receipt.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const itemCount = receipt.itemCount ?? receipt.items.length;

  const itemColumns = [
    {
      title: "Sản phẩm",
      key: "product",
      render: (_: unknown, record: (typeof receipt.items)[0]) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.productName}</div>
          {record.variantName && (
            <div style={{ fontSize: 11, color: "#888" }}>
              {record.variantName}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Giá nhập",
      dataIndex: "costPrice",
      key: "costPrice",
      align: "right" as const,
      width: 130,
      render: (costPrice: number) => formatCurrency(costPrice),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center" as const,
      width: 80,
    },
    {
      title: "Thành tiền",
      dataIndex: "intoMoney",
      key: "intoMoney",
      align: "right" as const,
      width: 150,
      render: (intoMoney: number) => (
        <Text strong style={{ color: "#e74c3c" }}>
          {formatCurrency(intoMoney)}
        </Text>
      ),
    },
  ];

  return (
    <Drawer
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Chi tiết phiếu nhập: {receipt.code}</span>
        </div>
      }
      placement="right"
      width={700}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Descriptions column={1} size="small" title="Nhà cung cấp">
            <Descriptions.Item label="Tên">
              {receipt.supplier?.name || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Mã NCC">
              {receipt.supplier?.code || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Điện thoại">
              {receipt.supplier?.phone || "-"}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions column={1} size="small" title="Thông tin phiếu">
            <Descriptions.Item label="Người tạo">
              {receipt.createdBy?.name || (
                <span style={{ color: "#999", fontStyle: "italic" }}>--</span>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Số sản phẩm">
              {itemCount}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {receipt.createdAt
                ? new Date(receipt.createdAt).toLocaleString("vi-VN")
                : "-"}
            </Descriptions.Item>
            {receipt.note && (
              <Descriptions.Item label="Ghi chú">
                {receipt.note}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>

      <Divider style={{ margin: "12px 0" }}>Danh sách sản phẩm nhập</Divider>
      <Table
        dataSource={receipt.items}
        columns={itemColumns}
        rowKey={(_: unknown, index?: number) => String(index)}
        pagination={false}
        size="small"
        footer={() => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-end",
            }}
          >
            <div>
              Tổng số sản phẩm: <Text strong>{totalQuantity}</Text>
            </div>
            <div style={{ fontSize: 16 }}>
              <Text strong>
                Tổng tiền:{" "}
                <Text strong style={{ color: "#e74c3c", fontSize: 18 }}>
                  {formatCurrency(receipt.totalAmount)}
                </Text>
              </Text>
            </div>
          </div>
        )}
      />
    </Drawer>
  );
};

export default DetailReceipt;
