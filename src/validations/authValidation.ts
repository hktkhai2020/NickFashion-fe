// Auth Validation Schemas
export const loginSchema = {
  email: [
    { required: true, message: 'Email là bắt buộc' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' },
  ],
  password: [
    { required: true, message: 'Mật khẩu là bắt buộc' },
    { minLength: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
  ],
};

export const registerSchema = {
  name: [
    { required: true, message: 'Họ tên là bắt buộc' },
    { minLength: 2, message: 'Họ tên phải có ít nhất 2 ký tự' },
    { maxLength: 100, message: 'Họ tên không được vượt quá 100 ký tự' },
  ],
  email: [
    { required: true, message: 'Email là bắt buộc' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' },
  ],
  password: [
    { required: true, message: 'Mật khẩu là bắt buộc' },
    { minLength: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
    { pattern: /[A-Z]/, message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa' },
    { pattern: /[a-z]/, message: 'Mật khẩu phải chứa ít nhất 1 chữ thường' },
    { pattern: /[0-9]/, message: 'Mật khẩu phải chứa ít nhất 1 số' },
  ],
  confirmPassword: [
    { required: true, message: 'Xác nhận mật khẩu là bắt buộc' },
  ],
  phone: [
    { pattern: /(84|0)[3|5|7|8|9][0-9]{8}$/, message: 'Số điện thoại không hợp lệ' },
  ],
};
