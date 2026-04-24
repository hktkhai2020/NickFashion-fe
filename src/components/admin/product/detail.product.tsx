import { Product } from "@/types/product";
import {
  Badge,
  Descriptions,
  DescriptionsProps,
  Drawer,
  Image,
  Tag,
} from "antd";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

const DetailProduct = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: Product;
}) => {
  const { isOpen, setIsOpen, product } = props;

  const totalStock =
    product?.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0;
  const totalSold =
    product?.variants?.reduce((sum, v) => sum + (v.soldCount || 0), 0) ?? 0;

  const items: DescriptionsProps["items"] = [
    {
      key: "name",
      label: "Tên sản phẩm",
      children: <span style={{ fontWeight: 600 }}>{product?.name}</span>,
      span: 2,
    },
    {
      key: "sku",
      label: "SKU",
      children: (
        <code
          style={{ background: "#f5f5f5", padding: "2px 6px", borderRadius: 4 }}
        >
          {product?.sku}
        </code>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      children: <span style={{ fontSize: 12 }}>{product?.slug}</span>,
      span: 2,
    },
    {
      key: "category",
      label: "Danh mục",
      children: product?.category?.map((c) => (
        <Tag key={c._id} color="blue">
          {c.name}
        </Tag>
      )),
      span: 2,
    },
    {
      key: "brand",
      label: "Thương hiệu",
      children: product?.brand?.name || "-",
    },
    {
      key: "supplier",
      label: "Nhà cung cấp",
      children: product?.supplier?.name || "-",
    },
    {
      key: "priceSell",
      label: "Giá gốc",
      children: (
        <span style={{ fontWeight: 600 }}>
          {product?.priceSell ? formatCurrency(product.priceSell) : "-"}
        </span>
      ),
    },
    {
      key: "finalPrice",
      label: "Giá bán",
      children: (
        <span
          style={{
            color:
              product?.finalPrice &&
              product?.priceSell &&
              product.finalPrice < product.priceSell
                ? "#ff4d4f"
                : "#000",
            fontWeight: 600,
          }}
        >
          {product?.finalPrice ? formatCurrency(product.finalPrice) : "-"}
        </span>
      ),
    },
    {
      key: "costPrice",
      label: "Giá vốn",
      children: product?.costPrice ? formatCurrency(product.costPrice) : "-",
    },
    {
      key: "material",
      label: "Chất liệu",
      children: product?.material || "-",
    },
    {
      key: "weight",
      label: "Cân nặng",
      children: product?.weight ? `${product.weight}g` : "-",
    },
    {
      key: "gender",
      label: "Giới tính",
      children: product?.gender?.length
        ? product.gender.map((g) => {
            const labels: Record<string, string> = {
              man: "Nam",
              woman: "Nữ",
              boy: "Bé trai",
              girl: "Bé gái",
              unisex: "Trung tính",
            };
            return <Tag key={g}>{labels[g] || g}</Tag>;
          })
        : "-",
    },
    {
      key: "tags",
      label: "Tags",
      children: product?.tags?.length
        ? product.tags.map((t, i) => <Tag key={i}>{t}</Tag>)
        : "-",
      span: 2,
    },
    {
      key: "description",
      label: "Mô tả",
      children: product?.description || "-",
      span: 3,
    },
    {
      key: "isActive",
      label: "Trạng thái",
      children: product?.is?.active ? (
        <Badge status="success" text="Active" />
      ) : (
        <Badge status="default" text="Inactive" />
      ),
    },
    {
      key: "isFeatured",
      label: "Nổi bật",
      children: product?.is?.featured ? <Tag color="gold">Nổi bật</Tag> : "-",
    },
    {
      key: "isNew",
      label: "Sản phẩm mới",
      children: product?.is?.new ? <Tag color="cyan">Mới</Tag> : "-",
    },
    {
      key: "isBestSeller",
      label: "Bán chạy",
      children: product?.is?.bestSeller ? (
        <Tag color="orange">Bán chạy</Tag>
      ) : (
        "-"
      ),
    },
    {
      key: "discounted",
      label: "Giảm giá",
      children:
        product?.is?.discounted && product?.sale?.discountValue > 0 ? (
          <Tag color="red">
            {product?.sale?.discountType === "percentage"
              ? `-${product?.sale?.discountValue}%`
              : formatCurrency(product?.sale?.discountValue ?? 0)}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      key: "stock",
      label: "Tồn kho",
      children:
        totalStock <= 0 ? (
          <Badge
            status="error"
            text={<span style={{ color: "#ff4d4f" }}>Hết hàng</span>}
          />
        ) : totalStock <= 10 ? (
          <Badge
            status="warning"
            text={<span style={{ color: "#faad14" }}>{totalStock}</span>}
          />
        ) : (
          <Badge status="success" text={<span>{totalStock}</span>} />
        ),
    },
    {
      key: "sold",
      label: "Đã bán",
      children: totalSold,
    },
    {
      key: "views",
      label: "Lượt xem",
      children: product?.stats?.views || 0,
    },
    {
      key: "rating",
      label: "Đánh giá",
      children: product?.stats?.rating
        ? `${product.stats.rating} / 5 (${product.stats.reviews} đánh giá)`
        : "-",
    },
  ];

  return (
    <>
      <Drawer
        title="Chi tiết sản phẩm"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={700}
      >
        <Descriptions
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {product?.thumbnail && (
                <Image
                  src={product?.thumbnail}
                  width={60}
                  height={60}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                  fallback="https://via.placeholder.com/60"
                />
              )}
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  {product?.name}
                </div>
              </div>
            </div>
          }
          items={items}
          bordered
          column={2}
          size="small"
        />

        {product?.slides && product.slides.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h4>Ảnh slides</h4>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.slides.map((url, i) => (
                <Image
                  key={i}
                  src={url}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                  fallback="https://via.placeholder.com/100"
                />
              ))}
            </div>
          </div>
        )}

        {product?.variants && product?.variants?.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h4>Biến thể sản phẩm</h4>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "left",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Màu sắc
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "left",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Size
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "center",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Tồn kho
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "center",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Đã bán
                  </th>
                  <th
                    style={{
                      padding: "8px 12px",
                      textAlign: "center",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {product?.variants?.map((v, i) => {
                  const colorName =
                    typeof v.color === "object" ? v.color.name : "";
                  const hexCode =
                    typeof v.color === "object" ? v.color.hexCode : "";
                  const sizeName =
                    typeof v.size === "object" ? v.size.name : "";
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          {hexCode && (
                            <span
                              style={{
                                display: "inline-block",
                                width: 14,
                                height: 14,
                                backgroundColor: hexCode,
                                borderRadius: 2,
                                border: "1px solid #d9d9d9",
                              }}
                            />
                          )}
                          {colorName ||
                            (typeof v.color === "string" ? v.color : "")}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        {sizeName || (typeof v.size === "string" ? v.size : "")}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom: "1px solid #f0f0f0",
                          textAlign: "center",
                        }}
                      >
                        {v.stock}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom: "1px solid #f0f0f0",
                          textAlign: "center",
                        }}
                      >
                        {v.soldCount || 0}
                      </td>
                      <td
                        style={{
                          padding: "8px 12px",
                          borderBottom: "1px solid #f0f0f0",
                          textAlign: "center",
                        }}
                      >
                        {v.isActive ? (
                          <Badge status="success" text="Active" />
                        ) : (
                          <Badge status="default" text="Inactive" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default DetailProduct;
