import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal, Switch } from "antd";
import brandService from "@/services/brandService";
import { Brand, BrandFormValues } from "@/types";
import { useEffect } from "react";

const UpdateBrand = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  brand: Brand;
}) => {
  const { isOpen, setIsOpen, actionRef, brand } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: BrandFormValues) => {
    try {
      const response = await brandService.updateBrand(brand._id, values);
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Cập nhật thương hiệu thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (error) {
      message.error("Cập nhật thương hiệu thất bại");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen && brand) {
      form.setFieldsValue({
        name: brand.name,
        description: brand.description,
        contactEmail: brand.contactEmail,
        isActive: brand.isActive,
        isFeatured: brand.isFeatured,
      });
    }
  }, [isOpen, brand]);

  return (
    <Modal
      title="Cập nhật thương hiệu"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Cập nhật"
      onOk={() => {
        form.submit();
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên thương hiệu" }]}
        >
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea placeholder="Nhập mô tả thương hiệu" rows={3} />
        </Form.Item>
        <Form.Item
          label="Email liên hệ"
          name="contactEmail"
          rules={[
            { required: true, message: "Vui lòng nhập email liên hệ" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập email liên hệ" />
        </Form.Item>
        <Form.Item
          label="Hiển thị trang chủ"
          name="isFeatured"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Hoạt động"
          name="isActive"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBrand;
