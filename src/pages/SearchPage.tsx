import { Spin, Typography } from "antd";
const { Title } = Typography;
import { useLocation } from "react-router-dom";
import useSearchProduct from "@/hooks/useSearchProduct";
import ProductListByFillter from "@/components/product/ProductListByFillter";
import { useState } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
const SearchPage = () => {
  const [isDropdownSort, setIsDropdownSort] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const { products, loading } = useSearchProduct(
    query || "",
    sortBy,
    sortOrder,
  );

  return (
    <div style={{ padding: "24px" }}>
      <div>
        <Title level={2}>Danh sách sản phẩm tìm kiếm "{query}"</Title>
      </div>
      <div className="flex justify-end relative mb-[24px]!">
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
          <div className="text-[15px] text-[#333f48] font-[500]">Sắp xếp</div>
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
              <span className="text-[15px]  text-[#74869b]">Mới nhất</span>
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
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin className="text-[24px]" size="large" spinning fullscreen />
          </div>
        ) : (
          <ProductListByFillter products={products} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
