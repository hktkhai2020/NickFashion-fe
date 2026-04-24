// Color Types

export interface Color {
  _id: string;
  name: string;
  hexCode: string | null;
  sortOrder: number;
  isActive: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ColorResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Color[];
}

export interface GetColorsParams {
  current?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "sortOrder" | "name" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface ColorFormValues {
  name: string;
  hexCode: string;
  description: string;
  isActive?: boolean;
}
