// Receipt (Phiếu nhập hàng) Types - matching backend schema

export interface ReceiptItem {
  productId: string;
  variantId: string | null;
  productName: string;
  variantName: string | null;
  costPrice: number;
  quantity: number;
  intoMoney: number;
}

export interface ReceiptSupplier {
  _id: string;
  name: string;
  code: string;
  phone: string;
}

export interface ReceiptCreator {
  _id: string;
  name: string;
  email: string;
}

export interface Receipt {
  _id: string;
  code: string;
  supplier: ReceiptSupplier;
  createdBy: ReceiptCreator;
  items: ReceiptItem[];
  totalAmount: number;
  note: string | null;
  itemCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptResponse {
  success: boolean;
  data: Receipt[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface GetReceiptsParams {
  current?: number;
  pageSize?: number;
  sortBy?: "createdAt" | "updatedAt" | "totalAmount" | "supplier" | "code";
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface CreateReceiptPayload {
  supplier: string;
  items: {
    productId: string;
    variantId?: string | null;
    productName: string;
    variantName?: string | null;
    costPrice: number;
    quantity: number;
  }[];
  note?: string;
}

// Form item structure for create modal
export interface ReceiptFormItem {
  productId: string;
  variantId?: string | null;
  productName?: string;
  variantName?: string | null;
  costPrice: number;
  quantity: number;
  stock?: number;
  key: string;
}
