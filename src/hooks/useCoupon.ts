import { useEffect, useState } from "react";
import couponService from "@/services/couponService";
import { Coupon } from "@/types/coupon";

const useCoupon = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const response = await couponService.getCoupons();
        setCoupons(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  
  return { coupons, loading };
};

export default useCoupon;
