// Product Types

export interface ProductFlags {
  active: boolean;
  featured: boolean;
  new: boolean;
  bestSeller: boolean;
  topRated: boolean;
  discounted: boolean;
}

export interface ProductSale {
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate?: string;
  endDate?: string;
}

export interface ProductMeta {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface ProductStats {
  sold: number;
  views: number;
  rating: number;
  reviews: number;
}

export interface Variant {
  _id: string;
  productId: string | { _id: string; name: string };
  color: { _id: string; name: string; hexCode?: string };
  size: { _id: string; name: string };
  stock: number;
  soldCount: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  category: Array<{ _id: string; name: string }>;
  brand: { _id: string; name: string };
  supplier: { _id: string; name: string };
  priceSell: number;
  costPrice: number;
  finalPrice: number;
  material: string | null;
  weight: number;
  thumbnail: string;
  slides: string[];
  video: string | null;
  is: ProductFlags;
  sale: ProductSale;
  stats: ProductStats;
  meta: ProductMeta;
  tags: string[];
  gender: string[];
  variants?: Variant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Product[];
}

export interface GetProductsParams {
  current?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "sortOrder" | "name" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  gender?: "all" | "female" | "man" | "girl" | "boy" | "unisex";
  discounted?: boolean;
}

export interface ProductFormValues {
  name?: string;
  slug?: string;
  sku?: string;
  description?: string;
  category?: string[];
  brand?: string;
  supplier?: string;
  priceSell?: number;
  costPrice?: number;
  material?: string;
  weight?: number;
  thumbnail?: string;
  slides?: string[];
  video?: string;
  is?: ProductFlags;
  sale?: ProductSale;
  meta?: ProductMeta;
  tags?: string[];
  gender?: string[];
}
