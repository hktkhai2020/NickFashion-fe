import React, { useCallback, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import sizeService from "@/services/sizeService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Size } from "@/types";
import { Button, Popconfirm, message } from "antd";
import "@/styles/admin/adminPage.scss";
import CreateSize from "@/components/admin/size/create.size";
import UpdateSize from "@/components/admin/size/update.size";
import DetailSize from "@/components/admin/size/detail.size";

const AdminSize: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [openModalSizeUpdate, setOpenModalSizeUpdate] = useState(false);
  const [openModalSizeCreate, setOpenModalSizeCreate] = useState(false);
  const [openModalSizeDetail, setOpenModalSizeDetail] = useState(false);
  const [exportData, setExportData] = useState<Size[]>([]);

  const handleDeleteSize = useCallback(async (id: string) => {
    try {
      await sizeService.deleteSize(id);
      message.success("Xóa size thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa size thất bại");
    }
  }, []);

  const columns: ProColumns<Size>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Tên size",
      dataIndex: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenModalSizeDetail(true);
            setSize(record);
          }}
        >
          {record.name}
        </a>
      ),
    },
    {
      title: "Loại danh mục",
      dataIndex: ["type", "name"],
      width: 200,
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
              setOpenModalSizeUpdate(true);
              setSize(entity);
            }}
          />
          <Popconfirm
            key="delete"
            title="Xóa size"
            description="Bạn có chắc chắn muốn xóa size này không?"
            onConfirm={() => handleDeleteSize(entity._id)}
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
          Quản lý size
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

          const res = await sizeService.getSizes({
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
          pageSize: 10,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} size`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách size"
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalSizeCreate(true);
            }}
            type="primary"
          >
            Thêm size mới
          </Button>,
          <Button
            key="button"
            icon={<ExportOutlined />}
            onClick={() => {}}
            type="primary"
          >
            <CSVLink data={exportData} filename="export_sizes.csv">
              Export
            </CSVLink>
          </Button>,
        ]}
      />
      <CreateSize
        isOpen={openModalSizeCreate}
        setIsOpen={setOpenModalSizeCreate}
        actionRef={actionRef}
      />
      <UpdateSize
        isOpen={openModalSizeUpdate}
        setIsOpen={setOpenModalSizeUpdate}
        actionRef={actionRef}
        size={size as Size}
      />
      <DetailSize
        isOpen={openModalSizeDetail}
        setIsOpen={setOpenModalSizeDetail}
        size={size as Size}
      />
    </>
  );
};

export default AdminSize;
