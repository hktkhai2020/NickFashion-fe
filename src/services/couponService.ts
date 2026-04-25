import { apiClient, endpoints } from "@/api";
import { Coupon, CouponResponse, GetCouponsParams } from "@/types";

const couponService = {
  getCoupons: async (params?: GetCouponsParams) => {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set("current", String(params.current));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
    if (params?.isActive) searchParams.set("isActive", params.isActive);
    if (params?.scope) searchParams.set("scope", params.scope);
    if (params?.search) searchParams.set("search", params.search);

    const query = searchParams.toString();
    const url = query ? `${endpoints.coupons}?${query}` : endpoints.coupons;
    const response = await apiClient.get<CouponResponse>(url);
    return response.data;
  },

  getCouponById: async (id: string) => {
    const response = await apiClient.get<{ success: boolean; data: Coupon }>(
      `${endpoints.coupons}/${id}`,
    );
    return response.data;
  },

  createCoupon: async (data: Record<string, unknown>) => {
    const response = await apiClient.post(endpoints.createCoupon, data);
    return response.data;
  },

  updateCoupon: async (id: string, data: Record<string, unknown>) => {
    const response = await apiClient.put(
      endpoints.updateCoupon(id),
      data,
    );
    return response.data;
  },

  deleteCoupon: async (id: string) => {
    const response = await apiClient.delete(endpoints.deleteCoupon(id));
    return response.data;
  },

  toggleCouponStatus: async (id: string) => {
    const response = await apiClient.patch(
      endpoints.toggleCouponStatus(id),
    );
    return response.data;
  },
};

export default couponService;
