// User Types
export interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'user' | 'moderator';
  addresses: Address[];
  defaultAddressId?: string;
  createdAt: string;
  updatedAt: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  address?: string;
  userId: string;
  isActive?: boolean;
  isDeleted?: boolean;
}
export interface GoogleLoginResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  scope: string;
  tokenType: string;
  expiresIn: number;
}
export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  district: string;
  ward?: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface UserLogin {
  email?: string;
  phone?: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: "male" | "female";
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    authType: [];
    googleId: string | null;
    _id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string | null;
    gender: string;
    address: string | null;
    avatar: string | null;
    role: "user" | "admin";
    resetPasswordToken: string | null;
    resetPasswordExpires: string | null;
    isEmailVerified: boolean;
    emailVerificationToken: string | null;
    emailVerifiedAt: string | null;
    isActive: boolean;
    isDeleted: boolean;
    lastLogin: string | null;
    loginCount: number;
    addresses: Address[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    defaultAddress: null;
    id: string;
  };
  accessToken: string;
}
export interface CheckEmailResponse {
  success: boolean;
  exists: boolean;
  message: string;
}

export interface MeResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  accessToken: string;
}

export interface UserListResponse {
  success: boolean;
  message: string;
  users: User[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
