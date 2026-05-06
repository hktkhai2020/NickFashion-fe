import useFilter from "@/hooks/useFilter";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ColorPicker, Input, Button } from "antd";

const Filter = ({
  categoryId,
  gender,
  sizes,
  colors,
  priceMin,
  priceMax,
  discountMin,
  discountMax,
  setSizes,
  setColors,
  setPriceMin,
  setPriceMax,
  setDiscountMin,
  setDiscountMax,
}: {
  categoryId: string[];
  gender: string;
  sizes: string[];
  colors: string[];
  priceMin: number;
  priceMax: number;
  discountMin: number;
  discountMax: number;
  setSizes: (sizes: string[]) => void;
  setColors: (colors: string[]) => void;
  setPriceMin: (priceMin: number) => void;
  setPriceMax: (priceMax: number) => void;
  setDiscountMin: (discountMin: number) => void;
  setDiscountMax: (discountMax: number) => void;
}) => {
  const { colorsByCategory, sizesbyCategory } = useFilter(categoryId);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [showCategory, setShowCategory] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [tempPriceMin, setTempPriceMin] = useState<number | "">(priceMin || "");
  const [tempPriceMax, setTempPriceMax] = useState<number | "">(priceMax || "");
  const [tempDiscountMin, setTempDiscountMin] = useState<number | "">(
    discountMin || ""
  );
  const [tempDiscountMax, setTempDiscountMax] = useState<number | "">(
    discountMax || ""
  );

  const priceRanges = [
    { label: "Dưới 200.000đ", min: 0, max: 200000 },
    { label: "200.000đ - 500.000đ", min: 200000, max: 500000 },
    { label: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
    { label: "Trên 1.000.000đ", min: 1000000, max: 0 },
  ];

  const discountRanges = [
    { label: "10% - 30%", min: 10, max: 30 },
    { label: "30% - 50%", min: 30, max: 50 },
    { label: "Trên 50%", min: 50, max: 0 },
  ];

  return (
    <div className="w-full flex flex-col gap-5 ">
      {/*Danh mục sản phẩm*/}
      <div className="w-full relative border-b-[#e3e3e3] border-b border-solid  mb-2! pb-2!">
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-[#f2f2f2] p-2!"
          onClick={() => setShowCategory(!showCategory)}
        >
          <div className="font-[700] text-[15px] text-[#333f48]">
            Danh mục sản phẩm
          </div>
          <div>{showCategory ? <MinusOutlined /> : <PlusOutlined />}</div>
        </div>
        <div
          className={`flex flex-col gap-4 mt-6! ${showCategory ? "block" : "hidden"}`}
        >
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "ao-phong-ao-thun" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/ao-phong-ao-thun`);
            }}
          >
            Áo phông / Áo thun
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "ao-polo" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/ao-polo`);
            }}
          >
            Áo polo
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "ao-so-mi" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/ao-so-mi`);
            }}
          >
            Áo sơ mi & Áo kiểu
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "quan-ao-the-thao" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/quan-ao-the-thao`);
            }}
          >
            Quần áo thể thao
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "quan-shorts" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/quan-shorts`);
            }}
          >
            Quần short
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "quan-dai-and-quan-jeans" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/quan-dai-and-quan-jeans`);
            }}
          >
            Quần dài & Quần Jeans
          </div>
          {(gender === "nu" || gender === "be-gai") && (
            <div
              className="text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707]"
              onClick={() => {
                setSizes([]);
                setColors([]);
                setPriceMin(0);
                setPriceMax(0);
                setDiscountMin(0);
                setDiscountMax(0);
                navigate(`/nickfashion/${gender}/vay`);
              }}
            >
              Váy
            </div>
          )}
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "bo-quan-ao" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/bo-quan-ao`);
            }}
          >
            Bộ quần áo
          </div>

          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "do-mac-nha-and-do-ngu" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/do-mac-nha-and-do-ngu`);
            }}
          >
            Đồ mặc nhà & Đồ ngủ
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "ao-len" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/ao-len`);
            }}
          >
            Áo len
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "ao-ni-and-quan-ni" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/ao-ni-and-quan-ni`);
            }}
          >
            Áo nỉ & Quần nỉ
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "ao-khoac-and-giu-nhiet" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/ao-khoac-and-giu-nhiet`);
            }}
          >
            Áo khoác & Giữ nhiệt
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "do-lot" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/do-lot`);
            }}
          >
            Đồ lót
          </div>
          <div
            className={`text-[15px] text-[#333f48] cursor-pointer hover:text-[#d80707] ${pathname.split("/").pop() === "tat-vo" ? "text-[#d80707]" : ""}`}
            onClick={() => {
              setSizes([]);
              setColors([]);
              setPriceMin(0);
              setPriceMax(0);
              setDiscountMin(0);
              setDiscountMax(0);
              navigate(`/nickfashion/${gender}/tat-vo`);
            }}
          >
            Tất / vớ
          </div>
        </div>
      </div>
      {/*Kích cỡ*/}
      <div className="w-full relative border-b-[#e3e3e3] border-b border-solid  mb-2! pb-2!">
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-[#f2f2f2] p-2!"
          onClick={() => setShowSize(!showSize)}
        >
          <div className="font-[700] text-[15px] text-[#333f48]">Kích cỡ</div>
          <div>{showSize ? <MinusOutlined /> : <PlusOutlined />}</div>
        </div>

        <div
          className={`flex  gap-2  mt-6! ${showSize ? "flex-wrap" : "hidden"}`}
        >
          {sizesbyCategory.map((item) => {
            return (
              <div
                key={item._id}
                className={`py-[12px]! px-[17px]! font-[500]  border border-[#e5eaf0] flex justify-center items-center text-[14px] cursor-pointer hover:bg-[#3f3b3b] hover:text-[#ffffff] ${sizes.includes(item._id) ? "bg-[#3f3b3b] text-[#ffffff]" : ""}`}
                onClick={() => {
                  if (sizes.includes(item._id)) {
                    setSizes(sizes.filter((id) => id !== item._id));
                  } else {
                    setSizes([...sizes, item._id]);
                  }
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      {/*Màu sắc*/}
      <div className="w-full relative border-b-[#e3e3e3] border-b border-solid  mb-2! pb-2!">
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-[#f2f2f2] p-2!"
          onClick={() => setShowColor(!showColor)}
        >
          <div className="font-[700] text-[15px] text-[#333f48]">Màu sắc</div>
          <div>{showColor ? <MinusOutlined /> : <PlusOutlined />}</div>
        </div>

        <div
          className={`flex  gap-2  mt-6! ${showColor ? "flex-wrap" : "hidden"}`}
        >
          {colorsByCategory.map((item) => {
            return (
              <div
                key={item._id}
                className={`py-[8px]! px-[12px]! font-[500]  border border-[#e5eaf0] rounded-full! flex gap-2 justify-center items-center text-[14px] cursor-pointer hover:bg-[#3f3b3b] hover:text-[#ffffff] transition-all ${colors.includes(item._id) ? "bg-[#3f3b3b] text-[#ffffff]" : ""}`}
                onClick={() => {
                  if (colors.includes(item._id)) {
                    setColors(colors.filter((id) => id !== item._id));
                  } else {
                    setColors([...colors, item._id]);
                  }
                }}
              >
                <ColorPicker
                  value={item.hexCode || "#000000"}
                  open={false}
                  className="pointer-events-none [&_.ant-color-picker-color-block]:rounded-full!"
                  size="small"
                />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/*Khoảng giá*/}
      <div className="w-full relative border-b-[#e3e3e3] border-b border-solid  mb-2! pb-2!">
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-[#f2f2f2] p-2!"
          onClick={() => setShowPrice(!showPrice)}
        >
          <div className="font-[700] text-[15px] text-[#333f48]">
            Khoảng giá
          </div>
          <div>{showPrice ? <MinusOutlined /> : <PlusOutlined />}</div>
        </div>

        <div
          className={`flex flex-col gap-4 mt-6! ${showPrice ? "block" : "hidden"}`}
        >
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Từ"
                type="number"
                value={tempPriceMin}
                onChange={(e) =>
                  setTempPriceMin(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full h-[45px]! border-[#e5eaf0]! focus:border-[#333f48]! hover:border-[#333f48]! rounded-none! pr-6!"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#74869b]">
                đ
              </span>
            </div>
            <span className="text-[#333f48]">-</span>
            <div className="relative flex-1">
              <Input
                placeholder="Đến"
                type="number"
                value={tempPriceMax}
                onChange={(e) =>
                  setTempPriceMax(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full h-[45px]! border-[#e5eaf0]! focus:border-[#333f48]! hover:border-[#333f48]! rounded-none! pr-6!"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#74869b]">
                đ
              </span>
            </div>
          </div>
          <Button
            className="w-full h-[45px]! bg-[#333f48]! text-white! border-none! font-bold hover:bg-[#d80707]! transition-all rounded-none!"
            onClick={() => {
              setPriceMin(Number(tempPriceMin) || 0);
              setPriceMax(Number(tempPriceMax) || 0);
            }}
          >
            ÁP DỤNG
          </Button>

          <div className="flex flex-col gap-3 mt-2">
            {priceRanges.map((range, index) => (
              <div
                key={index}
                className={`text-[14px] text-[#333f48] cursor-pointer hover:text-[#d80707] flex items-center gap-3 transition-colors ${
                  priceMin === range.min && priceMax === range.max
                    ? "text-[#d80707] font-semibold"
                    : ""
                }`}
                onClick={() => {
                  setPriceMin(range.min);
                  setPriceMax(range.max);
                  setTempPriceMin(range.min || "");
                  setTempPriceMax(range.max || "");
                }}
              >
                <div
                  className={`w-4 h-4 border border-[#333f48] rounded-full flex items-center justify-center transition-all ${
                    priceMin === range.min && priceMax === range.max
                      ? "border-[#d80707] bg-[#d80707]"
                      : "group-hover:border-[#d80707]"
                  }`}
                >
                  {priceMin === range.min && priceMax === range.max && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>
                {range.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*Phần trăm giảm giá*/}
      <div className="w-full relative border-b-[#e3e3e3] border-b border-solid  mb-2! pb-2!">
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-[#f2f2f2] p-2!"
          onClick={() => setShowDiscount(!showDiscount)}
        >
          <div className="font-[700] text-[15px] text-[#333f48]">
            Phần trăm giảm giá
          </div>
          <div>{showDiscount ? <MinusOutlined /> : <PlusOutlined />}</div>
        </div>

        <div
          className={`flex flex-col gap-4 mt-6! ${showDiscount ? "block" : "hidden"}`}
        >
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Từ"
                type="number"
                value={tempDiscountMin}
                onChange={(e) =>
                  setTempDiscountMin(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                className="w-full h-[45px]! border-[#e5eaf0]! focus:border-[#333f48]! hover:border-[#333f48]! rounded-none! pr-6!"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#74869b]">
                %
              </span>
            </div>
            <span className="text-[#333f48]">-</span>
            <div className="relative flex-1">
              <Input
                placeholder="Đến"
                type="number"
                value={tempDiscountMax}
                onChange={(e) =>
                  setTempDiscountMax(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                className="w-full h-[45px]! border-[#e5eaf0]! focus:border-[#333f48]! hover:border-[#333f48]! rounded-none! pr-6!"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#74869b]">
                %
              </span>
            </div>
          </div>
          <Button
            className="w-full h-[45px]! bg-[#333f48]! text-white! border-none! font-bold hover:bg-[#d80707]! transition-all rounded-none!"
            onClick={() => {
              setDiscountMin(Number(tempDiscountMin) || 0);
              setDiscountMax(Number(tempDiscountMax) || 0);
            }}
          >
            ÁP DỤNG
          </Button>

          <div className="flex flex-col gap-3 mt-2">
            {discountRanges.map((range, index) => (
              <div
                key={index}
                className={`text-[14px] text-[#333f48] cursor-pointer hover:text-[#d80707] flex items-center gap-3 transition-colors ${
                  discountMin === range.min && discountMax === range.max
                    ? "text-[#d80707] font-semibold"
                    : ""
                }`}
                onClick={() => {
                  setDiscountMin(range.min);
                  setDiscountMax(range.max);
                  setTempDiscountMin(range.min || "");
                  setTempDiscountMax(range.max || "");
                }}
              >
                <div
                  className={`w-4 h-4 border border-[#333f48] rounded-full flex items-center justify-center transition-all ${
                    discountMin === range.min && discountMax === range.max
                      ? "border-[#d80707] bg-[#d80707]"
                      : ""
                  }`}
                >
                  {discountMin === range.min && discountMax === range.max && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>
                {range.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
