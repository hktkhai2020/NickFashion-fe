import React from 'react';
import { Drawer } from 'antd';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { Button } from '@/components/common';
import { useCart } from '@/hooks';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
}) => {
  const { cartItems, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCartOutlined />
            <span>Shopping Cart</span>
            <span className="text-sm text-gray-500 font-normal">
              ({itemCount} items)
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseOutlined />
          </button>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={420}
      className="cart-drawer"
    >
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <ShoppingCartOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />
          <p className="text-gray-500 mt-4 mb-6">Your cart is empty</p>
          <Button variant="primary" onClick={onClose}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(id, quantity) => updateQuantity(id, quantity)}
                onRemove={(id) => removeItem(id)}
              />
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Subtotal</span>
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="space-y-3">
              <Link to="/checkout" onClick={onClose}>
                <Button variant="primary" size="large" className="w-full">
                  Checkout
                </Button>
              </Link>
              <Link to="/cart" onClick={onClose}>
                <Button variant="outline" size="large" className="w-full">
                  View Cart
                </Button>
              </Link>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
