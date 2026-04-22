// src/types/supplier.ts

export interface Supplier {
  _id: string;
  name: string;
  code?: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  information: string | null;
  debt: number;
  isActive: boolean;
  sortOrder: number;
  productCount?: number;
  totalDebt?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Supplier[];
}

export interface GetSuppliersParams {
  current?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "sortOrder" | "name" | "email" | "phone" | "address" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface SupplierFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  information: string;
}
