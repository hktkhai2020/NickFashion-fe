import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal } from "antd";
import colorService from "@/services/colorService";
import { ColorFormValues } from "@/types";

const CreateColor = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
}) => {
  const { isOpen, setIsOpen, actionRef } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: ColorFormValues) => {
    try {
      const response = await colorService.createColor(values);
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Tạo màu thành công");
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
      title="Tạo màu"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Tạo mới"
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
          rules={[
            { required: true, message: "Vui lòng nhập mã màu" },
            {
              pattern: /^#[0-9A-Fa-f]{6}$/,
              message: "Mã màu phải theo định dạng #RRGGBB",
            },
          ]}
        >
          <Input placeholder="VD: #FF0000" />
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

export default CreateColor;
