// ─── Nested types ────────────────────────────────────────────────────────────

export interface TransactionItem {
  productId: string;
  variantId: string;
  quantity: number;
  finalPrice: number;
  costPrice: number;
}

export interface RevenueDetail {
  _id: string;
  items: TransactionItem[];
  totalQuantity: number;
  totalAmount: number;
  totalCost: number;
  totalProfit: number;
  couponDiscount: number;
  date: string;
  type: "sale" | "return" | "adjustment";
}

export interface InventoryDetail {
  variantId: string;
  productId: string;
  productName: string;
  stock: number;
  costPrice: number;
  inventoryValue: number;
  color?: string;
  size?: string;
}

export interface SoldDetail {
  variantId: string;
  productId: string;
  productName: string;
  soldQuantity: number;
  costPrice: number;
  soldValue: number;
  soldProfit: number;
  color?: string;
  size?: string;
}

export interface OrderStatusCount {
  _id: string;
  label: string;
  count: number;
}

// ─── Top-level data groups ───────────────────────────────────────────────────

export interface UsersStats {
  total: number;
  active: number;
  inactive: number;
}

export interface OrdersStats {
  total: number;
  byStatus: OrderStatusCount[];
  completed: number;
  pending: number;
  cancelled: number;
  refunded: number;
  returned: number;
}

export interface FinancialStats {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  refundAmount: number;
  soldValue: number;
  inventoryValue: number;
  netProfit: number;
}

export interface MonthlyFinancial {
  revenue: number;
  cost: number;
  profit: number;
  refund: number;
  netProfit: number;
}

export interface ProductsStats {
  total: number;
  totalSold: number;
  totalViews: number;
  avgRating: number;
}

export interface InventoryStats {
  inventoryValue: number;
  inventoryDetails: InventoryDetail[];
}

export interface SoldStats {
  soldValue: number;
  soldDetails: SoldDetail[];
}

export interface ReviewsStats {
  total: number;
  avgRating: number;
}

export interface BrandStats {
  total: number;
  active: number;
}

export interface CategoryStats {
  total: number;
  active: number;
}

export interface SupplierStats {
  total: number;
  active: number;
  totalDebt: number;
}

export interface CouponStats {
  total: number;
  active: number;
}

export interface BlogStats {
  total: number;
  published: number;
}

export interface WishlistCartStats {
  wishlists: number;
  carts: number;
}

// ─── Root response ───────────────────────────────────────────────────────────

export interface DashboardData {
  users: UsersStats;
  orders: OrdersStats;
  financial: FinancialStats;
  monthlyFinancial: MonthlyFinancial;
  revenueDetails: RevenueDetail[];
  products: ProductsStats;
  inventory: InventoryStats;
  sold: SoldStats;
  reviews: ReviewsStats;
  brands: BrandStats;
  categories: CategoryStats;
  suppliers: SupplierStats;
  coupons: CouponStats;
  blogs: BlogStats;
  wishlists_carts: WishlistCartStats;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}
