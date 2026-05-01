import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType } from "@ant-design/pro-components";
import receiptService from "@/services/receiptService";
import supplierService from "@/services/supplierService";
import productService from "@/services/productService";
import variantService from "@/services/variantService";
import { Supplier } from "@/types/supplier";
import { Product } from "@/types/product";
import { Variant } from "@/types/variant";
import { ReceiptFormItem } from "@/types/receipt";
import useUserStore from "@/store/useUserStore";
const { Text } = Typography;

// Safe accessor for any possible variant color/size shape
const getColorName = (color: unknown): string => {
  if (!color) return "";
  if (typeof color === "object") {
    const c = color as Record<string, unknown>;
    if (typeof c.name === "string") return c.name;
    if (typeof c._id === "string" || typeof c.hexCode === "string") {
      return String(c._id || c.hexCode || "");
    }
  }
  if (typeof color === "string") return color;
  return "";
};

const getSizeName = (size: unknown): string => {
  if (!size) return "";
  if (typeof size === "object") {
    const s = size as Record<string, unknown>;
    if (typeof s.name === "string") return s.name;
    if (typeof s._id === "string") return s._id;
  }
  if (typeof size === "string") return size;
  return "";
};

const getVariantProductId = (productId: unknown): string => {
  if (!productId) return "";
  if (typeof productId === "string") return productId;
  if (typeof productId === "object") {
    const p = productId as Record<string, unknown>;
    if (typeof p._id === "string") return p._id;
  }
  return "";
};

interface CreateReceiptProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
}

