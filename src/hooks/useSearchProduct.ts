import { useState, useEffect } from "react";
import productService from "@/services/productService";
import { Product } from "@/types/product";

const useSearchProduct = (query: string,sortBy:string,sortOrder:string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setProducts([]);
      setLoading(true);
      try {
        const response = await productService.searchProducts(query || "",sortBy,sortOrder);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [JSON.stringify(query+sortBy+sortOrder)]);

  return { products, loading };
};
export default useSearchProduct;
