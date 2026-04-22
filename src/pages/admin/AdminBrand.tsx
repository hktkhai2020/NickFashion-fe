import React, { useCallback, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import brandService from "@/services/brandService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Brand } from "@/types";
import { Button, Popconfirm, message } from "antd";
import "@/styles/admin/adminPage.scss";
import CreateBrand from "@/components/admin/brand/brand.create";
import UpdateBrand from "@/components/admin/brand/brand.update";
import DetailBrand from "@/components/admin/brand/brand.detail";

const AdminBrand: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [openModalBrandUpdate, setOpenModalBrandUpdate] = useState(false);
  const [openModalBrandCreate, setOpenModalBrandCreate] = useState(false);
  const [openModalBrandDetail, setOpenModalBrandDetail] = useState(false);
  const [exportData, setExportData] = useState<Brand[]>([]);

  const handleDeleteBrand = useCallback(async (id: string) => {
    try {
      await brandService.deleteBrand(id);
      message.success("Xóa thương hiệu thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa thương hiệu thất bại");
    }
  }, []);

  const columns: ProColumns<Brand>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: "auto",
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenModalBrandDetail(true);
            setBrand(record);
          }}
        >
          {record.name}
        </a>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      copyable: true,
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Email liên hệ",
      dataIndex: "contactEmail",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Hiển thị trang chủ",
      dataIndex: "isFeatured",
      valueType: "switch",
      width: 150,
      hideInSearch: true,
      align: "center",
      render: (_, record) => (
        <span
          style={{
            color: record.isFeatured ? "#52c41a" : "#8c8c8c",
            fontWeight: 600,
          }}
        >
          {record.isFeatured ? "Nổi bật" : "Bình thường"}
        </span>
      ),
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
              setOpenModalBrandUpdate(true);
              setBrand(entity);
            }}
          />
          <Popconfirm
            key="delete"
            title="Xóa thương hiệu"
            description="Bạn có chắc chắn muốn xóa thương hiệu này không?"
            onConfirm={() => handleDeleteBrand(entity._id)}
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
          Quản lý thương hiệu
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

          const res = await brandService.getBrands({
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
            `${range[0]}-${range[1]} trên ${total} thương hiệu`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách thương hiệu"
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalBrandCreate(true);
            }}
            type="primary"
          >
            Thêm thương hiệu mới
          </Button>,
          <Button
            key="button"
            icon={<ExportOutlined />}
            onClick={() => {}}
            type="primary"
          >
            <CSVLink data={exportData} filename="export_brands.csv">
              Export
            </CSVLink>
          </Button>,
        ]}
      />
      <CreateBrand
        isOpen={openModalBrandCreate}
        setIsOpen={setOpenModalBrandCreate}
        actionRef={actionRef}
      />
      <UpdateBrand
        isOpen={openModalBrandUpdate}
        setIsOpen={setOpenModalBrandUpdate}
        actionRef={actionRef}
        brand={brand as Brand}
      />
      <DetailBrand
        isOpen={openModalBrandDetail}
        setIsOpen={setOpenModalBrandDetail}
        brand={brand as Brand}
      />
    </>
  );
};

export default AdminBrand;
