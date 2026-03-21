// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  note?: string;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded';

export type PaymentMethod = 
  | 'cod' 
  | 'credit_card' 
  | 'bank_transfer' 
  | 'e_wallet';

export interface CreateOrderPayload {
  items: {
    productId: string;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  }[];
  shippingAddressId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  note?: string;
}
