import React from 'react';
import {
  Form,
  Input,
  Select,
  Switch,
  Upload,
  Button,
  Card,
  Typography,
  Space,
  message,
} from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { UploadProps } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface CategoryFormValues {
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  isActive: boolean;
}

const AdminCategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<CategoryFormValues>();

  const isEditMode = Boolean(id);

  const parentCategories = [
    { id: '1', name: 'Clothing' },
    { id: '2', name: 'Dresses' },
    { id: '3', name: 'Accessories' },
    { id: '4', name: 'Shoes' },
  ];

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    maxCount: 1,
    beforeUpload: () => false,
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    form.setFieldsValue({ slug });
  };

  const onFinish = (values: CategoryFormValues) => {
    console.log('Form values:', values);
    message.success(isEditMode ? 'Category updated successfully!' : 'Category created successfully!');
    navigate('/admin/categories');
  };

  const onFinishFailed = () => {
    message.error('Please fill in all required fields correctly.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/admin/categories')}
          >
            Back
          </Button>
          <div>
            <Title level={2} className="m-0">
              {isEditMode ? 'Edit Category' : 'Add New Category'}
            </Title>
            <Text type="secondary">
              {isEditMode ? 'Update category information' : 'Fill in the category details'}
            </Text>
          </div>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          isActive: true,
          parentId: null,
        }}
      >
        <div className="max-w-2xl">
          <Card title="Category Information" className="shadow-sm">
            <Form.Item
              label="Category Name"
              name="name"
              rules={[{ required: true, message: 'Please enter category name' }]}
            >
              <Input
                placeholder="Enter category name"
                size="large"
                onChange={handleNameChange}
              />
            </Form.Item>

            <Form.Item
              label="Slug"
              name="slug"
              rules={[{ required: true, message: 'Please enter slug' }]}
              tooltip="URL-friendly version of the name"
            >
              <Input placeholder="category-slug" size="large" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <TextArea
                rows={4}
                placeholder="Enter category description (optional)"
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              label="Parent Category"
              name="parentId"
              tooltip="Leave empty to create a root category"
            >
              <Select
                placeholder="Select parent category (optional)"
                allowClear
                size="large"
              >
                {parentCategories.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Category Image"
              tooltip="Upload a representative image for this category"
            >
              <Upload {...uploadProps}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Active"
              name="isActive"
              valuePropName="checked"
              tooltip="Inactive categories will not be shown in the store"
            >
              <Switch />
            </Form.Item>
          </Card>

          <Card className="shadow-sm mt-6">
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                {isEditMode ? 'Update Category' : 'Create Category'}
              </Button>
              <Button size="large" onClick={() => navigate('/admin/categories')}>
                Cancel
              </Button>
            </Space>
          </Card>
        </div>
      </Form>
    </div>
  );
};

export default AdminCategoryForm;
