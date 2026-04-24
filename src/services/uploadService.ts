import { apiClient } from "@/api";
import { endpoints } from "@/api";

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    key: string;
    originalName: string;
    size: number;
    contentType: string;
  };
}

export interface UploadMultipleResponse {
  success: boolean;
  message: string;
  data: Array<{
    url: string;
    key: string;
    originalName: string;
    size: number;
    contentType: string;
  }>;
}

const uploadService = {
  uploadSingle: async (file: File, type: string = "thumbnail") => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<UploadResponse>(
      `${endpoints.uploadSingle}?type=${type}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  uploadMultiple: async (files: File[], type: string = "products") => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const response = await apiClient.post<UploadMultipleResponse>(
      `${endpoints.uploadMultiple}?type=${type}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  deleteFile: async (key: string) => {
    const response = await apiClient.delete(
      `${endpoints.uploadDelete}?key=${encodeURIComponent(key)}`
    );
    return response.data;
  },
};

export default uploadService;
