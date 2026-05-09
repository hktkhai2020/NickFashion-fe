// Route Constants
export const ROUTES = {
  HOME: "",
  SHOP: "shop",
  PRODUCT_DETAIL: "product/:slug",
  CART: "cart",
  CHECKOUT: "checkout",
  LOGIN: "login",
  REGISTER: "register",
  PROFILE: "account",
  ORDER_HISTORY: "orders",
  ORDER_DETAIL: "orders/:id",
  WISHLIST: "wishlist",
  CONTACT: "contact",
  ABOUT: "about",
  NOT_FOUND: "*",
  PRODUCT_FEMALE: "nu/:category",
  PRODUCT_MALE: "nam/:category",
  PRODUCT_GIRL: "be-gai/:category",
  PRODUCT_BOY: "be-trai/:category",
  PRODUCT_NEW: "san-pham-moi/:category",
};

export const ADMIN_ROUTES = {
  DASHBOARD: "dashboard",
  SELLING_DATA: "selling-data",
  IMPORTSTATISTICS: "import-statistics",
  PRODUCTS: "products",
  CATEGORIES: "categories",
  SUPPLIER: "supplier",
  BRAND: "brand",
  SIZE: "size",
  COLOR: "color",
  VARIANTS: "variants",
  USER: "user",
  COUPON: "coupon",
  BLOG: "blog",
  CHAT: "chat",
  SELLINVOICE: "sell-invoice",
  GOODSRECEIPT: "goods-receipt",
};

export const BUYER_ROUTES = {
  LOGIN: "login",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
};
