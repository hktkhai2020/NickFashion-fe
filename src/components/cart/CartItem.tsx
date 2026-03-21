import React from 'react';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import { Image } from '@/components/common';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = item.price * item.quantity;

  const handleQuantityChange = (value: number | null) => {
    if (value && value > 0) {
      onUpdateQuantity?.(item.id, value);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="w-24 h-24 flex-shrink-0">
        <Image
          src={item.image || '/placeholder.png'}
          alt={item.name}
          className="w-full h-full rounded"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
            {item.name}
          </h3>
          {item.size && (
            <p className="text-sm text-gray-500">Size: {item.size}</p>
          )}
          {item.color && (
            <p className="text-sm text-gray-500">Color: {item.color}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-blue-600">
            {formatPrice(item.price)}
          </span>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="px-2 py-1 hover:bg-gray-100"
                disabled={item.quantity <= 1}
              >
                <MinusOutlined />
              </button>
              <span className="px-3 py-1 min-w-[40px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="px-2 py-1 hover:bg-gray-100"
              >
                <PlusOutlined />
              </button>
            </div>

            <button
              onClick={() => onRemove?.(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <DeleteOutlined style={{ fontSize: '18px' }} />
            </button>
          </div>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-gray-900">
          {formatPrice(subtotal)}
        </p>
        {item.quantity > 1 && (
          <p className="text-sm text-gray-500 mt-1">
            {formatPrice(item.price)} x {item.quantity}
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
