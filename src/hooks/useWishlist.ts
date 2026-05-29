import { useQuery } from "@tanstack/react-query";
import wishlistService from "@/services/wishlistService";

const useWishlist = (userId: string) => {
    return useQuery({
        queryKey: ["wishlist", userId],
        queryFn: () => wishlistService.getWishlist(userId),
        enabled: !!userId // chỉ gọi query nếu userId không phải là undefined
    }); 
};

export default useWishlist;