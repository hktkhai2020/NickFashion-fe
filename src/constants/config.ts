// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Fashion Store',
  APP_TAGLINE: 'Thời trang đẳng cấp',
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  CART_IDLE_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  SEARCH_DEBOUNCE: 300,
  TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const PAGINATION_CONFIG = {
  PAGE_SIZES: [8, 12, 24, 48],
  DEFAULT_PAGE_SIZE: 12,
};

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const PRODUCT_COLORS = [
  { name: 'Đen', code: '#000000' },
  { name: 'Trắng', code: '#FFFFFF' },
  { name: 'Xám', code: '#808080' },
  { name: 'Đỏ', code: '#FF0000' },
  { name: 'Xanh Navy', code: '#000080' },
  { name: 'Xanh lá', code: '#008000' },
  { name: 'Vàng', code: '#FFFF00' },
  { name: 'Hồng', code: '#FFC0CB' },
  { name: 'Nâu', code: '#8B4513' },
  { name: 'Be', code: '#F5F5DC' },
];

export const ORDER_STATUS = {
  pending: { label: 'Chờ xác nhận', color: 'gold' },
  confirmed: { label: 'Đã xác nhận', color: 'blue' },
  processing: { label: 'Đang xử lý', color: 'cyan' },
  shipped: { label: 'Đang giao', color: 'purple' },
  delivered: { label: 'Đã giao', color: 'green' },
  cancelled: { label: 'Đã hủy', color: 'red' },
};

export const PAYMENT_METHODS = [
  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
  { value: 'credit_card', label: 'Thẻ tín dụng/Ghi nợ' },
  { value: 'bank_transfer', label: 'Chuyển khoản ngân hàng' },
  { value: 'e_wallet', label: 'Ví điện tử' },
];
