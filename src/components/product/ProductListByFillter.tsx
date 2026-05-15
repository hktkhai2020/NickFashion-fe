import { Product } from "@/types/product";
import { formatPrice } from "@/utils";
import { useNavigate } from "react-router-dom";
interface ProductListByFillterProps {
  products: Product[];
}
const ProductListByFillter = ({ products }: ProductListByFillterProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full grid lg:grid-cols-3 grid-cols-2  gap-x-1! gap-y-[2rem]! ">
      {products.map((product) => (
        <div key={product._id} className="flex flex-col gap-2">
          <div
            className="w-full cursor-pointer overflow-hidden"
            onClick={() => navigate(`/product/${product.slug}`)}
          >
            <img src={product.thumbnail} alt={product.name} className="hover:scale-115 transition-transform duration-300 ease-in-out"/>
          </div>
          <div className="w-full flex gap-1">
            {product.slides.map(
              (slide, index) =>
                index < 4 && (
                  <div
                    key={index}
                    className="w-[45px] h-[55px] shrink-0 cursor-pointer" 
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    <img
                      src={slide}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ),
            )}
          </div>
          <div className="w-full text-[#333f48] text-[14px] cursor-pointer hover:text-[#d80c0c] transition-all duration-300 line-clamp-1" onClick={() => navigate(`/product/${product.slug}`)}>
            {product.name}
          </div>
          <div className="w-full">
            {product.is.discounted ? (
              <>
                <div className="flex gap-[10px] ">
                  <div className="text-[#74869b] text-[14px] font-bold line-through [text-decoration-thickness:2px] ">
                    {formatPrice(product.priceSell)}
                  </div>
                  <div className="text-[#d80707] text-[14px] font-bold ">
                    -{product.sale.discountValue}%
                  </div>
                </div>
                <div className="text-[#d80c0c] text-[14px] font-bold ">
                  {formatPrice(product.finalPrice)}
                </div>
              </>
            ) : (
              <div className="text-[#333f48] text-[14px] font-bold ">
                {formatPrice(product.finalPrice)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListByFillter;
