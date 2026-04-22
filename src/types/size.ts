// Size Types

export interface Size {
  _id: string;
  name: string;
  type: {
    _id: string;
    name: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SizeResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Size[];
}

export interface GetSizesParams {
  current?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "sortOrder" | "name" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface SizeFormValues {
  name: string;
  type: string;
}
