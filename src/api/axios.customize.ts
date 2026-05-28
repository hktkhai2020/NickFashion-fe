// API Client Configuration
import axios from "axios";

const API_BASE_URL = "https://api.nickfashion.asia/api/v1";
// const API_BASE_URL = "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // Gửi mail / thao tác DB thường > 1s; quá ngắn sẽ abort phía client dù server vẫn xử lý xong
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Allow cookies to be sent with the request
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[axios] response error:", error?.response || error);
    return Promise.reject(error);
  },
);

export default apiClient;
