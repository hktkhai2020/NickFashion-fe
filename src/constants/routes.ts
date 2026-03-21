// Route Constants
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT_DETAIL: '/product/:slug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ORDER_HISTORY: '/orders',
  ORDER_DETAIL: '/orders/:id',
  WISHLIST: '/wishlist',
  CONTACT: '/contact',
  ABOUT: '/about',
  NOT_FOUND: '*',
};

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  PRODUCTS: '/admin/products',
  ADD_PRODUCT: '/admin/products/add',
  EDIT_PRODUCT: '/admin/products/:id/edit',
  CATEGORIES: '/admin/categories',
  ORDERS: '/admin/orders',
  ORDER_DETAIL: '/admin/orders/:id',
  CUSTOMERS: '/admin/customers',
  SETTINGS: '/admin/settings',
};

export const BUYER_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
};