import { apiClient, endpoints } from "@/api";
import {
  Review,
  ReviewStats,
  GetReviewsResponse,
  CreateReviewPayload,
} from "@/types/review";

const reviewService = {
  getReviews: async (
    productId: string,
    options?: { page?: number; limit?: number; sort?: string },
  ) => {
    const params = new URLSearchParams();
    if (options?.page) params.set("page", String(options.page));
    if (options?.limit) params.set("limit", String(options.limit));
    if (options?.sort) params.set("sort", options.sort);
    const query = params.toString();
    const url = query
      ? `${endpoints.getReviews(productId)}?${query}`
      : endpoints.getReviews(productId);
    const response = await apiClient.get<GetReviewsResponse>(url);
    return response.data;
  },

  getStats: async (productId: string) => {
    const response = await apiClient.get<{ success: boolean; data: ReviewStats }>(
      endpoints.getStatsReviews(productId),
    );
    return response.data;
  },

  getMyReview: async (productId: string, userId: string) => {
    const response = await apiClient.get<{ success: boolean; data: Review | null }>(
      endpoints.getMyReview(productId, userId),
    );
    return response.data;
  },

  createReview: async (payload: CreateReviewPayload) => {
    const response = await apiClient.post<{ success: boolean; data: Review }>(
      endpoints.createReview,
      payload,
    );
    return response.data;
  },

  updateReview: async (reviewId: string, payload: Partial<CreateReviewPayload>) => {
    const response = await apiClient.put<{ success: boolean; data: Review }>(
      endpoints.updateReview(reviewId),
      payload,
    );
    return response.data;
  },

  deleteReview: async (reviewId: string, userId: string) => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      endpoints.deleteReview(reviewId),
      { data: { userId } },
    );
    return response.data;
  },
};

export default reviewService;
