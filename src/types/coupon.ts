// Coupon Types - matching backend schema

export interface Coupon {
  _id: string;
  code: string;
  name: string;
  description: string | null;
  type: "percentage" | "fixed";
  value: number;
  maxDiscount: number | null;
  minOrderAmount: number;
  usageLimit: number | null;
  usedCount: number;
  usageLimitPerUser: number;
  applicableUsers: Array<{ _id: string; name: string; email: string }>;
  applicableCategories: Array<{ _id: string; name: string }>;
  applicableProducts: Array<{ _id: string; name: string }>;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  scope: "public" | "private";
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CouponResponse {
  success: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Coupon[];
}

export interface GetCouponsParams {
  current?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: string;
  scope?: string;
  search?: string;
}

export interface CouponFormValues {
  code: string;
  name: string;
  description?: string;
  type: "percentage" | "fixed";
  value: number;
  maxDiscount?: number | null;
  minOrderAmount?: number;
  usageLimit?: number | null;
  usageLimitPerUser?: number;
  applicableUsers?: string[];
  applicableCategories?: string[];
  applicableProducts?: string[];
  startDate?: string | null;
  endDate?: string | null;
  isActive?: boolean;
  scope?: "public" | "private";
  note?: string;
}
