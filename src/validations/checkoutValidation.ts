// Checkout Validation Schemas
export const checkoutSchema = {
  shippingAddress: {
    fullName: [
      { required: true, message: 'Họ tên người nhận là bắt buộc' },
      { minLength: 2, message: 'Họ tên phải có ít nhất 2 ký tự' },
    ],
    phone: [
      { required: true, message: 'Số điện thoại là bắt buộc' },
      { pattern: /(84|0)[3|5|7|8|9][0-9]{8}$/, message: 'Số điện thoại không hợp lệ' },
    ],
    addressLine: [
      { required: true, message: 'Địa chỉ là bắt buộc' },
      { minLength: 5, message: 'Địa chỉ phải có ít nhất 5 ký tự' },
    ],
    city: [
      { required: true, message: 'Tỉnh/Thành phố là bắt buộc' },
    ],
    district: [
      { required: true, message: 'Quận/Huyện là bắt buộc' },
    ],
  },
  note: [
    { maxLength: 500, message: 'Ghi chú không được vượt quá 500 ký tự' },
  ],
  paymentMethod: [
    { required: true, message: 'Vui lòng chọn phương thức thanh toán' },
  ],
};

export const addressSchema = {
  fullName: [
    { required: true, message: 'Họ tên là bắt buộc' },
    { minLength: 2, message: 'Họ tên phải có ít nhất 2 ký tự' },
  ],
  phone: [
    { required: true, message: 'Số điện thoại là bắt buộc' },
    { pattern: /(84|0)[3|5|7|8|9][0-9]{8}$/, message: 'Số điện thoại không hợp lệ' },
  ],
  addressLine: [
    { required: true, message: 'Địa chỉ là bắt buộc' },
  ],
  city: [
    { required: true, message: 'Tỉnh/Thành phố là bắt buộc' },
  ],
  district: [
    { required: true, message: 'Quận/Huyện là bắt buộc' },
  ],
};
