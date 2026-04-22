import { Category } from "@/types";
import { ActionType } from "@ant-design/pro-components";
import { Form, Input, message, Modal, Switch } from "antd";
import categoryService from "@/services/categoryService";
import { useEffect } from "react";
const UpdateCategory = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  category: Category;
}) => {
  const { isOpen, setIsOpen, actionRef, category } = props;
  const [form] = Form.useForm<any>();
  const onFinish = async (values: any) => {
    values.isActive = values.isActive ? true : false;
    values.isFeatured = values.isFeatured ? true : false;
    values.isShowOnHome = values.isShowOnHome ? true : false;
    try {
      const response = await categoryService.updateCategory(
        category._id,
        values,
      );
      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setTimeout(() => {
          message.success("Cập nhật danh mục thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (error) {
      message.error("Cập nhật danh mục thất bại");
      console.error(error);
    }
  };
  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        name: category.name,
        isActive: category.isActive,
        isFeatured: category.isFeatured,
        isShowOnHome: category.isShowOnHome,
      });
    }
  }, [isOpen, category]);
  return (
    <Modal
      title="Update Category"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Update"
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onChange={() => {
          console.log(form.getFieldsValue());
        }}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Featured" name="isFeatured" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          label="Show on Home"
          name="isShowOnHome"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategory;
