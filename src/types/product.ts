// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  category: CategoryBasic;
  brand?: string;
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductColor {
  name: string;
  code: string;
  image?: string;
}

export interface ProductSize {
  name: string;
  stock: number;
}

export interface CategoryBasic {
  id: string;
  name: string;
  slug: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  sortBy?: 'price' | 'name' | 'createdAt' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}
