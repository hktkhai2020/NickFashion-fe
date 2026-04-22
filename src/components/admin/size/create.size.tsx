import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal } from "antd";
import sizeService from "@/services/sizeService";
import { SizeFormValues } from "@/types";

const CreateSize = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
}) => {
  const { isOpen, setIsOpen, actionRef } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: SizeFormValues) => {
    try {
      const response = await sizeService.createSize(values);
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Tạo size thành công");
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
      title="Tạo size"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Tạo mới"
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

export default CreateSize;
