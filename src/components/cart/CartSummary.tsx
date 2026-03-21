import React from 'react';
import { Button } from '@/components/common';
import { Card } from '@/components/common';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartSummaryProps {
  items: CartItemType[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  onCheckout?: () => void;
  onApplyCoupon?: (couponCode: string) => void;
  loading?: boolean;
  showCoupon?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  onCheckout,
  loading = false,
  showCoupon = true,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const total = subtotal + shipping + tax - discount;
  const freeShippingThreshold = 500000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <Card className="sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      {remainingForFreeShipping > 0 && shipping === 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Add {formatPrice(remainingForFreeShipping)} more for free shipping!
          </p>
        </div>
      )}

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span className="text-blue-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {showCoupon && (
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <Button variant="outline" size="small">
              Apply
            </Button>
          </div>
        </div>
      )}

      <Button
        variant="primary"
        size="large"
        onClick={onCheckout}
        loading={loading}
        className="w-full"
      >
        Proceed to Checkout
      </Button>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Secure checkout</span>
      </div>
    </Card>
  );
};

export default CartSummary;
