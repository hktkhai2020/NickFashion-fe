import React, { useCallback, useRef, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import orderService from "@/services/orderService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import {
  Badge,
  message,
  Popconfirm,
  Space,
  Tag,
} from "antd";
import "@/styles/admin/adminPage.scss";
import DetailOrder from "@/components/admin/order/detail.order";
import UpdateOrder from "@/components/admin/order/update.order";
import { Order, OrderStatus, PaymentStatus } from "@/types/order";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

const STATUS_CONFIG: Record<OrderStatus, { color: string; label: string }> = {
  pending: { color: "gold", label: "Chờ xác nhận" },
  confirmed: { color: "blue", label: "Đã xác nhận" },
  processing: { color: "processing", label: "Đang chuẩn bị" },
  shipped: { color: "cyan", label: "Đã giao vận" },
  delivered: { color: "success", label: "Đã giao" },
  cancelled: { color: "error", label: "Đã hủy" },
  refunded: { color: "purple", label: "Đã hoàn tiền" },
  return_requested: { color: "orange", label: "Yêu cầu trả" },
  returning: { color: "lime", label: "Đang trả hàng" },
  returned: { color: "default", label: "Đã trả hàng" },
};

const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { color: string; label: string }> = {
  pending: { color: "gold", label: "Chờ thanh toán" },
  paid: { color: "success", label: "Đã thanh toán" },
  failed: { color: "error", label: "Thanh toán thất bại" },
  refunded: { color: "purple", label: "Đã hoàn tiền" },
  partial_refunded: { color: "orange", label: "Hoàn tiền một phần" },
};

const AdminSellInvoice: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [openDrawerDetail, setOpenDrawerDetail] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const handleDeleteOrder = useCallback(async (id: string) => {
    try {
      await orderService.deleteOrder(id);
      message.success("Xóa đơn hàng thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa đơn hàng thất bại");
    }
  }, []);

  const columns: ProColumns<Order>[] = [
    {
      title: "Mã đơn",
      dataIndex: "orderNumber",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 200,
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenDrawerDetail(true);
            setOrder(record);
          }}
          style={{ fontWeight: 600, fontFamily: "monospace", fontSize: 12 }}
        >
          {record.orderNumber}
        </a>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 160,
      hideInSearch: true,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.customerName}</div>
          <div style={{ fontSize: 11, color: "#888" }}>{record.customerPhone}</div>
        </div>
      ),
    },
    {
      title: "Trạng thái đơn",
      dataIndex: "status",
      width: 140,
      hideInSearch: true,
      align: "center",
      render: (_, record) => {
        const config = STATUS_CONFIG[record.status] || { color: "default", label: record.status };
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      width: 140,
      hideInSearch: true,
      align: "center",
      render: (_, record) => {
        const config = PAYMENT_STATUS_CONFIG[record.paymentStatus] || { color: "default", label: record.paymentStatus };
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      title: "Phương thức",
      dataIndex: "paymentMethod",
      width: 110,
      hideInSearch: true,
      align: "center",
      render: (_, record) => {
        const methodLabels: Record<string, string> = {
          cod: "COD",
          bank_transfer: "Chuyển khoản",
          momo: "MoMo",
          vnpay: "VNPay",
          zalopay: "ZaloPay",
        };
        return <Tag>{methodLabels[record.paymentMethod] || record.paymentMethod}</Tag>;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 130,
      hideInSearch: true,
      align: "right",
      render: (_, record) => (
        <span style={{ fontWeight: 600, color: "#e74c3c" }}>
          {formatCurrency(record.totalPrice)}
        </span>
      ),
    },
    {
      title: "Số sản phẩm",
      dataIndex: "totalQuantity",
      width: 100,
      hideInSearch: true,
      align: "center",
      render: (_, record) => {
        const qty = record.products?.reduce((sum, p) => sum + p.quantity, 0) ?? 0;
        return <Badge count={qty} style={{ backgroundColor: "#0958d9" }} showZero />;
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 140,
      hideInSearch: true,
      render: (_, record) =>
        record.createdAt
          ? new Date(record.createdAt).toLocaleString("vi-VN")
          : "-",
    },
    {
      title: "Ghi chú",
      dataIndex: "adminNote",
      width: 130,
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) =>
        record.adminNote ? (
          <span style={{ fontStyle: "italic", color: "#666" }}>
            {record.adminNote}
          </span>
        ) : (
          "-"
        ),
    },
    {
      title: "Hành động",
      valueType: "option",
      width: 100,
      fixed: "right",
      render: (_, entity) => [
        <Space key="actions" size={4}>
          <EyeOutlined
            style={{ color: "#1890ff", cursor: "pointer", fontSize: 15 }}
            onClick={() => {
              setOpenDrawerDetail(true);
              setOrder(entity);
            }}
          />
          <EditOutlined
            style={{ color: "orange", cursor: "pointer", fontSize: 15 }}
            onClick={() => {
              setOpenModalUpdate(true);
              setOrder(entity);
            }}
          />
          <Popconfirm
            title="Xóa đơn hàng"
            description="Bạn có chắc chắn muốn xóa đơn này không?"
            onConfirm={() => handleDeleteOrder(entity._id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer", fontSize: 15 }} />
          </Popconfirm>
        </Space>,
      ],
    },
  ];
  console.log(document.cookie);
  return (
    <>
      <div className="admin-page-header">
        <h2 className="admin-page-title text-2xl font-bold text-red-500 mb-2!">
          Quản lý hóa đơn bán hàng
        </h2>
      </div>

      <ProTable
        scroll={{ x: 1200 }}
        actionRef={actionRef}
        columns={columns}
        rowKey="_id"
        request={async (params, sort) => {
          let sortBy: string | undefined;
          let sortOrder: "asc" | "desc" | undefined;

          if (sort.orderNumber) {
            sortBy = "orderNumber";
            sortOrder = sort.orderNumber === "ascend" ? "asc" : "desc";
          }
          if (sort.customerName) {
            sortBy = "customerName";
            sortOrder = sort.customerName === "ascend" ? "asc" : "desc";
          }
          if (sort.totalPrice) {
            sortBy = "totalPrice";
            sortOrder = sort.totalPrice === "ascend" ? "asc" : "desc";
          }
          if (sort.createdAt) {
            sortBy = "createdAt";
            sortOrder = sort.createdAt === "ascend" ? "asc" : "desc";
          }

          const res = await orderService.getOrders({
            current: params.current,
            pageSize: params.pageSize,
            sortBy,
            sortOrder,
            search: params.orderNumber,
            status: params.status,
            paymentStatus: params.paymentStatus,
            paymentMethod: params.paymentMethod,
            startDate: params.startDate,
            endDate: params.endDate,
            customerName: params.customerName,
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
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} đơn hàng`,
        }}
        search={{
          labelWidth: "auto",
          filterType: "query",
        }}
        toolBarRender={() => []}
      />

      <DetailOrder
        isOpen={openDrawerDetail}
        setIsOpen={setOpenDrawerDetail}
        order={order}
       
      />
      <UpdateOrder
        isOpen={openModalUpdate}
        setIsOpen={setOpenModalUpdate}
        actionRef={actionRef}
        order={order}
      />
    </>
  );
};

export default AdminSellInvoice;
