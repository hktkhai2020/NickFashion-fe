import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal } from "antd";
import categoryService from "@/services/categoryService";
const CreateCategory = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
}) => {
  const { isOpen, setIsOpen,actionRef } = props;
  const [form] = Form.useForm<any>();

  const onFinish = async (values: any) => {
    try {
      const response = await categoryService.createCategory(values);
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Tạo danh mục thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Tạo thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Create Category"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Create"
      onOk={() => {
        form.submit();
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategory;
