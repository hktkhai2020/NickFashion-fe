import { useEffect, useState } from "react";
import productService from "@/services/productService";
import { Product, GetProductsParams } from "@/types/product";

const useProduct = (params?: GetProductsParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getProducts(params);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [JSON.stringify(params)]);

  return { products, loading };
};

export default useProduct;
