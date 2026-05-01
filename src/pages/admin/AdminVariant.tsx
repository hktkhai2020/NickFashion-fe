import React, { useCallback, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import variantService from "@/services/variantService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Badge, Button, Image, message, Popconfirm } from "antd";
import "@/styles/admin/adminPage.scss";
import CreateVariant from "@/components/admin/variant/create.variant";
import UpdateVariant from "@/components/admin/variant/update.variant";
import DetailVariant from "@/components/admin/variant/detail.variant";
import { Variant } from "@/types/product";

const AdminVariant: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [variant, setVariant] = useState<Variant | null>(null);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);

  const handleDeleteVariant = useCallback(async (id: string) => {
    try {
      await variantService.deleteVariant(id);
      message.success("Xóa biến thể thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa biến thể thất bại");
    }
  }, []);

  const columns: ProColumns<Variant>[] = [
    {
      title: "Sản phẩm",
      dataIndex: ["productId", "name"],
      width: 200,
      render: (_, record) => {
        const name =
          typeof record.productId === "object"
            ? (record.productId as { name: string })?.name
            : "-";
        return (
          <a
            onClick={() => {
              setOpenModalDetail(true);
              setVariant(record);
            }}
            style={{ fontWeight: 500 }}
          >
            {name}
          </a>
        );
      },
    },
    {
      title: "Màu sắc",
      dataIndex: ["color", "name"],
      width: 130,
      hideInSearch: true,
      render: (_, record) => {
        const colorObj = record.color as {
          name: string;
          hexCode?: string;
        } | null;
        if (!colorObj) return "-";
        return (
          <span>
            {colorObj.hexCode && (
              <span
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  backgroundColor: colorObj.hexCode,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  marginRight: 6,
                  verticalAlign: "middle",
                }}
              />
            )}
            {colorObj.name || "-"}
          </span>
        );
      },
    },
    {
      title: "Kích thước",
      dataIndex: ["size", "name"],
      width: 110,
      hideInSearch: true,
      render: (_, record) => {
        const sizeName =
          typeof record.size === "object"
            ? (record.size as { name: string }).name
            : "-";
        return sizeName;
      },
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      width: 80,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.images && record.images.length > 0 ? (
          <Image
            src={record.images[0]}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 90,
      hideInSearch: true,
      align: "center",
      render: (_, record) => {
        if (record.stock <= 0) {
          return (
            <Badge
              status="error"
              text={<span style={{ color: "#ff4d4f" }}>Hết hàng</span>}
            />
          );
        }
        if (record.stock <= 10) {
          return (
            <Badge
              status="warning"
              text={<span style={{ color: "#faad14" }}>{record.stock}</span>}
            />
          );
        }
        return <Badge status="success" text={<span>{record.stock}</span>} />;
      },
    },
    {
      title: "Đã bán",
      dataIndex: "soldCount",
      width: 80,
      hideInSearch: true,
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      width: 110,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.isActive ? (
          <Badge status="success" text="Active" />
        ) : (
          <Badge status="default" text="Inactive" />
        ),
    },
    {
      title: "Ngày tạo",
      sorter: true,
      dataIndex: "createdAt",
      width: 150,
      hideInSearch: true,
      render: (_, record) =>
        record.createdAt
          ? new Date(record.createdAt).toLocaleString("vi-VN")
          : "-",
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
              setVariant(entity);
            }}
          />
          <Popconfirm
            key="delete"
            title="Xóa biến thể"
            description="Bạn có chắc chắn muốn xóa biến thể này không?"
            onConfirm={() => handleDeleteVariant(entity._id)}
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
          Quản lý biến thể sản phẩm
        </h2>
      </div>

      <ProTable
        scroll={{ x: 800 }}
        actionRef={actionRef}
        columns={columns}
        rowKey="_id"
        request={async (params, sort) => {
          let sortBy: string | undefined;
          let sortOrder: "asc" | "desc" | undefined;

          if (sort.stock) {
            sortBy = "stock";
            sortOrder = sort.stock === "ascend" ? "asc" : "desc";
          }
          if (sort.createdAt) {
            sortBy = "createdAt";
            sortOrder = sort.createdAt === "ascend" ? "asc" : "desc";
          }
          const res = await variantService.getVariants({
            current: params.current,
            pageSize: params.pageSize,
            sortBy,
            sortOrder,
            search: params?.productId?.name,
          });

          if (!res.success) {
            return { data: [], success: false, total: 0 };
          }

          const data = res.data;

          return {
            data,
            success: true,
            total: res.pagination.total,
          };
        }}
        pagination={{
          pageSize: 20,
          pageSizeOptions: [20, 25, 30, 40],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} biến thể`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách biến thể"
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="create"
            onClick={() => setOpenModalCreate(true)}
            type="primary"
          >
            <PlusOutlined />
            Thêm biến thể
          </Button>,
        ]}
      />

      <CreateVariant
        isOpen={openModalCreate}
        setIsOpen={setOpenModalCreate}
        actionRef={actionRef}
      />
      <UpdateVariant
        isOpen={openModalUpdate}
        setIsOpen={setOpenModalUpdate}
        actionRef={actionRef}
        variant={variant as Variant}
      />
      <DetailVariant
        isOpen={openModalDetail}
        setIsOpen={setOpenModalDetail}
        variant={variant}
      />
    </>
  );
};

export default AdminVariant;
