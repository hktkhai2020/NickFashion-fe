import { ActionType } from "@ant-design/pro-components";
import { DatePicker, Form, Input, message, Modal, Select, Switch } from "antd";
import userService from "@/services/userService";
import { User } from "@/types";
import { useEffect } from "react";
import dayjs from "dayjs";
type FieldType = {
  name?: string;
  gender?: string;
  dateOfBirth?: dayjs.Dayjs | null;
  address?: string;
  role?: string;
  isActive?: boolean;
  isDeleted?: boolean;
};
const UpdateUser = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  user: User | null;
}) => {
  const { isOpen, setIsOpen, actionRef, user } = props;
  const [form] = Form.useForm<FieldType>();

  const onFinish = async (values: FieldType) => {
    try {
      const response = await userService.updateUserByAdmin(user!._id, {
        name: values.name,
        gender: values.gender as "male" | "female" | "other",
        dateOfBirth: values.dateOfBirth?.toISOString(),
        address: values.address,
        role: values.role as "admin" | "user" | "moderator",
        isActive: values.isActive,
        isDeleted: values.isDeleted,
      });
      if (response.success !== false) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Cập nhật người dùng thành công");
          actionRef.current?.reload?.();
        }, 150);
      }
    } catch {
      message.error("Cập nhật người dùng thất bại");
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      form.setFieldsValue({
        name: user.name,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        address: user.address,
        role: user.role,
        isActive: user.isActive,
        isDeleted: user.isDeleted,
      });
    }
  }, [isOpen, user, form]);

  return (
    <Modal
      title="Cập nhật người dùng"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Cập nhật"
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender">
          <Select placeholder="Chọn giới tính">
            <Select.Option value="male">Nam</Select.Option>
            <Select.Option value="female">Nữ</Select.Option>
            <Select.Option value="other">Khác</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          name="dateOfBirth"
          rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
          label="Ngày sinh"
        >
          <DatePicker
            format={"YYYY/MM/DD"}
            className="w-full"
          />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address">
          <Input.TextArea rows={2} placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item label="Vai trò" name="role">
          <Select placeholder="Chọn vai trò">
            <Select.Option value="admin">Quản trị viên</Select.Option>
            <Select.Option value="moderator">Người kiểm duyệt</Select.Option>
            <Select.Option value="user">Người dùng</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Hoạt động" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          label="Đã xóa"
          name="isDeleted"
          valuePropName="checked"
          tooltip="Bật để đánh dấu người dùng đã bị xóa mềm"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUser;
