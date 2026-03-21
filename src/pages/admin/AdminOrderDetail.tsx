import React from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Table,
  Tag,
  Button,
  Steps,
  Select,
  Descriptions,
  Image,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TruckOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

interface OrderItem {
  id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

const AdminOrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const order = {
    id: id || '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
    },
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    total: 299.99,
    subtotal: 269.99,
    shipping: 15.00,
    tax: 15.00,
    status: 'processing' as const,
    paymentStatus: 'paid' as const,
    paymentMethod: 'Credit Card',
    date: '2024-01-15',
  };

  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Classic T-Shirt',
      image: 'https://via.placeholder.com/80',
      size: 'M',
      color: 'Black',
      price: 29.99,
      quantity: 2,
    },
    {
      id: '2',
      name: 'Denim Jacket',
      image: 'https://via.placeholder.com/80',
      size: 'L',
      color: 'Blue',
      price: 89.99,
      quantity: 1,
    },
    {
      id: '3',
      name: 'Slim Fit Jeans',
      image: 'https://via.placeholder.com/80',
      size: '32',
      color: 'Navy',
      price: 59.99,
      quantity: 1,
    },
  ];

  const itemColumns: ColumnsType<OrderItem> = [
    {
      title: 'Product',
      key: 'product',
      render: (_: unknown, record: OrderItem) => (
        <Space>
          <Image src={record.image} width={60} height={60} fallback="https://via.placeholder.com/60" />
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" className="text-xs">
              Size: {record.size} | Color: {record.color}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      key: 'total',
      render: (_: unknown, record: OrderItem) => (
        <Text strong>${(record.price * record.quantity).toFixed(2)}</Text>
      ),
    },
  ];

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  const handleUpdateStatus = (status: string) => {
    message.success(`Order status updated to: ${status}`);
  };

  const handlePrintInvoice = () => {
    message.info('Printing invoice...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/admin/orders')}
          >
            Back
          </Button>
          <div>
            <Title level={2} className="m-0">Order Details</Title>
            <Text type="secondary">Order {order.orderNumber}</Text>
          </div>
        </Space>
        <Space>
          <Button icon={<PrinterOutlined />} onClick={handlePrintInvoice}>
            Print Invoice
          </Button>
          <Select
            value={order.status}
            onChange={handleUpdateStatus}
            style={{ width: 150 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="processing">Processing</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="Order Items" className="shadow-sm">
            <Table
              columns={itemColumns}
              dataSource={orderItems}
              rowKey="id"
              pagination={false}
              summary={() => (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text>Subtotal</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text>${order.subtotal.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text>Shipping</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text>${order.shipping.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text>Tax</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text>${order.tax.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text strong>Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text strong>${order.total.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )}
            />
          </Card>

          <Card title="Order Timeline" className="shadow-sm mt-6">
            <Steps
              current={getStatusStep(order.status)}
              items={[
                {
                  title: 'Order Placed',
                  description: '2024-01-15 10:30 AM',
                  icon: <ClockCircleOutlined />,
                },
                {
                  title: 'Processing',
                  description: '2024-01-15 02:00 PM',
                  icon: <CheckCircleOutlined />,
                },
                {
                  title: 'Shipped',
                  description: 'Pending',
                  icon: <TruckOutlined />,
                },
                {
                  title: 'Delivered',
                  description: 'Pending',
                  icon: <InboxOutlined />,
                },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Order Information" className="shadow-sm">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Order Number">
                <Text code>{order.orderNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {order.date}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color="processing">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Status">
                <Tag color="success">
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {order.paymentMethod}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Customer Information" className="shadow-sm mt-6">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Name">
                {order.customer.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {order.customer.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {order.customer.phone}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Shipping Address" className="shadow-sm mt-6">
            <div>
              <Text strong>{order.shippingAddress.fullName}</Text>
              <br />
              <Text>{order.shippingAddress.address}</Text>
              <br />
              <Text>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </Text>
              <br />
              <Text>{order.shippingAddress.country}</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminOrderDetail;
