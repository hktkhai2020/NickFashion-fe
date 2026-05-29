import { Product } from "./product";

export interface Wishlist {
  _id: string;
  userId: string;
  items: Product[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface WishlistGetResponse {
  success: boolean;
  message: string;
  data: {
    productId: Product;
    _id: string;
    addedAt: Date;
  }[];
}
