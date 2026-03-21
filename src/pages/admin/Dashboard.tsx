import React from 'react';
import { Row, Col, Card, Table, Typography, Space } from 'antd';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, icon, color }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <Space align="start" size="large">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <span style={{ fontSize: 24, color }}>{icon}</span>
      </div>
      <div>
        <Text type="secondary" className="text-sm">{title}</Text>
        <Title level={3} className="m-0">{value}</Title>
      </div>
    </Space>
  </Card>
);

interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const statistics = [
    {
      title: 'Total Orders',
      value: '1,234',
      icon: <ShoppingCartOutlined />,
      color: '#1890ff',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      icon: <DollarOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Customers',
      value: '3,456',
      icon: <UserOutlined />,
      color: '#722ed1',
    },
    {
      title: 'Products',
      value: '567',
      icon: <ShoppingOutlined />,
      color: '#fa8c16',
    },
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      total: 299.99,
      status: 'Completed',
      date: '2024-01-15',
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      total: 149.50,
      status: 'Processing',
      date: '2024-01-15',
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customer: 'Bob Johnson',
      total: 89.99,
      status: 'Pending',
      date: '2024-01-14',
    },
  ];

  const orderColumns: ColumnsType<RecentOrder> = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text
          type={status === 'Completed' ? 'success' : status === 'Processing' ? 'warning' : 'secondary'}
        >
          {status}
        </Text>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title level={2}>Dashboard</Title>
        <Text type="secondary">Welcome to the admin dashboard</Text>
      </div>

      <Row gutter={[16, 16]}>
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatisticCard {...stat} />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="Recent Orders"
            extra={<a href="/admin/orders">View All</a>}
            className="shadow-sm"
          >
            <Table
              columns={orderColumns}
              dataSource={recentOrders}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Sales Chart" className="shadow-sm h-full">
            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart placeholder - Add your charting library here
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Top Products" className="shadow-sm">
            <div className="h-48 flex items-center justify-center text-gray-400">
              Top products list placeholder
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Activities" className="shadow-sm">
            <div className="h-48 flex items-center justify-center text-gray-400">
              Activity feed placeholder
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
