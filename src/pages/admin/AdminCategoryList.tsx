import React, { useCallback, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import categoryService from "@/services/categoryService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Category } from "@/types";
import { Button, Popconfirm, message } from "antd";
import "@/styles/admin/adminPage.scss";
import CreateCategory from "@/components/admin/category/create.category";
import UpdateCategory from "@/components/admin/category/update.category";
import DetailCategory from "@/components/admin/category/detail.category";
const AdminCategoryList: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [openModalCategoryUpdate, setOpenModalCategoryUpdate] = useState(false);
  const [openModalCategoryCreate, setOpenModalCategoryCreate] = useState(false);
  const [openModalCategoryDetail, setOpenModalCategoryDetail] = useState(false);
  const [exportBook, setExportBook] = useState<Category[]>([]);
  const handleDeleteCategory = useCallback(async (id: string) => {
    try {
      await categoryService.deleteCategory(id);
      message.success("Xóa danh mục thành công");
      actionRef.current?.reload();
    } catch {
      message.error("Xóa danh mục thất bại");
    }
  }, []);

  const columns: ProColumns<Category>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: "auto",
      render: (_, record) => (
        <a
          onClick={() => {
            setOpenModalCategoryDetail(true);
            setCategory(record);
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
      width: "auto",
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "Hiển thị trang chủ",
      dataIndex: "isShowOnHome",
      valueType: "switch",
      width: 130,
      hideInSearch: true,
      align: "center",
      render: (_, record) => (
        <span
          style={{
            color: record.isShowOnHome ? "#52c41a" : "#8c8c8c",
            fontWeight: 600,
          }}
        >
          {record.isShowOnHome ? "Có" : "Không"}
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
              setOpenModalCategoryUpdate(true);
              setCategory(entity);
            }}
          />
          <Popconfirm
            key="delete"
            title="Xóa danh mục"
            description="Bạn có chắc chắn muốn xóa danh mục này không?"
            onConfirm={() => handleDeleteCategory(entity._id)}
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
          Quản lý danh mục
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

          const res = await categoryService.getCategories({
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
          setExportBook(res.data);
          return {
            data: res.data,
            success: true,
            total: res.pagination.total,
          };
        }}
        pagination={{
          pageSize: 10,
          pageSizeOptions: [5, 10, 15, 20],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} danh mục`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách danh mục"
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalCategoryCreate(true);
            }}
            type="primary"
          >
            Thêm danh mục mới
          </Button>,
          <Button
            key="button"
            icon={<ExportOutlined />}
            onClick={() => {}}
            type="primary"
          >
            <CSVLink data={exportBook} filename="export.csv">
              Export
            </CSVLink>
          </Button>,
        ]}
      />
      <CreateCategory
        isOpen={openModalCategoryCreate}
        setIsOpen={setOpenModalCategoryCreate}
        actionRef={actionRef}
      />
      <UpdateCategory
        isOpen={openModalCategoryUpdate}
        setIsOpen={setOpenModalCategoryUpdate}
        actionRef={actionRef}
        category={category as Category}
      />
      <DetailCategory
        isOpen={openModalCategoryDetail}
        setIsOpen={setOpenModalCategoryDetail}
        category={category as Category}
      />
    </>
  );
};

export default AdminCategoryList;
