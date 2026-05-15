import { Product } from "@/types";
import { formatPrice } from "@/utils";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const CardProductList = ({ products }: { products: Product[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleNavigate = (slug: string) => {
    navigate(`/product/${slug}`);
  };
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative group w-full mt-[32px]!">
        {/* Nút Prev */}
        <div
          className="absolute left-[-20px] top-[200px] z-10 w-[40px] h-[40px] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 hover:bg-[#333f48] hover:text-white text-[#333f48] hidden lg:flex"
          onClick={() => scroll("left")}
        >
          <LeftOutlined />
        </div>

        {/* Nút Next */}
        <div
          className="absolute right-[-20px] top-[200px] z-10 w-[40px] h-[40px] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 hover:bg-[#333f48] hover:text-white text-[#333f48] hidden lg:flex"
          onClick={() => scroll("right")}
        >
          <RightOutlined />
        </div>

        {/* Container sản phẩm */}
        <div
          ref={scrollRef}
          className="w-full flex flex-nowrap gap-[16px] overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
          {products.map((product) => (
            <div key={product._id} className="lg:w-[400px]! w-[300px]! ">
              <div
                className="lg:w-[400px] lg:h-[530px] w-[300px] h-[400px] overflow-hidden cursor-pointer "
                onClick={() => handleNavigate(product.slug)}
              >
                <img
                  src={product.thumbnail}
                  alt=""
                  className="w-full h-full object-cover hover:scale-120 transition-transform duration-300"
                />
              </div>
              <div className="flex gap-[10px] mt-[16px]! mb-[16px] ">
                {product.slides.map((slide, index) =>
                  index < 3 ? (
                    <div
                      key={slide}
                      className="w-[45px] h-[55px] shrink-0 cursor-pointer"
                      onClick={() => handleNavigate(product.slug)}
                    >
                      <img
                        src={slide}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div></div>
                  ),
                )}
              </div>
              <div
                className="text-[#333f48] text-[14px] cursor-pointer hover:text-[#d80c0c] transition-all duration-300 line-clamp-1 "
                onClick={() => handleNavigate(product.slug)}
              >
                {product.name}
              </div>
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
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CardProductList;
