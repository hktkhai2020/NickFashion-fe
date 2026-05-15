import { useLocation } from "react-router-dom";
import useProduct from "@/hooks/useProduct";
import useCategory from "@/hooks/useCategory";
import { Breadcrumb, Spin } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ProductListByFillter, Filter } from "@/components/product";
const ProductFemale = () => {
  const { pathname } = useLocation();
  const { categories } = useCategory({ slug: pathname.split("/").pop() });
  const [sortBy, setSortBy] = useState<
    "sortOrder" | "name" | "createdAt" | "updatedAt" | "finalPrice" | undefined
  >("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    "desc"
  );
  const [isDropdownSort, setIsDropdownSort] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [discountMin, setDiscountMin] = useState(0);
  const [discountMax, setDiscountMax] = useState(0);
  const { products, loading } = useProduct({
    gender: "woman",
    categoryId: categories[0]?._id,
    sortBy,
    sortOrder,
    sizes,
    colors,
    priceMin,
    priceMax,
    discountMin,
    discountMax,
  });
  return (
    <>
      <div className="w-full flex mt-5 flex-col lg:px-[7rem]! px-[2rem]! gap-[2rem]!">
        <div className="flex flex-col lg:gap-[3rem]! gap-[2rem]!">
          <Breadcrumb
            items={[
              {
                title: <a href="/">Trang chủ</a>,
              },
              {
                title: <a href="">Nữ</a>,
              },
              {
                title: <a href="">{categories[0]?.name}</a>,
              },
            ]}
          />
          <div className="font-bold text-[36px] text-[#333f48] uppercase">
            {categories[0]?.name}
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:gap-[2rem]! gap-[1rem]!  ">
          {/*filter */}
          <div className="lg:w-2/6 w-full ">
            <Filter
              categoryId={[categories[0]?._id]}
              gender={pathname.split("/")[2]}
              sizes={sizes}
              colors={colors}
              priceMin={priceMin}
              priceMax={priceMax}
              discountMin={discountMin}
              discountMax={discountMax}
              setSizes={setSizes}
              setColors={setColors}
              setPriceMin={setPriceMin}
              setPriceMax={setPriceMax}
              setDiscountMin={setDiscountMin}
              setDiscountMax={setDiscountMax}
            />
          </div>

          {/*product list*/}
          <div className="lg:w-4/6 w-full flex flex-col gap-4    ">
            <div className="flex justify-between items-center  relative">
              <div className="text-[15px] text-[#74869b] font-[500]">
                {products?.length} Sản phẩm
              </div>
              <div
                onClick={() => setIsDropdownSort(!isDropdownSort)}
                className="flex gap-2 items-center cursor-pointer"
              >
                <div>
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/icon_service/icon_sort.svg"
                    alt=""
                  />
                </div>
                <div className="text-[15px] text-[#333f48] font-[500]">
                  Sắp xếp
                </div>
                <div>{isDropdownSort ? <UpOutlined /> : <DownOutlined />}</div>
              </div>

              {/*dropdown sort*/}
              {isDropdownSort && (
                <div className="absolute bottom-0 translate-y-full! right-0 w-full lg:w-[20%] bg-white shadow-lg p-[20px]! flex flex-col  z-10">
                  <div
                    className="flex gap-2 cursor-pointer hover:bg-[#f5f5f5]  p-1!"
                    onClick={() => {
                      setSortBy("createdAt");
                      setSortOrder("desc");
                      setIsDropdownSort(false);
                    }}
                  >
                    <input
                      type="radio"
                      name="sort"
                      id=""
                      className="w-[20px]! accent-[#74869b]"
                    />
                    <span className="text-[15px]  text-[#74869b]">
                      Mới nhất
                    </span>
                  </div>
                  <div
                    className="flex gap-1.5 cursor-pointer hover:bg-[#f5f5f5]  p-1!"
                    onClick={() => {
                      setSortBy("finalPrice");
                      setSortOrder("asc");
                      setIsDropdownSort(false);
                    }}
                  >
                    <input
                      type="radio"
                      name="sort"
                      id=""
                      className="w-[20px]! accent-[#74869b]"
                    />
                    <span className="text-[15px]  text-[#74869b]">
                      Giá: thấp đến cao
                    </span>
                  </div>
                  <div
                    className="flex gap-1.5 cursor-pointer hover:bg-[#f5f5f5]  p-1!"
                    onClick={() => {
                      setSortBy("finalPrice");
                      setSortOrder("desc");
                      setIsDropdownSort(false);
                    }}
                  >
                    <input
                      type="radio"
                      name="sort"
                      id=""
                      className="w-[20px]! accent-[#74869b]"
                    />
                    <span className="text-[15px]  text-[#74869b]">
                      Giá: cao đến thấp
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full">
              <Spin spinning={loading}>
                <ProductListByFillter products={products} />
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductFemale;
