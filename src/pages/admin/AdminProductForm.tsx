import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Switch,
  Upload,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Space,
  message,
} from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  brand: string;
  stock: number;
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  isNew: boolean;
}

const AdminProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<ProductFormValues>();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const isEditMode = Boolean(id);

  const categories = [
    'T-Shirts',
    'Jackets',
    'Pants',
    'Dresses',
    'Skirts',
    'Accessories',
    'Shoes',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const colorOptions = [
    { label: 'Black', value: 'black', color: '#000000' },
    { label: 'White', value: 'white', color: '#FFFFFF' },
    { label: 'Red', value: 'red', color: '#FF0000' },
    { label: 'Blue', value: 'blue', color: '#0000FF' },
    { label: 'Green', value: 'green', color: '#008000' },
    { label: 'Yellow', value: 'yellow', color: '#FFFF00' },
    { label: 'Gray', value: 'gray', color: '#808080' },
    { label: 'Navy', value: 'navy', color: '#000080' },
  ];

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error(`${file.name} is not an image file`);
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must smaller than 5MB!');
        return false;
      }
      return false;
    },
    onChange: (info) => {
      setFileList(info.fileList);
    },
    listType: 'picture-card',
    maxCount: 5,
  };

  const onFinish = (values: ProductFormValues) => {
    console.log('Form values:', values);
    console.log('File list:', fileList);
    message.success(isEditMode ? 'Product updated successfully!' : 'Product created successfully!');
    navigate('/admin/products');
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
            onClick={() => navigate('/admin/products')}
          >
            Back
          </Button>
          <div>
            <Title level={2} className="m-0">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </Title>
            <Text type="secondary">
              {isEditMode ? 'Update product information' : 'Fill in the product details'}
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
          isFeatured: false,
          isNew: false,
          stock: 0,
          sizes: [],
          colors: [],
        }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Basic Information" className="shadow-sm">
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: 'Please enter product name' }]}
              >
                <Input placeholder="Enter product name" size="large" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Enter product description"
                  maxLength={1000}
                  showCount
                />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please enter price' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      size="large"
                      min={0}
                      precision={2}
                      prefix="$"
                      placeholder="0.00"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Original Price"
                    name="originalPrice"
                    rules={[{ required: true, message: 'Please enter original price' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      size="large"
                      min={0}
                      precision={2}
                      prefix="$"
                      placeholder="0.00"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select category' }]}
                  >
                    <Select placeholder="Select category" size="large">
                      {categories.map((cat) => (
                        <Option key={cat} value={cat}>
                          {cat}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true, message: 'Please enter brand' }]}
                  >
                    <Input placeholder="Enter brand name" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Stock"
                name="stock"
                rules={[{ required: true, message: 'Please enter stock quantity' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  size="large"
                  min={0}
                  placeholder="0"
                />
              </Form.Item>
            </Card>

            <Card title="Variants" className="shadow-sm mt-6">
              <Form.Item label="Available Sizes" name="sizes">
                <Checkbox.Group options={sizes.map((size) => ({ label: size, value: size }))} />
              </Form.Item>

              <Form.Item label="Available Colors" name="colors" className="mt-4">
                <Checkbox.Group>
                  <Space wrap>
                    {colorOptions.map((color) => (
                      <Checkbox key={color.value} value={color.value}>
                        <Space>
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 4,
                              backgroundColor: color.color,
                              border: '1px solid #d9d9d9',
                            }}
                          />
                          {color.label}
                        </Space>
                      </Checkbox>
                    ))}
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Media" className="shadow-sm">
              <Form.Item label="Product Images">
                <Upload {...uploadProps}>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
                <Text type="secondary" className="block mt-2">
                  Upload up to 5 images. Max size 5MB each.
                </Text>
              </Form.Item>
            </Card>

            <Card title="Settings" className="shadow-sm mt-6">
              <Form.Item
                label="Featured Product"
                name="isFeatured"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="New Product"
                name="isNew"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Card>

            <Card className="shadow-sm mt-6">
              <Space direction="vertical" className="w-full">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                >
                  {isEditMode ? 'Update Product' : 'Create Product'}
                </Button>
                <Button
                  size="large"
                  block
                  onClick={() => navigate('/admin/products')}
                >
                  Cancel
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminProductForm;
