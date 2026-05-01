import React, { useCallback, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import productService from "@/services/productService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Badge, Button, Image, message, Popconfirm, Tag } from "antd";
import "@/styles/admin/adminPage.scss";
import CreateProduct from "@/components/admin/product/create.product";
import UpdateProduct from "@/components/admin/product/update.product";
import DetailProduct from "@/components/admin/product/detail.product";
import { Product } from "@/types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

const AdminProduct: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [exportData, setExportData] = useState<Product[]>([]);

  const handleDeleteProduct = useCallback(async (id: string) => {
    try {
      await productService.deleteProduct(id);
      message.success("Xóa sản phẩm thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa sản phẩm thất bại");
    }
  }, []);

  const columns: ProColumns<Product>[] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 250,
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenModalDetail(true);
            setProduct(record);
          }}
          style={{ fontWeight: 500 }}
        >
          {record.name}
        </a>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      valueType: "image",
      width: 80,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.thumbnail ? (
          <Image
            src={record.thumbnail}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      hideInSearch: true,
      render: (_, record) => (
        <span style={{ fontFamily: "monospace", fontSize: 12 }}>
          {record.sku}
        </span>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: ["category", "name"],
      width: 130,
      hideInSearch: true,
      render: (_, record) =>
        record.category?.map((c) => (
          <Tag key={c._id} color="blue" style={{marginBottom: 5}}>
            {c.name}
          </Tag>
        )),
    },
    {
      title: "Thương hiệu",
      dataIndex: ["brand", "name"],
      width: 120,
      hideInSearch: true,
    },
    {
      title: "Giá gốc",
      dataIndex: "priceSell",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 120,
      hideInSearch: true,
      align: "right",
      render: (_, record) => (
        <span style={{ fontWeight: 600 }}>
          {formatCurrency(record.priceSell)}
        </span>
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "finalPrice",
      width: 120,
      hideInSearch: true,
      align: "right",
      render: (_, record) => (
        <span
          style={{
            color: record.finalPrice < record.priceSell ? "#ff4d4f" : "#000",
          }}
        >
          {formatCurrency(record.finalPrice)}
        </span>
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: ["sale", "discountValue"],
      width: 90,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.is?.discounted && record.sale?.discountValue > 0 ? (
          <Tag color="red">
            {record.sale.discountType === "percentage"
              ? `-${record.sale.discountValue}%`
              : formatCurrency(record.sale.discountValue)}
          </Tag>
        ) : (
          <Tag>-</Tag>
        ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stats.sold",
      width: 90,
      hideInSearch: true,
      align: "center",
      render: (_, record) => {
        const totalStock =
          record.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0;
        return totalStock <= 0 ? (
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
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "is.active",
      width: 100,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.is?.active ? (
          <Badge status="success" text="Active" />
        ) : (
          <Badge status="default" text="Inactive" />
        ),
    },
    {
      title: "Nổi bật",
      dataIndex: "is.featured",
      width: 90,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.is?.featured ? <Tag color="gold">Nổi bật</Tag> : null,
    },
    {
      title: "Mới",
      dataIndex: "is.new",
      width: 70,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.is?.new ? <Tag color="cyan">Mới</Tag> : null,
    },
    {
      title: "Hành động",
      valueType: "option",
      width: 80,
      fixed: "right",
      render: (_, entity) => [
        <>
          <EditOutlined
            style={{ color: "orange", marginRight: 8, cursor: "pointer" }}
            onClick={() => {
              setOpenModalUpdate(true);
              setProduct(entity);
            }}
          />
          <Popconfirm
            key="delete"
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={() => handleDeleteProduct(entity._id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </>,
      ],
    },
  ];

  return (
    <>
      <div className="admin-page-header">
        <h2 className="admin-page-title text-2xl font-bold text-red-500 mb-2!">
          Quản lý sản phẩm
        </h2>
      </div>

      <ProTable
        scroll={{ x: 800 }}
        actionRef={actionRef}
        columns={columns}
        rowKey="_id"
        request={async (params, sort) => {
          let sortBy;
          let sortOrder;

          if (sort.name) {
            sortBy = "name";
            sortOrder = sort.name === "ascend" ? "asc" : "desc";
          }
          if (sort.priceSell) {
            sortBy = "priceSell";
            sortOrder = sort.priceSell === "ascend" ? "asc" : "desc";
          }
          if (sort.createdAt) {
            sortBy = "createdAt";
            sortOrder = sort.createdAt === "ascend" ? "asc" : "desc";
          }

          const res = await productService.getProducts({
            current: params.current,
            pageSize: params.pageSize,
            search: params.name,
            sortBy: sortBy as
              | "sortOrder"
              | "name"
              | "createdAt"
              | "updatedAt"
              | undefined,
            sortOrder: sortOrder as "asc" | "desc" | undefined,
          });

          if (!res.success) {
            return { data: [], success: false, total: 0 };
          }
          setExportData(res.data);
          return {
            data: res.data,
            success: true,
            total: res.pagination.total,
          };
        }}
        pagination={{
          pageSize: 20,
          pageSizeOptions: [20, 25, 30, 40],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} sản phẩm`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách sản phẩm"
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="create"
            onClick={() => setOpenModalCreate(true)}
            type="primary"
          >
            <PlusOutlined />
            Thêm sản phẩm
          </Button>,
          <Button key="export" icon={<ExportOutlined />} type="primary">
            <CSVLink
              data={exportData.map((p) => ({
                name: p.name,
                sku: p.sku,
                priceSell: p.priceSell,
                finalPrice: p.finalPrice,
                stock:
                  p.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0,
                isActive: p.is?.active,
                createdAt: p.createdAt,
              }))}
              filename="export_products.csv"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Export
            </CSVLink>
          </Button>,
        ]}
      />

      <CreateProduct
        isOpen={openModalCreate}
        setIsOpen={setOpenModalCreate}
        actionRef={actionRef}
      />
      <UpdateProduct
        isOpen={openModalUpdate}
        setIsOpen={setOpenModalUpdate}
        actionRef={actionRef}
        product={product as Product}
      />
      <DetailProduct
        isOpen={openModalDetail}
        setIsOpen={setOpenModalDetail}
        product={product as Product}
      />
    </>
  );
};

export default AdminProduct;
