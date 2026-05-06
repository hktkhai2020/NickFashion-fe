import { Product, Variant } from "./product";

// Cart Types
export interface CartItem {
  variantId: Variant;
  productId: Product;
  quantity: number;
  price: number;
  selected: boolean;
  addedAt: string;
}

export interface Cart {
  selectedItemCount: number;
  appliedCoupon: {
    code: string;
    discountValue: number;
    discountType: "percentage" | "fixed";
  };
  _id: string;
  userId: string;
  __v: number;
  items: CartItem[];
  subtotal: number;
  total: number;
  totalSelectedItems: number;
  updatedAt: string;
  version: number;
  isEmpty: boolean;
  totalItems: number;
  itemCount: number;
  selectedItemsCount: number;
  unselectedItemsCount: number;
}

export interface CartResponse {
  success: boolean;
  data: Cart;
}
