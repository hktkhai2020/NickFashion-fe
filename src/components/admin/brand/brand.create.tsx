import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal, Switch } from "antd";
import brandService from "@/services/brandService";
import { BrandFormValues } from "@/types";

const CreateBrand = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
}) => {
  const { isOpen, setIsOpen, actionRef } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: BrandFormValues) => {
    try {
      const response = await brandService.createBrand(values);
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Tạo thương hiệu thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Tạo thất bại");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Tạo thương hiệu"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Tạo mới"
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
          initialValue={false}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Hoạt động"
          name="isActive"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBrand;
