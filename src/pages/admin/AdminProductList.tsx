import React, { useState } from 'react';
import {
  Table,
  Card,
  Input,
  Select,
  Button,
  Image,
  Space,
  Tag,
  Typography,
  Row,
  Col,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  originalPrice: number;
  stock: number;
  status: 'active' | 'draft' | 'out_of_stock';
  isFeatured: boolean;
}

const AdminProductList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const products: Product[] = [
    {
      id: '1',
      name: 'Classic T-Shirt',
      image: 'https://via.placeholder.com/80',
      category: 'T-Shirts',
      price: 29.99,
      originalPrice: 39.99,
      stock: 150,
      status: 'active',
      isFeatured: true,
    },
    {
      id: '2',
      name: 'Denim Jacket',
      image: 'https://via.placeholder.com/80',
      category: 'Jackets',
      price: 89.99,
      originalPrice: 119.99,
      stock: 45,
      status: 'active',
      isFeatured: false,
    },
    {
      id: '3',
      name: 'Slim Fit Jeans',
      image: 'https://via.placeholder.com/80',
      category: 'Pants',
      price: 59.99,
      originalPrice: 79.99,
      stock: 0,
      status: 'out_of_stock',
      isFeatured: true,
    },
    {
      id: '4',
      name: 'Summer Dress',
      image: 'https://via.placeholder.com/80',
      category: 'Dresses',
      price: 49.99,
      originalPrice: 69.99,
      stock: 80,
      status: 'active',
      isFeatured: false,
    },
  ];

  const categories = ['All Categories', 'T-Shirts', 'Jackets', 'Pants', 'Dresses', 'Accessories'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'draft':
        return 'default';
      case 'out_of_stock':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string) => (
        <Image src={image} alt="product" width={60} height={60} fallback="https://via.placeholder.com/60" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Product) => (
        <Space direction="vertical" size={0}>
          <Text strong>{name}</Text>
          {record.isFeatured && <Tag color="gold">Featured</Tag>}
        </Space>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number, record: Product) => (
        <Space direction="vertical" size={0}>
          <Text type="secondary" delete>${record.originalPrice.toFixed(2)}</Text>
          <Text strong>${price.toFixed(2)}</Text>
        </Space>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Text type={stock === 0 ? 'danger' : stock < 20 ? 'warning' : 'secondary'}>
          {stock} units
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: Product) => (
        <Space size="small">
          <Link to={`/admin/products/${record.id}/edit`}>
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Link>
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2}>Products</Title>
          <Text type="secondary">Manage your product inventory</Text>
        </div>
        <Link to="/admin/products/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <Row gutter={16} className="mb-4">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              allowClear
              style={{ width: '100%' }}
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat === 'All Categories' ? undefined : cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="active">Active</Option>
              <Option value="draft">Draft</Option>
              <Option value="out_of_stock">Out of Stock</Option>
            </Select>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} products`,
          }}
        />
      </Card>
    </div>
  );
};

export default AdminProductList;
