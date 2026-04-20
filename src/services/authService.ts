// Auth Service
import { apiClient, endpoints } from "@/api";
import {
  UserLogin,
  UserRegister,
  User,
  LoginResponse,
  CheckEmailResponse,
} from "@/types";

export const authService = {
  login: async (credentials: UserLogin) => {
    const response = await apiClient.post<LoginResponse>(
      endpoints.login,
      credentials,
    );
    return response.data;
  },
  loginGoogle: async (credential: string) => {
    const response = await apiClient.post<LoginResponse>(
      endpoints.loginGoogle,
      { credential },
    );
    return response.data;
  },
  forgotPassword: async (email: string) => {
    const response = await apiClient.post(endpoints.forgotPassword, { email });
    return response.data;
  },
  verifyOtpForgotPassword: async (email: string, otp: string) => {
    const response = await apiClient.post(endpoints.verifyOtpForgotPassword, {
      email,
      otp,
    });
    return response.data;
  },
  resetPassword: async (email: string, otp: string, password: string) => {
    const response = await apiClient.post(endpoints.resetPassword, {
      email,
      newPassword: password,
      otp,
    });
    return response.data;
  },

  register: async (data: UserRegister) => {
    const response = await apiClient.post(endpoints.register, data);
    return response.data;
  },

  registerGoogle: async (credential: string) => {
    const response = await apiClient.post<LoginResponse>(
      endpoints.registerGoogle,
      { credential },
    );
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post(endpoints.logout);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get<User>(endpoints.userProfile);
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await apiClient.put(endpoints.updateProfile, data);
    return response.data;
  },

  changePassword: async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await apiClient.put(endpoints.changePassword, passwords);
    return response.data;
  },

  checkEmail: async (email: string) => {
    const response = await apiClient.get<CheckEmailResponse>(
      endpoints.checkEmail,
      { params: { email } },
    );
    return response.data;
  },
  sendVerifyEmail: async (email: string) => {
    const response = await apiClient.post(endpoints.sendVerifyEmail, {
      email,
    });
    return response.data;
  },
  verifyEmail: async (email: string, otp: string) => {
    const response = await apiClient.post(endpoints.verifyEmail, {
      email,
      otp,
    });
    return response.data;
  },
};
