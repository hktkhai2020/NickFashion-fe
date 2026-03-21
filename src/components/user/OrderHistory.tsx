import React from 'react';
import { Link } from 'react-router-dom';
import { Empty, Tabs, Tag } from 'antd';
import { Card } from '@/components/common';
import { Pagination } from '@/components/common';
import type { Order } from '@/types/order';

interface OrderHistoryProps {
  orders: Order[];
  loading?: boolean;
  currentPage?: number;
  totalOrders?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  loading = false,
  currentPage = 1,
  totalOrders = 0,
  pageSize = 10,
  onPageChange,
}) => {
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'orange',
      processing: 'blue',
      shipped: 'cyan',
      delivered: 'green',
      cancelled: 'red',
      refunded: 'purple',
    };
    return statusColors[status.toLowerCase()] || 'default';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const tabItems = [
    {
      key: 'all',
      label: `All Orders (${totalOrders})`,
    },
    {
      key: 'pending',
      label: `Pending (${orders.filter(o => o.status === 'pending').length})`,
    },
    {
      key: 'processing',
      label: `Processing (${orders.filter(o => o.status === 'processing').length})`,
    },
    {
      key: 'delivered',
      label: `Delivered (${orders.filter(o => o.status === 'delivered').length})`,
    },
  ];

  if (orders.length === 0 && !loading) {
    return (
      <Empty
        description="No orders yet"
        className="py-12"
      >
        <Link to="/products">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Start Shopping
          </button>
        </Link>
      </Empty>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <Tabs items={tabItems} defaultActiveKey="all" />
      </Card>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} hoverable>
            <div className="space-y-4">
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold">#{order.orderNumber || order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Tag color={getStatusColor(order.status)} className="uppercase">
                    {order.status}
                  </Tag>
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex gap-4 overflow-x-auto">
                {order.items?.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100"
                  >
                    <img
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {order.items && order.items.length > 4 && (
                  <div className="w-20 h-20 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{order.items?.length || 0} item(s)</span>
                  {order.shippingAddress && (
                    <span className="hidden sm:inline">
                      Ship to: {order.shippingAddress.city || 'N/A'}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatPrice(order.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalOrders > pageSize && (
        <Pagination
          current={currentPage}
          total={totalOrders}
          pageSize={pageSize}
          onChange={onPageChange || (() => {})}
        />
      )}
    </div>
  );
};

export default OrderHistory;
