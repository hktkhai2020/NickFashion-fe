import React, { useCallback, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import couponService from "@/services/couponService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Badge, Button, message, Popconfirm, Tag } from "antd";
import "@/styles/admin/adminPage.scss";
import CreateCoupon from "@/components/admin/coupon/create.coupon";
import UpdateCoupon from "@/components/admin/coupon/update.coupon";
import DetailCoupon from "@/components/admin/coupon/detail.coupon";
import { Coupon } from "@/types/coupon";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

const AdminCoupon: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);

  const handleDeleteCoupon = useCallback(async (id: string) => {
    try {
      await couponService.deleteCoupon(id);
      message.success("Xóa mã giảm giá thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa mã giảm giá thất bại");
    }
  }, []);

  const handleToggleStatus = useCallback(async (id: string) => {
    try {
      const res = await couponService.toggleCouponStatus(id);
      if (res.success) {
        message.success(res.message);
        actionRef.current?.reload();
      } else {
        message.error(res.message || "Thao tác thất bại");
      }
    } catch {
      message.error("Thao tác thất bại");
    }
  }, []);

  const columns: ProColumns<Coupon>[] = [
    {
      title: "Mã coupon",
      dataIndex: "code",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 140,
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenModalDetail(true);
            setCoupon(record);
          }}
          style={{ fontWeight: 600, fontFamily: "monospace" }}
        >
          {record.code}
        </a>
      ),
    },
    {
      title: "Tên coupon",
      dataIndex: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 180,
      hideInSearch: true,
      render: (_, record) => (
        <span style={{ fontWeight: 500 }}>{record.name}</span>
      ),
    },
    {
      title: "Loại giảm",
      dataIndex: "type",
      width: 110,
      hideInSearch: true,
      align: "center",
      render: (_, record) => (
        <Tag color={record.type === "percentage" ? "blue" : "green"}>
          {record.type === "percentage"
            ? `Phần trăm (${record.value}%)`
            : `Cố định (${formatCurrency(record.value)})`}
        </Tag>
      ),
    },
    {
      title: "Giảm tối đa",
      dataIndex: "maxDiscount",
      width: 120,
      hideInSearch: true,
      align: "right",
      render: (_, record) =>
        record.maxDiscount ? formatCurrency(record.maxDiscount) : "-",
    },
    {
      title: "Đơn tối thiểu",
      dataIndex: "minOrderAmount",
      width: 120,
      hideInSearch: true,
      align: "right",
      render: (_, record) =>
        record.minOrderAmount > 0
          ? formatCurrency(record.minOrderAmount)
          : "-",
    },
    {
      title: "Lượt dùng",
      dataIndex: "usedCount",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 110,
      hideInSearch: true,
      align: "center",
      render: (_, record) => {
        const limit = record.usageLimit;
        return limit ? (
          <span>
            {record.usedCount} / {limit}
          </span>
        ) : (
          <span>{record.usedCount}</span>
        );
      },
    },
    {
      title: "Phạm vi",
      dataIndex: "scope",
      width: 90,
      hideInSearch: true,
      align: "center",
      render: (_, record) => (
        <Tag color={record.scope === "public" ? "cyan" : "purple"}>
          {record.scope === "public" ? "Công khai" : "Cá nhân"}
        </Tag>
      ),
    },
    {
      title: "Hiệu lực",
      dataIndex: "startDate",
      width: 130,
      hideInSearch: true,
      render: (_, record) => {
        if (!record.startDate && !record.endDate) return <Tag>Không giới hạn</Tag>;
        const start = record.startDate
          ? new Date(record.startDate).toLocaleDateString("vi-VN")
          : "-";
        const end = record.endDate
          ? new Date(record.endDate).toLocaleDateString("vi-VN")
          : "-";
        return (
          <span style={{ fontSize: 12 }}>
            {start} → {end}
          </span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      width: 100,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.isActive ? (
          <Badge status="success" text="Active" />
        ) : (
          <Badge status="error" text="Inactive" />
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 130,
      hideInSearch: true,
      render: (_, record) =>
        record.createdAt
          ? new Date(record.createdAt).toLocaleString("vi-VN")
          : "-",
    },
    {
      title: "Hành động",
      valueType: "option",
      width: 120,
      fixed: "right",
      render: (_, entity) => [
        <>
          <EditOutlined
            style={{ color: "orange", marginRight: 8, cursor: "pointer" }}
            onClick={() => {
              setOpenModalUpdate(true);
              setCoupon(entity);
            }}
          />
          <Popconfirm
            key="delete"
            title="Xóa mã giảm giá"
            description="Bạn có chắc chắn muốn xóa mã này không?"
            onConfirm={() => handleDeleteCoupon(entity._id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
          <Popconfirm
            key="toggle"
            title={
              entity.isActive
                ? "Vô hiệu hóa mã giảm giá?"
                : "Kích hoạt mã giảm giá?"
            }
            description={
              entity.isActive
                ? "Mã giảm giá sẽ không thể sử dụng."
                : "Mã giảm giá sẽ có thể sử dụng được."
            }
            onConfirm={() => handleToggleStatus(entity._id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Tag
              color={entity.isActive ? "error" : "success"}
              style={{ cursor: "pointer", marginLeft: 8 }}
            >
              {entity.isActive ? "Tắt" : "Bật"}
            </Tag>
          </Popconfirm>
        </>,
      ],
    },
  ];

  return (
    <>
      <div className="admin-page-header">
        <h2 className="admin-page-title text-2xl font-bold text-red-500 mb-2!">
          Quản lý mã giảm giá
        </h2>
      </div>

      <ProTable
        scroll={{ x: 1000 }}
        actionRef={actionRef}
        columns={columns}
        rowKey="_id"
        request={async (params, sort) => {
          let sortBy: string | undefined;
          let sortOrder: "asc" | "desc" | undefined;

          if (sort.code) {
            sortBy = "code";
            sortOrder = sort.code === "ascend" ? "asc" : "desc";
          }
          if (sort.name) {
            sortBy = "name";
            sortOrder = sort.name === "ascend" ? "asc" : "desc";
          }
          if (sort.usedCount) {
            sortBy = "usedCount";
            sortOrder = sort.usedCount === "ascend" ? "asc" : "desc";
          }
          if (sort.createdAt) {
            sortBy = "createdAt";
            sortOrder = sort.createdAt === "ascend" ? "asc" : "desc";
          }
          if (sort.value) {
            sortBy = "value";
            sortOrder = sort.value === "ascend" ? "asc" : "desc";
          }

          const res = await couponService.getCoupons({
            current: params.current,
            pageSize: params.pageSize,
            sortBy,
            sortOrder,
            search: params.code,
            isActive: params.isActive,
          });

          if (!res.success) {
            return { data: [], success: false, total: 0 };
          }

          return {
            data: res.data,
            success: true,
            total: res.pagination.total,
          };
        }}
        pagination={{
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mã giảm giá`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách mã giảm giá"
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="create"
            onClick={() => setOpenModalCreate(true)}
            type="primary"
          >
            <PlusOutlined />
            Thêm mã giảm giá
          </Button>,
        ]}
      />

      <CreateCoupon
        isOpen={openModalCreate}
        setIsOpen={setOpenModalCreate}
        actionRef={actionRef}
      />
      <UpdateCoupon
        isOpen={openModalUpdate}
        setIsOpen={setOpenModalUpdate}
        actionRef={actionRef}
        coupon={coupon as Coupon}
      />
      <DetailCoupon
        isOpen={openModalDetail}
        setIsOpen={setOpenModalDetail}
        coupon={coupon}
      />
    </>
  );
};

export default AdminCoupon;
