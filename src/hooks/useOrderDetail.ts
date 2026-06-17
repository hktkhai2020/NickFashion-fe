import { useQuery } from "@tanstack/react-query";
import orderService from "@/services/orderService";

const useOrderDetail = (id: string) => {
    
    return useQuery({
        queryKey: ["order", id],
        queryFn: () => orderService.getOrderDetails(id),
        enabled: !!id // chỉ gọi query nếu id không phải là undefined
    }); 
};

export default useOrderDetail;