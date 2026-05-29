// API Endpoints
export const endpoints = {
  // Auth
  login: "/auth/login",
  loginGoogle: "/auth/google-login",
  register: "/auth/register",
  registerGoogle: "/auth/google-register",
  logout: "/auth/logout",
  refreshToken: "/auth/refresh-token",
  checkEmail: "/auth/check-email",
  sendVerifyEmail: "/auth/send-verify-email",
  verifyEmail: "/auth/verify-email-otp",
  forgotPassword: "/auth/forgot-password",
  verifyOtpForgotPassword: "/auth/verify-otp",
  resetPassword: "/auth/reset-password",
  me: "/auth/me",
  // Products
  getProducts: "/products",
  productDetail: (id: string) => `/products/${id}`,
  createProduct: "/products",
  updateProduct: (id: string) => `/products/${id}`,
  deleteProduct: (id: string) => `/products/${id}`,
  getProductBySlug: (slug: string) => `/products/client/${slug}`,
  searchProducts: `/products/search`,
  //upload
  uploadSingle: "/upload/single",
  uploadMultiple: "/upload/multiple",
  uploadDelete: "/upload/delete",

  // Categories
  categories: "/category",
  createCategory: "/category",
  deleteCategory: (id: string) => `/category/${id}`,
  updateCategory: (id: string) => `/category/${id}`,

  // Suppliers
  suppliers: "/supplier",
  createSupplier: "/supplier",
  updateSupplier: (id: string) => `/supplier/${id}`,
  deleteSupplier: (id: string) => `/supplier/${id}`,

  // Brands
  brands: "/brand",
  createBrand: "/brand",
  updateBrand: (id: string) => `/brand/${id}`,
  deleteBrand: (id: string) => `/brand/${id}`,

  // Sizes
  sizes: "/size",
  createSize: "/size",
  updateSize: (id: string) => `/size/${id}`,
  deleteSize: (id: string) => `/size/${id}`,

  // Colors
  colors: "/color",
  createColor: "/color",
  updateColor: (id: string) => `/color/${id}`,
  deleteColor: (id: string) => `/color/${id}`,

  // Cart
  getCart: (userId: string) => `/cart/${userId}`,
  addToCart: "/cart/add",
  removeFromCart: `/cart/delete-item`,
  toggleCartItem: `cart/toggle-item-selection`,
  selectAllCartItems: `cart/select-all`,
  unselectAllCartItems: `cart/unselect-all`,
  updateCartItemQuantity: `cart/update-quantity`,
  applyCouponToCart: `cart/apply-coupon`,
  clearCart: `cart/clear`,

  // Orders (admin)
  adminOrders: "/order",
  getOrderByUserId: (userId: string) => `/order/${userId}`,
  createOrder: "/order",
  updateOrder: (id: string) => `/order/${id}`,
  deleteOrder: (id: string) => `/order/${id}`,
  getOrderDetails: (id: string) => `/order/${id}/details`,
  // User
  userProfile: "/users/profile",
  updateProfile: "/user",
  getUsers: "/user",
  updateUserByAdmin: (id: string) => `/user/admin/${id}`,
  deleteUser: (id: string) => `/user/${id}`,
  updateImageUser: (id: string) => `/user/${id}/avatar`,

  // Wishlist
  wishlist: (userId: string) => `/wishlist/${userId}`,
  addToWishlist: "/wishlist",
  removeFromWishlist: "/wishlist",
  clearWishList: (userId: string) => `/wishlist/clear/${userId}`,
  // Reviews - public
  getReviews: (productId: string) => `/review/product/${productId}`,
  getStatsReviews: (productId: string) => `/review/product/${productId}/stats`,
  getMyReview: (productId: string, userId: string) => `/review/product/${productId}/me/${userId}`,
  // Reviews - user (auth required)
  createReview: "/review",
  updateReview: (reviewId: string) => `/review/${reviewId}`,
  deleteReview: (reviewId: string) => `/review/${reviewId}`,



  // Payment
  paymentMethods: "/payments/methods",
  createPaymentIntent: "/payments/intent",

  // Search
  search: "/search",

  //admin
  adminDashboard: "/admin/statistical",
  getTopSellingVariants: "/admin/top-selling-variants",
  getTopRevenueVariants: "/admin/top-revenue-variants",
  getMonthlyRevenue: "/admin/monthly-revenue",
  getDailyRevenue: "/admin/daily-revenue",
  getImportStatistics: "/admin/import-stats",
  getImportQuantity: "/admin/import-quantity",

  // Variants
  variants: "/variant",
  createVariant: "/variant",
  updateVariant: (id: string) => `/variant/${id}`,
  deleteVariant: (id: string) => `/variant/${id}`,

  // Coupons
  coupons: "/coupon",
  createCoupon: "/coupon",
  updateCoupon: (id: string) => `/coupon/${id}`,
  deleteCoupon: (id: string) => `/coupon/${id}`,
  toggleCouponStatus: (id: string) => `/coupon/${id}/toggle`,
  applyCoupon: "/coupon/apply",

  // Receipts (Goods Import)
  receipts: "/receipt",
  createReceipt: "/receipt",
  deleteReceipt: (id: string) => `/receipt/${id}`,

  // Payment
  createPayment: "/payment",
};
