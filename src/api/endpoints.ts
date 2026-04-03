// API Endpoints
export const endpoints = {
  // Auth
  login: "/auth/login",
  loginGoogle: "/auth/google-login",
  register: "/auth/register",
  registerGoogle: "/auth/google-register",
  logout: "/auth/logout",
  refreshToken: "/auth/refresh",

  // Products
  products: "/products",
  productDetail: (id: string) => `/products/${id}`,
  productReviews: (id: string) => `/products/${id}/reviews`,
  featuredProducts: "/products/featured",
  newProducts: "/products/new",

  // Categories
  categories: "/categories",
  categoryDetail: (id: string) => `/categories/${id}`,
  categoryProducts: (id: string) => `/categories/${id}/products`,

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
};
