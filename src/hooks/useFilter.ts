import colorService from "@/services/colorService";
import sizeService from "@/services/sizeService";
import { Color } from "@/types/color";
import { Size } from "@/types/size";
import { useEffect, useState } from "react";

const useFilter = (categoryId: string[]) => {
  const [colorsByCategory, setColorsByCategory] = useState<Color[]>([]);
  const [sizesbyCategory, setSizesbyCategory] = useState<Size[]>([]);

  useEffect(() => {
    const getFilter = async () => {
     try {
      const res = await Promise.all([
        colorService.getColors({current:1,pageSize:50}),
        sizeService.getSizes({current:1,pageSize:50,typeId:categoryId})
      ])
      setColorsByCategory(res[0].data);
      setSizesbyCategory(res[1].data);
     } catch (error) {
      console.log(error);
     }
    };
    getFilter();
  }, [JSON.stringify(categoryId)]);
  return { colorsByCategory, sizesbyCategory };
};
export default useFilter;
