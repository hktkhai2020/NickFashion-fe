import React, { useCallback, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import supplierService from "@/services/supplierService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Supplier } from "@/types";
import { Button, Popconfirm, message } from "antd";
import "@/styles/admin/adminPage.scss";
import CreateSupplier from "@/components/admin/supplier/create.supplier";
import UpdateSupplier from "@/components/admin/supplier/update.supplier";
import DetailSupplier from "@/components/admin/supplier/detail.supplier";

const AdminSupplier: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [openModalSupplierUpdate, setOpenModalSupplierUpdate] = useState(false);
  const [openModalSupplierCreate, setOpenModalSupplierCreate] = useState(false);
  const [openModalSupplierDetail, setOpenModalSupplierDetail] = useState(false);
  const [exportData, setExportData] = useState<Supplier[]>([]);

  const handleDeleteSupplier = useCallback(async (id: string) => {
    try {
      await supplierService.deleteSupplier(id);
      message.success("Xóa nhà cung cấp thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa nhà cung cấp thất bại");
    }
  }, []);

  const columns: ProColumns<Supplier>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Mã NCC",
      dataIndex: "code",
      copyable: true,
      width: 100,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: "auto",
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenModalSupplierDetail(true);
            setSupplier(record);
          }}
        >
          {record.name}
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 130,
      hideInSearch: true,
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
              setOpenModalSupplierUpdate(true);
              setSupplier(entity);
            }}
          />
          <Popconfirm
            key="delete"
            title="Xóa nhà cung cấp"
            description="Bạn có chắc chắn muốn xóa nhà cung cấp này không?"
            onConfirm={() => handleDeleteSupplier(entity._id)}
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
          Quản lý nhà cung cấp
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

          const res = await supplierService.getSuppliers({
            current: params.current,
            pageSize: params.pageSize,
            search: params.name,
            sortBy: sortBy as
              | "sortOrder"
              | "name"
              | "email"
              | "phone"
              | "address"
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
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} nhà cung cấp`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách nhà cung cấp"
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalSupplierCreate(true);
            }}
            type="primary"
          >
            Thêm nhà cung cấp mới
          </Button>,
          <Button
            key="button"
            icon={<ExportOutlined />}
            onClick={() => {}}
            type="primary"
          >
            <CSVLink data={exportData} filename="export_suppliers.csv">
              Export
            </CSVLink>
          </Button>,
        ]}
      />
      <CreateSupplier
        isOpen={openModalSupplierCreate}
        setIsOpen={setOpenModalSupplierCreate}
        actionRef={actionRef}
      />
      <UpdateSupplier
        isOpen={openModalSupplierUpdate}
        setIsOpen={setOpenModalSupplierUpdate}
        actionRef={actionRef}
        supplier={supplier as Supplier}
      />
      <DetailSupplier
        isOpen={openModalSupplierDetail}
        setIsOpen={setOpenModalSupplierDetail}
        supplier={supplier as Supplier}
      />
    </>
  );
};

export default AdminSupplier;
