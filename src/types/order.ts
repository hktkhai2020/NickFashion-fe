// Order Types - matching backend schema

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "return_requested"
  | "returning"
  | "returned";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partial_refunded";

export type PaymentMethod =
  | "cod"
  | "bank_transfer"
  | "momo"
  | "vnpay"
  | "zalopay";

export type ShippingMethod = "standard" | "express" | "fast";

export interface OrderItem {
  productId: string;
  variantId: string | null;
  name: string;
  thumbnail: string | null;
  color: string | null;
  size: string | null;
  price: number;
  costPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface StatusHistory {
  status: OrderStatus;
  note: string | null;
  updatedAt: string;
}

export interface Order {
  _id: string;
  userId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  products: OrderItem[];
  subtotal: number;
  discountAmount: number;
  discountCode: string | null;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  shippingMethod: ShippingMethod;
  shippingCarrier: string;
  trackingNumber: string | null;
  estimatedDelivery: string | null;
  deliveredDate: string | null;
  statusHistory: StatusHistory[];
  customerNote: string | null;
  adminNote: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  totalQuantity?: number;
  totalCost?: number;
  totalProfit?: number;
}

export interface OrderResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Order[];
}

export interface GetOrdersParams {
  current?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  startDate?: string;
  endDate?: string;
  customerName?: string;
  search?: string;
}

export interface OrderFormValues {
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  adminNote?: string;
}
