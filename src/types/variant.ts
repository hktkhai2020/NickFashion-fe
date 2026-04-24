// Variant Types

import { Variant } from "./product";

export interface VariantFormValues {
  productId: string;
  color: string;
  size: string;
  stock: number;
  images: string[];
  isActive?: boolean;
}

export interface VariantResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Variant[];
}
