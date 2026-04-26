// ─── Nested / Item types ────────────────────────────────────────────────────────

export interface TransactionItem {
  productId: string;
  variantId: string;
  quantity: number;
  finalPrice: number;
  costPrice: number;
}

export interface RevenueDetail {
  transactionId: string;
  orderId: string;
  date: string;
  totalAmount: number;
  totalCost: number;
  totalProfit: number;
  totalQuantity: number;
  couponDiscount: number;
  items: TransactionItem[];
}

export interface InventoryDetail {
  variantId: string;
  productId: string;
  productName: string | null;
  color: string | null;
  size: string | null;
  stock: number;
  costPrice: number;
  inventoryValue: number;
}

export interface SoldDetail {
  variantId: string;
  productId: string;
  productName: string | null;
  soldQuantity: number;
  costPrice: number;
  soldValue: number;
}

export interface ProductChartItem {
  productName: string;
  inventoryValue: number;
  soldValue: number;
}

// ─── Top-level data groups ────────────────────────────────────────────────────

export interface UsersStats {
  total: number;
  active: number;
  inactive: number;
}

export interface OrderStatusCount {
  status: string;
  label: string;
  count: number;
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

// ─── Root response ────────────────────────────────────────────────────────────

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
  wishlists: number;
  carts: number;
  productChart: ProductChartItem[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

// ─── Top-selling variants ──────────────────────────────────────────────────────

export interface TopVariantBase {
  _id: string;
  totalQuantity: number;
  variantId: string | null;
  productId: string | null;
  productName: string | null;
  color: string | null;
  size: string | null;
  stock: number;
}

export interface TopSellingVariant extends TopVariantBase {
  soldCount: number;
}

export interface TopRevenueVariant extends TopVariantBase {
  totalRevenue: number;
}

export interface TopSellingVariantsResponse {
  success: boolean;
  data: TopSellingVariant[];
}

export interface TopRevenueVariantsResponse {
  success: boolean;
  data: TopRevenueVariant[];
}

// ─── Monthly / Daily revenue ──────────────────────────────────────────────────

export interface MonthlyRevenueItem {
  month: number;
  monthName: string;
  revenue: number;
  cost: number;
  profit: number;
  orderCount: number;
}

export interface DailyRevenueItem {
  day: number;
  date: string;
  revenue: number;
  cost: number;
  profit: number;
  orderCount: number;
}

export interface MonthlyRevenueResponse {
  success: boolean;
  data: MonthlyRevenueItem[];
}

export interface DailyRevenueResponse {
  success: boolean;
  data: DailyRevenueItem[];
}
