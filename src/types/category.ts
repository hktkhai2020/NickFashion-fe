// Category Types
export interface Category {
  _id: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  isShowOnHome: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  id: string;
}

export interface CategoryResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Category[];
}
