import { useQuery } from "@tanstack/react-query";
import productService from "@/services/productService";

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });
};
