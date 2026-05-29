import { apiClient, endpoints } from "@/api";
import { WishlistGetResponse } from "@/types/wishlist";

const wishlistService = {

    getWishlist: async (userId: string) => {
        const response = await apiClient.get<WishlistGetResponse>(endpoints.wishlist(userId));
        return response.data;
    },
    addToWishlist: async (productId: string, userId: string) => {
        const response = await apiClient.post(endpoints.addToWishlist, { productId, userId });
        return response.data;
    },
    removeFromWishlist: async (productId: string, userId: string) => {
        const response = await apiClient.delete(endpoints.removeFromWishlist, { data: { productId, userId } });
        return response.data;
    },
    clearWishList:async (userId: string)=>{
        const response = await apiClient.delete(endpoints.clearWishList(userId));
        return response.data;
    }
}
export default wishlistService;