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
  getProductBySlug: (slug: string) => `/products/slug/${slug}`,

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
  cart: "/cart",
  addToCart: "/cart/add",
  updateCart: (id: string) => `/cart/${id}`,
  removeFromCart: (id: string) => `/cart/${id}`,
  clearCart: "/cart/clear",

  // Orders (admin)
  adminOrders: "/order",
  getOrderByUserId: (userId: string) => `/order/user/${userId}`,
  createOrder: "/order",
  updateOrder: (id: string) => `/order/${id}`,
  deleteOrder: (id: string) => `/order/${id}`,

  // User
  userProfile: "/users/profile",
  updateProfile: "/users/profile",
  changePassword: "/users/change-password",
  addresses: "/users/addresses",
  addAddress: "/users/addresses",
  updateAddress: (id: string) => `/users/addresses/${id}`,
  deleteAddress: (id: string) => `/users/addresses/${id}`,
  setDefaultAddress: (id: string) => `/users/addresses/${id}/default`,

  // Wishlist
  wishlist: "/wishlist",
  addToWishlist: "/wishlist/add",
  removeFromWishlist: (id: string) => `/wishlist/${id}`,

  // Reviews
  reviews: "/reviews",
  createReview: "/reviews",
  updateReview: (id: string) => `/reviews/${id}`,
  deleteReview: (id: string) => `/reviews/${id}`,

  // Payment
  paymentMethods: "/payments/methods",
  createPaymentIntent: "/payments/intent",

  // Search
  search: "/search",

  //admin
  adminDashboard: "/admin/dashboard",
  getTopSellingVariants: "/admin/top-selling-variants",
  getTopRevenueVariants: "/admin/top-revenue-variants",
  getMonthlyRevenue: "/admin/monthly-revenue",
  getDailyRevenue: "/admin/daily-revenue",
  


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
};
