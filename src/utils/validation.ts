// Validation Utilities
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  message: string;
}

export const validateField = (
  value: string | number | undefined,
  rules: ValidationRule[]
): string | null => {
  for (const rule of rules) {
    const strValue = String(value ?? '');
    
    if (rule.required && !strValue.trim()) {
      return rule.message;
    }
    
    if (rule.minLength && strValue.length < rule.minLength) {
      return rule.message;
    }
    
    if (rule.maxLength && strValue.length > rule.maxLength) {
      return rule.message;
    }
    
    if (rule.pattern && !rule.pattern.test(strValue)) {
      return rule.message;
    }
    
    if (rule.min !== undefined && Number(value) < rule.min) {
      return rule.message;
    }
    
    if (rule.max !== undefined && Number(value) > rule.max) {
      return rule.message;
    }
  }
  
  return null;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /(84|0)[3|5|7|8|9][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Mật khẩu phải có ít nhất 8 ký tự');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất 1 chữ hoa');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất 1 chữ thường');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Mật khẩu phải chứa ít nhất 1 số');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
