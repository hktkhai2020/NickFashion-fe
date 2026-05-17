import React, { useCallback, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import colorService from "@/services/colorService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Color } from "@/types";
import { Button, Popconfirm, message } from "antd";
import "@/styles/admin/adminPage.scss";
import CreateColor from "@/components/admin/color/create.color";
import UpdateColor from "@/components/admin/color/update.color";
import DetailColor from "@/components/admin/color/detail.color";

const AdminColor: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [color, setColor] = useState<Color | null>(null);
  const [openModalColorUpdate, setOpenModalColorUpdate] = useState(false);
  const [openModalColorCreate, setOpenModalColorCreate] = useState(false);
  const [openModalColorDetail, setOpenModalColorDetail] = useState(false);
  const [exportData, setExportData] = useState<Color[]>([]);

  const handleDeleteColor = useCallback(async (id: string) => {
    try {
      await colorService.deleteColor(id);
      message.success("Xóa màu thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa màu thất bại");
    }
  }, []);

  const columns: ProColumns<Color>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Tên màu",
      dataIndex: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenModalColorDetail(true);
            setColor(record);
          }}
        >
          {record.name}
        </a>
      ),
    },
    {
      title: "Mã màu",
      dataIndex: "hexCode",
      width: 120,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.hexCode ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 24,
                backgroundColor: record.hexCode,
                border: "1px solid #d9d9d9",
                borderRadius: 4,
              }}
            />
            <span style={{ fontFamily: "monospace" }}>{record.hexCode}</span>
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 250,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Hoạt động",
      dataIndex: "isActive",
      valueType: "switch",
      width: 110,
      hideInSearch: true,
      align: "center",
      render: (_, record) => (
        <span
          style={{
            color: record.isActive ? "#52c41a" : "#ff4d4f",
            fontWeight: 600,
          }}
        >
          {record.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      valueType: "date",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      hideInSearch: true,
      width: 130,
    },
    {
      title: "Action",
      valueType: "option",
      width: 80,
      render: (_, entity) => [
        <>
          <EditOutlined
            style={{
              color: "orange",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenModalColorUpdate(true);
              setColor(entity);
            }}
          />
          <Popconfirm
            key="delete"
            title="Xóa màu"
            description="Bạn có chắc chắn muốn xóa màu này không?"
            onConfirm={() => handleDeleteColor(entity._id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer", fontSize: "1rem" }}
            />
          </Popconfirm>
        </>,
      ],
    },
  ];

  return (
    <>
      <div className="admin-page-header">
        <h2 className="admin-page-title text-2xl font-bold text-red-500 mb-2!">
          Quản lý màu sắc
        </h2>
      </div>

      <ProTable
        scroll={{ x: "max-content" }}
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
          if (sort.createdAt) {
            sortBy = "createdAt";
            sortOrder = sort.createdAt === "ascend" ? "asc" : "desc";
          }

          const res = await colorService.getColors({
            current: params.current,
            pageSize: params.pageSize,
            search: params.name,
            sortBy: sortBy as "sortOrder" | "name" | "createdAt" | "updatedAt" | undefined,
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
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} màu`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách màu"
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalColorCreate(true);
            }}
            type="primary"
          >
            Thêm màu mới
          </Button>,
          <Button
            key="button"
            icon={<ExportOutlined />}
            onClick={() => {}}
            type="primary"
          >
            <CSVLink data={exportData} filename="export_colors.csv">
              Export
            </CSVLink>
          </Button>,
        ]}
      />
      <CreateColor
        isOpen={openModalColorCreate}
        setIsOpen={setOpenModalColorCreate}
        actionRef={actionRef}
      />
      <UpdateColor
        isOpen={openModalColorUpdate}
        setIsOpen={setOpenModalColorUpdate}
        actionRef={actionRef}
        color={color as Color}
      />
      <DetailColor
        isOpen={openModalColorDetail}
        setIsOpen={setOpenModalColorDetail}
        color={color as Color}
      />
    </>
  );
};

export default AdminColor;
