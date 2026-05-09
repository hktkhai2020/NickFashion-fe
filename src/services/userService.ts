import { apiClient, endpoints } from "@/api";
import { User, UserListResponse } from "@/types";

export interface GetUsersParams {
  current?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UpdateUserByAdminData {
  name?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
  address?: string;
  role?: "admin" | "user" | "moderator";
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface UpdateUserByAdminResponse {
  success: boolean;
  message: string;
  data?: User;
}

export interface UpdateImageUserData {
  avatarUrl: string;
}

export interface UpdateImageUserResponse {
  success: boolean;
  message: string;
  data?: User;
}

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get<User>(endpoints.userProfile);
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await apiClient.put<User>(endpoints.updateProfile, data);
    return response.data;
  },

  getUsers: async (params?: GetUsersParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
    const query = searchParams.toString();
    const url = query ? `${endpoints.getUsers}?${query}` : endpoints.getUsers;
    const response = await apiClient.get<UserListResponse>(url);
    return response.data;
  },

  updateUserByAdmin: async (id: string, data: UpdateUserByAdminData) => {
    const response = await apiClient.put<UpdateUserByAdminResponse>(
      endpoints.updateUserByAdmin(id),
      data,
    );
    return response.data;
  },

  

  updateImageUser: async (id: string, data: UpdateImageUserData) => {
    const response = await apiClient.patch<UpdateImageUserResponse>(endpoints.updateImageUser(id), data);
    return response.data;
  },
};

export default userService;
