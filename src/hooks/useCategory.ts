import categoryService, { GetCategoriesParams } from "@/services/categoryService";
import { Category } from "@/types";
import { useEffect, useState } from "react";


const useCategory = (params?: GetCategoriesParams) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryService.getCategories(params);
      
      setCategories(response.data);
    };
    fetchCategories();
  }, [JSON.stringify(params)]);
  return { categories };
};



export default useCategory;
