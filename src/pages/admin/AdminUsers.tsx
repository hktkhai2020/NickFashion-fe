import React, { useRef, useState } from "react";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import userService, { GetUsersParams } from "@/services/userService";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User } from "@/types";
import "@/styles/admin/adminPage.scss";
import DetailUser from "@/components/admin/user/detail.user";
import UpdateUser from "@/components/admin/user/update.user";

const AdminUsers: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const getGenderLabel = (gender?: string) => {
    switch (gender) {
      case "male":
        return "Nam";
      case "female":
        return "Nữ";
      case "other":
        return "Khác";
      default:
        return "-";
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case "admin":
        return { text: "Quản trị viên", color: "#1677ff" };
      case "moderator":
        return { text: "Người kiểm duyệt", color: "#fa8c16" };
      case "user":
        return { text: "Người dùng", color: "#52c41a" };
      default:
        return { text: "-", color: "#999" };
    }
  };

  const columns: ProColumns<User>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Người dùng",
      dataIndex: "name",
      width: 250,
      hideInSearch: true,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar size={40} src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 600 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: "#74869b" }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      hideInTable: true,
      valueType: "text",
    },
    {
      title: "Email",
      dataIndex: "email",
      hideInTable: true,
      valueType: "text",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
      hideInSearch: true,
      render: (phone) => phone || "-",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: 110,
      hideInSearch: true,
      render: (_: React.ReactNode, record) => getGenderLabel(record.gender),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: 140,
      hideInSearch: true,
      render: (_: React.ReactNode, record) => {
        const { text, color } = getRoleLabel(record.role);
        return <span style={{ color, fontWeight: 600 }}>{text}</span>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      valueType: "switch",
      width: 110,
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
      title: "Đã xóa",
      dataIndex: "isDeleted",
      valueType: "switch",
      width: 110,
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.isDeleted ? (
          <Badge status="error" text="Đã xóa" />
        ) : (
          <Badge status="success" text="Chưa xóa" />
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
      render: (_: React.ReactNode, record) =>
        record.createdAt
          ? new Date(record.createdAt).toLocaleDateString("vi-VN")
          : "-",
    },
    {
      title: "Action",
      valueType: "option",
      width: 100,
      render: (_, entity) => [
        <EyeOutlined
          key="detail"
          style={{
            color: "#1677ff",
            marginRight: "0.5rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenModalDetail(true);
            setSelectedUser(entity);
          }}
        />,
        <EditOutlined
          key="edit"
          style={{
            color: "orange",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenModalUpdate(true);
            setSelectedUser(entity);
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <div className="admin-page-header">
        <h2 className="admin-page-title text-2xl font-bold text-red-500 mb-2!">
          Quản lý người dùng
        </h2>
      </div>

      <ProTable
        scroll={{ x: "max-content" }}
        actionRef={actionRef}
        columns={columns}
        rowKey="_id"
        request={async (params, sort) => {
          let sortBy: GetUsersParams["sortBy"];
          let sortOrder: GetUsersParams["sortOrder"];

          if (sort.name) {
            sortBy = "name";
            sortOrder = sort.name === "ascend" ? "asc" : "desc";
          }
          if (sort.createdAt) {
            sortBy = "createdAt";
            sortOrder = sort.createdAt === "ascend" ? "asc" : "desc";
          }

          const res = await userService.getUsers({
            current: params.current,
            pageSize: params.pageSize,
            search: params.name || params.email,
            sortBy,
            sortOrder,
          });

          if (!res.success) {
            return { data: [], success: false, total: 0 };
          }
          return {
            data: res.users,
            success: true,
            total: res.pagination.total,
          };
        }}
        pagination={{
          pageSize: 10,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} người dùng`,
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          reload: true,
          density: true,
        }}
        headerTitle="Danh sách người dùng"
        dateFormatter="string"
      />
      <DetailUser
        isOpen={openModalDetail}
        setIsOpen={setOpenModalDetail}
        user={selectedUser}
      />
      <UpdateUser
        isOpen={openModalUpdate}
        setIsOpen={setOpenModalUpdate}
        actionRef={actionRef}
        user={selectedUser}
      />
    </>
  );
};

export default AdminUsers;
