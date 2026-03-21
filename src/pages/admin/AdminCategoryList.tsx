import React, { useState } from 'react';
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Typography,
  Modal,
  Tree,
  Input,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  productCount: number;
  isActive: boolean;
  children?: Category[];
}

const AdminCategoryList: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const categories: Category[] = [
    {
      id: '1',
      name: 'Clothing',
      slug: 'clothing',
      parentId: null,
      productCount: 250,
      isActive: true,
      children: [
        {
          id: '1-1',
          name: 'T-Shirts',
          slug: 't-shirts',
          parentId: '1',
          productCount: 80,
          isActive: true,
        },
        {
          id: '1-2',
          name: 'Jackets',
          slug: 'jackets',
          parentId: '1',
          productCount: 45,
          isActive: true,
        },
        {
          id: '1-3',
          name: 'Pants',
          slug: 'pants',
          parentId: '1',
          productCount: 60,
          isActive: true,
        },
      ],
    },
    {
      id: '2',
      name: 'Dresses',
      slug: 'dresses',
      parentId: null,
      productCount: 120,
      isActive: true,
      children: [
        {
          id: '2-1',
          name: 'Casual Dresses',
          slug: 'casual-dresses',
          parentId: '2',
          productCount: 55,
          isActive: true,
        },
        {
          id: '2-2',
          name: 'Formal Dresses',
          slug: 'formal-dresses',
          parentId: '2',
          productCount: 35,
          isActive: true,
        },
      ],
    },
    {
      id: '3',
      name: 'Accessories',
      slug: 'accessories',
      parentId: null,
      productCount: 180,
      isActive: true,
    },
    {
      id: '4',
      name: 'Shoes',
      slug: 'shoes',
      parentId: null,
      productCount: 95,
      isActive: false,
    },
  ];

  const treeData = categories.map((cat) => ({
    key: cat.id,
    title: (
      <Space>
        <Text strong>{cat.name}</Text>
        <Tag color={cat.isActive ? 'green' : 'default'}>
          {cat.productCount} products
        </Tag>
      </Space>
    ),
    children: cat.children?.map((child) => ({
      key: child.id,
      title: (
        <Space>
          <Text>{child.name}</Text>
          <Tag color={child.isActive ? 'green' : 'default'}>
            {child.productCount} products
          </Tag>
        </Space>
      ),
    })),
  }));

  const columns: ColumnsType<Category> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string) => <Text code>{slug}</Text>,
    },
    {
      title: 'Parent',
      dataIndex: 'parentId',
      key: 'parentId',
      render: (parentId: string | null) =>
        parentId ? (
          categories.find((c) => c.id === parentId)?.name || '-'
        ) : (
          <Text type="secondary">Root Category</Text>
        ),
    },
    {
      title: 'Products',
      dataIndex: 'productCount',
      key: 'productCount',
      render: (count: number) => <Tag>{count}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'default'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: Category) => (
        <Space size="small">
          <Link to={`/admin/categories/${record.id}/edit`}>
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Link>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => showDeleteConfirm(record.id)}
          />
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (_id: string) => {
    confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone. All products in this category will be uncategorized.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        message.success('Category deleted successfully');
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2}>Categories</Title>
          <Text type="secondary">Manage your product categories</Text>
        </div>
        <Space>
          <Input
            placeholder="Search categories..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: 250 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Add Category
          </Button>
        </Space>
      </div>

      <Card title="Category Tree" className="shadow-sm">
        <Tree
          showLine
          defaultExpandAll
          treeData={treeData}
          titleRender={(nodeData) => nodeData.title}
        />
      </Card>

      <Card title="All Categories" className="shadow-sm">
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} categories`,
          }}
        />
      </Card>
    </div>
  );
};

export default AdminCategoryList;
