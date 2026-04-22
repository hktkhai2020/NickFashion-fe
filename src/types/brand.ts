// Brand Types

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description: string | null;
  contactEmail: string | null;
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BrandResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Brand[];
}

export interface GetBrandsParams {
  current?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "sortOrder" | "name" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface BrandFormValues {
  name: string;
  description: string;
  contactEmail: string;
  isActive: boolean;
  isFeatured: boolean;
}
