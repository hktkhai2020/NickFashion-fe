import React, { useCallback, useRef, useState } from "react";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import receiptService from "@/services/receiptService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Tag } from "antd";
import "@/styles/admin/adminPage.scss";
import DetailReceipt from "@/components/admin/receipt/detail.receipt";
import CreateReceipt from "@/components/admin/receipt/create.receipt";
import { Receipt } from "@/types/receipt";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

const AdminGoodsReceipt: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [openDrawerDetail, setOpenDrawerDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleCancelReceipt = useCallback(async (id: string) => {
    try {
      const res = await receiptService.cancelReceipt(id);
      if (res.success) {
        message.success("Xóa phiếu nhập hàng thành công");
        actionRef.current?.reload();
      } else {
        message.error(res.message || "Xóa phiếu nhập hàng thất bại");
      }
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      message.error(
        err?.response?.data?.message || "Xóa phiếu nhập hàng thất bại",
      );
    }
  }, []);

  const columns: ProColumns<Receipt>[] = [
    {
      title: "Mã phiếu",
      dataIndex: "code",
      copyable: true,
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 130,
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenDrawerDetail(true);
            setReceipt(record);
          }}
          style={{ fontWeight: 600, fontFamily: "monospace", fontSize: 13 }}
        >
          {record.code}
        </a>
      ),
    },
    {
      title: "Nhà cung cấp",
      dataIndex: ["supplier", "name"],
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 180,
      hideInSearch: true,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.supplier?.name}</div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: ["supplier", "phone"],
      width: 130,
      hideInSearch: true,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.supplier?.phone}</div>
        </div>
      ),
    },

    {
      title: "Số sản phẩm",
      dataIndex: "items",
      width: 110,
      hideInSearch: true,
      align: "center",
      render: (_, record) => <Tag color="blue">{record.items?.length} SP</Tag>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      hideInSearch: true,
      align: "right",
      render: (_, record) => (
        <span style={{ fontWeight: 600, color: "#e74c3c" }}>
          {formatCurrency(record.totalAmount)}
        </span>
      ),
    },
    {
      title: "Người tạo",
      dataIndex: ["createdBy", "name"],
      width: 150,
      hideInSearch: true,
      render: (_, record) =>
        record.createdBy?.name || (
          <span style={{ color: "#999", fontStyle: "italic" }}>--</span>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      sorter: true,
      hideInSearch: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      valueType: "dateTime",
      render: (_, record) =>
        record.createdAt
          ? new Date(record.createdAt).toLocaleString("vi-VN")
          : "-",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 130,
      hideInSearch: true,
      ellipsis: true,
      render: (_, record) =>
        record.note ? (
          <span style={{ fontStyle: "italic", color: "#666" }}>
            {record.note}
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
              setReceipt(entity);
            }}
          />
          <Popconfirm
            title="Hủy phiếu nhập hàng"
            description="Bạn có chắc chắn muốn hủy phiếu này không? Stock sẽ được trừ lại."
            onConfirm={() => handleCancelReceipt(entity._id)}
            okText="Hủy phiếu"
            cancelText="Không"
            okButtonProps={{ danger: true }}
          >
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer", fontSize: 15 }}
            />
          </Popconfirm>
        </Space>,
      ],
    },
  ];

  return (
    <>
      <div className="admin-page-header">
        <h2 className="admin-page-title text-2xl font-bold text-red-500 mb-2!">
          Quản lý phiếu nhập hàng
        </h2>
      </div>

      <ProTable
        scroll={{ x: 1200 }}
        actionRef={actionRef}
        columns={columns}
        rowKey="_id"
        request={async (params, sort) => {
          let sortBy:
            | "createdAt"
            | "updatedAt"
            | "totalAmount"
            | "supplier"
            | "code"
            | undefined;
          let sortOrder: "asc" | "desc" | undefined;

          if (sort.code) {
            sortBy = "code";
            sortOrder = sort.code === "ascend" ? "asc" : "desc";
          } else if (sort.createdAt) {
            sortBy = "createdAt";
            sortOrder = sort.createdAt === "ascend" ? "asc" : "desc";
          } else if (sort.totalAmount) {
            sortBy = "totalAmount";
            sortOrder = sort.totalAmount === "ascend" ? "asc" : "desc";
          }

          const res = await receiptService.getReceipts({
            current: params.current,
            pageSize: params.pageSize,
            sortBy,
            sortOrder,
            search: params.code,
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
          pageSize: 10,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} phiếu nhập hàng`,
        }}
        search={{
          labelWidth: "auto",
          filterType: "query",
        }}
        toolBarRender={() => [
          <React.Fragment key="toolbar">
            <Button
              key="create"
              onClick={() => setOpenModalCreate(true)}
              type="primary"
            >
              <PlusOutlined />
              Tạo phiếu nhập hàng
            </Button>
            ,
          </React.Fragment>,
        ]}
      />

      <DetailReceipt
        isOpen={openDrawerDetail}
        setIsOpen={setOpenDrawerDetail}
        receipt={receipt}
      />
      <CreateReceipt
        isOpen={openModalCreate}
        setIsOpen={setOpenModalCreate}
        actionRef={actionRef}
      />
    </>
  );
};

export default AdminGoodsReceipt;
