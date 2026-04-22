import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal } from "antd";
import supplierService from "@/services/supplierService";
import { Supplier } from "@/types";
import { useEffect } from "react";

const UpdateSupplier = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  supplier: Supplier;
}) => {
  const { isOpen, setIsOpen, actionRef, supplier } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: { name: string; email: string; phone: string; address: string; information: string }) => {
    try {
      const response = await supplierService.updateSupplier(supplier._id, values);
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Cập nhật nhà cung cấp thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (error) {
      message.error("Cập nhật nhà cung cấp thất bại");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen && supplier) {
      form.setFieldsValue({
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        information: supplier.information,
      });
    }
  }, [isOpen, supplier]);

  return (
    <Modal
      title="Cập nhật nhà cung cấp"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Cập nhật"
      onOk={() => {
        form.submit();
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên nhà cung cấp"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input placeholder="Nhập tên nhà cung cấp" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email" }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
        <Form.Item
          label="Thông tin thêm"
          name="information"
          rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}
        >
          <Input.TextArea placeholder="Nhập thông tin thêm" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSupplier;
