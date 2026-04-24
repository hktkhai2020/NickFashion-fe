import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal, Switch } from "antd";
import colorService from "@/services/colorService";
import { Color, ColorFormValues } from "@/types";
import { useEffect } from "react";

const UpdateColor = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  color: Color;
}) => {
  const { isOpen, setIsOpen, actionRef, color } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: ColorFormValues) => {
    try {
      const response = await colorService.updateColor(color._id, values);
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Cập nhật màu thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (error) {
      message.error("Cập nhật màu thất bại");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen && color) {
      form.setFieldsValue({
        name: color.name,
        hexCode: color.hexCode,
        description: color.description,
        isActive: color.isActive,
      });
    }
  }, [isOpen, color]);

  return (
    <Modal
      title="Cập nhật màu"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Cập nhật"
      onOk={() => {
        form.submit();
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên màu"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên màu" }]}
        >
          <Input placeholder="VD: Đỏ, Xanh, Vàng" />
        </Form.Item>
        <Form.Item
          label="Mã màu (Hex)"
          name="hexCode"
          rules={[{ required: true, message: "Vui lòng nhập mã màu" }]}
        >
          <Input placeholder="VD: #FF0000" />
        </Form.Item>
        <Form.Item
          label="Hoạt động"
          name="isActive"
          valuePropName="checked"
          initialValue={color?.isActive}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea placeholder="Nhập mô tả màu" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateColor;
