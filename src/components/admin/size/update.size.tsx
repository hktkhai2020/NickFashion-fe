import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal } from "antd";
import sizeService from "@/services/sizeService";
import { Size, SizeFormValues } from "@/types";
import { useEffect } from "react";

const UpdateSize = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  size: Size;
}) => {
  const { isOpen, setIsOpen, actionRef, size } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: SizeFormValues) => {
    try {
      const response = await sizeService.updateSize(size._id, values);
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Cập nhật size thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (error) {
      message.error("Cập nhật size thất bại");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen && size) {
      form.setFieldsValue({
        name: size.name,
        type: size.type?._id,
      });
    }
  }, [isOpen, size]);

  return (
    <Modal
      title="Cập nhật size"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Cập nhật"
      onOk={() => {
        form.submit();
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên size"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên size" }]}
        >
          <Input placeholder="VD: S, M, L, XL" />
        </Form.Item>
        <Form.Item
          label="Loại danh mục (Category ID)"
          name="type"
          rules={[{ required: true, message: "Vui lòng nhập ID danh mục" }]}
        >
          <Input placeholder="Nhập ID danh mục" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSize;
