import React, { useState } from 'react';
import {
  Table,
  Card,
  Input,
  Select,
  DatePicker,
  Button,
  Tag,
  Space,
  Typography,
  Row,
  Col,
} from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  items: number;
  date: string;
}

const AdminOrderList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [paymentFilter, setPaymentFilter] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customer: { name: 'John Doe', email: 'john@example.com' },
      total: 299.99,
      status: 'delivered',
      paymentStatus: 'paid',
      items: 3,
      date: '2024-01-15',
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customer: { name: 'Jane Smith', email: 'jane@example.com' },
      total: 149.50,
      status: 'processing',
      paymentStatus: 'paid',
      items: 2,
      date: '2024-01-15',
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      customer: { name: 'Bob Johnson', email: 'bob@example.com' },
      total: 89.99,
      status: 'pending',
      paymentStatus: 'pending',
      items: 1,
      date: '2024-01-14',
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      customer: { name: 'Alice Brown', email: 'alice@example.com' },
      total: 459.00,
      status: 'shipped',
      paymentStatus: 'paid',
      items: 5,
      date: '2024-01-13',
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      customer: { name: 'Charlie Wilson', email: 'charlie@example.com' },
      total: 199.99,
      status: 'cancelled',
      paymentStatus: 'refunded',
      items: 2,
      date: '2024-01-12',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'processing':
        return 'processing';
      case 'shipped':
        return 'cyan';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'paid':
        return 'success';
      case 'refunded':
        return 'purple';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (orderNumber: string) => (
        <Link to={`/admin/orders/${orderNumber}`}>
          <Text code>{orderNumber}</Text>
        </Link>
      ),
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_: unknown, record: Order) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.customer.name}</Text>
          <Text type="secondary" className="text-xs">{record.customer.email}</Text>
        </Space>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => <Text strong>${total.toFixed(2)}</Text>,
      sorter: (a, b) => a.total - b.total,
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
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: string) => (
        <Tag color={getPaymentColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items: number) => `${items} item${items > 1 ? 's' : ''}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_: unknown, record: Order) => (
        <Link to={`/admin/orders/${record.id}`}>
          <Button type="text" icon={<EyeOutlined />} size="small">
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title level={2}>Orders</Title>
        <Text type="secondary">Manage and track customer orders</Text>
      </div>

      <Card className="shadow-sm">
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search by order number or customer..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Order Status"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="shipped">Shipped</Option>
              <Option value="delivered">Delivered</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Payment Status"
              value={paymentFilter}
              onChange={setPaymentFilter}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="pending">Pending</Option>
              <Option value="paid">Paid</Option>
              <Option value="refunded">Refunded</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              style={{ width: '100%' }}
              value={dateRange}
              onChange={(dates) => setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null] | null)}
              placeholder={['Start Date', 'End Date']}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} orders`,
          }}
        />
      </Card>
    </div>
  );
};

export default AdminOrderList;