const CreateReceipt: React.FC<CreateReceiptProps> = ({
  isOpen,
  setIsOpen,
  actionRef,
}) => {
  const user = useUserStore((state) => state.user);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // Data lists
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  // Selected values
  const [selectedSupplier, setSelectedSupplier] = useState<
    string | undefined
  >();
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();

  // Receipt items
  const [items, setItems] = useState<ReceiptFormItem[]>([]);

  // Filtered variants by selected product
  const filteredVariants = useMemo(() => {
    if (!selectedProduct) return variants;
    return variants.filter((v) => {
      const pid = getVariantProductId(v.productId);
      return pid === selectedProduct;
    });
  }, [variants, selectedProduct]);

  const loadSuppliers = useCallback(async () => {
    try {
      const res = await supplierService.getSuppliers({ pageSize: 1000 });
      if (res.success) {
        setSuppliers(res.data);
      }
    } catch {
      message.error("Không thể tải danh sách nhà cung cấp");
    }
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      const res = await productService.getProducts({ pageSize: 100 });
      if (res.success) {
        setProducts(res.data);
        console.log(res.data);
      }
    } catch {
      message.error("Không thể tải danh sách sản phẩm");
    }
  }, []);

  const loadVariants = useCallback(async () => {
    try {
      const res = await variantService.getVariants({ pageSize: 400 });
      if (res.success) {
        setVariants(res.data);
      }
    } catch {
      message.error("Không thể tải biến thể");
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      await loadSuppliers();
      await loadProducts();
      await loadVariants();
    };
    void loadData();
  }, [isOpen, loadSuppliers, loadProducts, loadVariants]);

  const handleAddItem = () => {
    const newItem: ReceiptFormItem = {
      productId: "",
      variantId: null,
      productName: "",
      variantName: null,
      costPrice: 0,
      quantity: 1,
      stock: 0,
      key: Date.now().toString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleItemChange = (
    key: string,
    field: keyof ReceiptFormItem,
    value: unknown,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.key !== key) return item;

        const updated = { ...item, [field]: value };

        if (field === "productId") {
          const product = products.find((p) => p._id === value);
          updated.productName = product?.name ?? "";
          updated.costPrice = product?.costPrice ?? 0;
          updated.variantId = null;
          updated.variantName = null;
          updated.stock = 0;
          setSelectedProduct(value as string);
        }

        if (field === "variantId") {
          const variant = filteredVariants.find((v) => v._id === value);
          if (variant) {
            const colorName = getColorName(variant.color);
            const sizeName = getSizeName(variant.size);
            updated.variantName =
              [colorName, sizeName].filter(Boolean).join(" / ") || null;
            updated.stock = variant.stock;
          } else {
            updated.variantName = null;
            updated.stock = 0;
          }
        }

        return updated;
      }),
    );
  };

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (item.costPrice || 0) * (item.quantity || 0),
        0,
      ),
    [items],
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value);

  const onFinish = async () => {
    const validItems = items.filter(
      (item) => item.productId && item.costPrice > 0 && item.quantity > 0,
    );

    if (validItems.length === 0) {
      message.error("Vui lòng thêm ít nhất 1 sản phẩm");
      return;
    }

    if (!selectedSupplier) {
      message.error("Vui lòng chọn nhà cung cấp");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        supplier: selectedSupplier,
        items: validItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || null,
          productName: item.productName || "",
          variantName: item.variantName || null,
          costPrice: item.costPrice,
          quantity: item.quantity,
        })),
        note: form.getFieldValue("note") || undefined,
        createdBy: user?._id ?? "",
      };

      const res = await receiptService.createReceipt(payload);

      if (res.success) {
        message.success("Tạo phiếu nhập hàng thành công");
        setIsOpen(false);
        form.resetFields();
        setItems([]);
        setSelectedSupplier(undefined);
        setSelectedProduct(undefined);
        setTimeout(() => actionRef.current?.reload?.(), 150);
      } else {
        message.error(res.message || "Tạo phiếu nhập hàng thất bại");
      }
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      message.error(
        err?.response?.data?.message || "Tạo phiếu nhập hàng thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    form.resetFields();
    setItems([]);
    setSelectedSupplier(undefined);
    setSelectedProduct(undefined);
  };

  const itemColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "productId",
      width: 220,
      render: (_: unknown, record: ReceiptFormItem) => (
        <Select
          placeholder="Chọn sản phẩm"
          style={{ width: "100%" }}
          value={record.productId || undefined}
          onChange={(val) => handleItemChange(record.key, "productId", val)}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={products.map((p) => ({
            value: p._id,
            label: p.name,
          }))}
        />
      ),
    },
    {
      title: "Biến thể",
      dataIndex: "variantId",
      width: 200,
      render: (_: unknown, record: ReceiptFormItem) => (
        <Select
          placeholder="Chọn biến thể (tùy chọn)"
          style={{ width: "100%" }}
          value={record.variantId || undefined}
          onChange={(val) => handleItemChange(record.key, "variantId", val)}
          allowClear
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={filteredVariants
            .filter((v) => {
              const pid = getVariantProductId(v.productId);
              return pid === record.productId;
            })
            .map((v) => {
              const colorName = getColorName(v.color);
              const sizeName = getSizeName(v.size);
              return {
                value: v._id,
                label: `${colorName} / ${sizeName} (stock: ${v.stock})`,
              };
            })}
        />
      ),
    },
    {
      title: "Giá nhập (VND)",
      dataIndex: "costPrice",
      width: 150,
      render: (_: unknown, record: ReceiptFormItem) => (
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => Number(value?.replace(/,/g, "") || 0)}
          value={record.costPrice}
          onChange={(val) =>
            handleItemChange(record.key, "costPrice", val ?? 0)
          }
          placeholder="Giá nhập"
          disabled
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 100,
      render: (_: unknown, record: ReceiptFormItem) => (
        <InputNumber
          style={{ width: "100%" }}
          min={1}
          value={record.quantity}
          onChange={(val) => handleItemChange(record.key, "quantity", val ?? 1)}
          placeholder="SL"
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "intoMoney",
      width: 140,
      align: "right" as const,
      render: (_: unknown, record: ReceiptFormItem) => (
        <Text strong style={{ color: "#e74c3c" }}>
          {formatCurrency((record.costPrice || 0) * (record.quantity || 0))}
        </Text>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      width: 50,
      render: (_: unknown, record: ReceiptFormItem) => (
        <DeleteOutlined
          style={{ color: "red", cursor: "pointer", fontSize: 16 }}
          onClick={() => handleRemoveItem(record.key)}
        />
      ),
    },
  ];

  return (
    <Modal
      title="Tạo phiếu nhập hàng"
      open={isOpen}
      onOk={() => void form.submit()}
      onCancel={handleClose}
      maskClosable={false}
      okText="Tạo phiếu"
      cancelText="Hủy"
      confirmLoading={loading}
      width={950}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Divider orientation="left" plain>
          Thông tin phiếu nhập
        </Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nhà cung cấp"
              name="supplier"
              rules={[
                { required: true, message: "Vui lòng chọn nhà cung cấp" },
              ]}
            >
              <Select
                placeholder="-- Chọn nhà cung cấp --"
                value={selectedSupplier}
                onChange={(val) => setSelectedSupplier(val)}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={suppliers.map((s) => ({
                  value: s._id,
                  label: `${s.name} (${s.code || s.phone || "NCC"})`,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ghi chú" name="note">
              <Input.TextArea placeholder="Ghi chú (tùy chọn)" rows={1} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" plain>
          Danh sách sản phẩm nhập
        </Divider>

        <div style={{ marginBottom: 8 }}>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={handleAddItem}
            style={{ width: "100%" }}
          >
            Thêm sản phẩm
          </Button>
        </div>

        <Table
          dataSource={items}
          columns={itemColumns}
          rowKey="key"
          pagination={false}
          size="small"
          scroll={{ x: 750 }}
          footer={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 8,
              }}
            >
              <Space size="large">
                <Text>
                  Tổng sản phẩm: <Text strong>{items.length}</Text>
                </Text>
                <Text strong style={{ fontSize: 16 }}>
                  Tổng tiền:{" "}
                  <Text strong style={{ color: "#e74c3c", fontSize: 18 }}>
                    {formatCurrency(totalAmount)}
                  </Text>
                </Text>
              </Space>
            </div>
          )}
        />

        {items.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#999",
              padding: "24px 0",
              border: "1px dashed #d9d9d9",
              borderRadius: 4,
              marginTop: 8,
            }}
          >
            Chưa có sản phẩm nào. Nhấn &quot;Thêm sản phẩm&quot; để bắt đầu.
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default CreateReceipt;
