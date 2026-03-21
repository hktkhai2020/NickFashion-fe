// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    images: string[];
    price: number;
    originalPrice?: number;
  };
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  price: number;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
