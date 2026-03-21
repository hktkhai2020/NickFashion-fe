import React, { useState } from 'react';
import {
  Table,
  Card,
  Input,
  Select,
  Button,
  Avatar,
  Tag,
  Space,
  Typography,
  Row,
  Col,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'blocked';
  lastOrderDate: string;
}

const AdminCustomerList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      totalOrders: 15,
      totalSpent: 2450.00,
      joinDate: '2023-06-15',
      status: 'active',
      lastOrderDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      totalOrders: 8,
      totalSpent: 1250.50,
      joinDate: '2023-08-20',
      status: 'active',
      lastOrderDate: '2024-01-10',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1 234 567 8902',
      avatar: '',
      totalOrders: 3,
      totalSpent: 350.00,
      joinDate: '2023-11-05',
      status: 'active',
      lastOrderDate: '2024-01-14',
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      phone: '+1 234 567 8903',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      totalOrders: 22,
      totalSpent: 4500.75,
      joinDate: '2023-03-10',
      status: 'inactive',
      lastOrderDate: '2023-12-20',
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      email: 'charlie.wilson@example.com',
      phone: '+1 234 567 8904',
      avatar: '',
      totalOrders: 1,
      totalSpent: 89.99,
      joinDate: '2024-01-12',
      status: 'blocked',
      lastOrderDate: '2024-01-12',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'orange';
      case 'blocked':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<Customer> = [
    {
      title: 'Customer',
      key: 'customer',
      render: (_: unknown, record: Customer) => (
        <Space>
          <Avatar
            src={record.avatar}
            icon={<UserOutlined />}
            size={40}
          />
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" className="text-xs">{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Orders',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      sorter: (a, b) => a.totalOrders - b.totalOrders,
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (spent: number) => (
        <Text strong>${spent.toFixed(2)}</Text>
      ),
      sorter: (a, b) => a.totalSpent - b.totalSpent,
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: 'Last Order',
      dataIndex: 'lastOrderDate',
      key: 'lastOrderDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: () => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title level={2}>Customers</Title>
        <Text type="secondary">Manage your customer accounts</Text>
      </div>

      <Card className="shadow-sm">
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search by name or email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="blocked">Blocked</Option>
            </Select>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={customers}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} customers`,
          }}
        />
      </Card>
    </div>
  );
};

export default AdminCustomerList;
