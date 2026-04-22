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
  products: "/products",
  productDetail: (id: string) => `/products/${id}`,
  productReviews: (id: string) => `/products/${id}/reviews`,
  featuredProducts: "/products/featured",
  newProducts: "/products/new",

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

  // Cart
  cart: "/cart",
  addToCart: "/cart/add",
  updateCart: (id: string) => `/cart/${id}`,
  removeFromCart: (id: string) => `/cart/${id}`,
  clearCart: "/cart/clear",

  // Orders
  orders: "/orders",
  orderDetail: (id: string) => `/orders/${id}`,
  orderHistory: "/orders/history",
  cancelOrder: (id: string) => `/orders/${id}/cancel`,

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
  adminDashboard: "/admin/statistical",
};
