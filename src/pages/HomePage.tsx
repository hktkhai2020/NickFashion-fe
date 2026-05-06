import React, { useState } from "react";
import useCoupon from "@/hooks/useCoupon";
import { formatDate } from "@/utils/format";
import useProduct from "@/hooks/useProduct";
import { useWindowSize } from "@/hooks/useWindowSize";
import { ArrowRightOutlined } from "@ant-design/icons";
import CardProductList from "@/components/home/CardProductList";
import { QRCode } from "antd";
const HomePage: React.FC = () => {
  const { coupons } = useCoupon();
  const [activeTab, setActiveTab] = useState<
    "woman" | "all" | "man" | "girl" | "boy" | "unisex" | undefined
  >("all");
  const { products } = useProduct({ gender: activeTab });
  const { products: productsDiscounted } = useProduct({ discounted: true });

  const { width } = useWindowSize();

  return (
    <>
      <div className="home-container w-full">
        {/* special offer */}
        <div className="w-full lg:py-10! lg:px-[10rem]! pt-[32px]! pl-[32px]! ">
          <h2 className="lg:text-[36px] text-[24px] text-[#333f48] font-bold text-start">
            ƯU ĐÃI NỔI BẬT
          </h2>
          <div className="w-full flex flex-col gap-[32px]! mt-[16px]! lg:flex-row ">
            {coupons.map((coupon) => (
              <div
                className="card w-[400px]!  bg-[#f4f6f9] flex flex-col p-[16px]!  gap-[8px]!
             rounded-[4px]! border border-solid border-[#adbccd]!
            "
              >
                <div className="text-[#333f48] text-[20px] font-[700] leading-[25px] ">
                  {" "}
                  {coupon.name}
                </div>
                <div className="text-[#333f48] text-[12px] leading-[20px] ">
                  {coupon.description}
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-[#333f48] text-[12px] ">
                      HSD: {coupon.endDate ? formatDate(coupon.endDate) : "N/A"}
                    </span>
                    <span className="text-[#333f48] text-[12px] font-bold  ">
                      Điều kiện từ {coupon.minOrderAmount}
                    </span>
                  </div>
                  <div className="w-[80px]  bg-[#333f48] flex justify-center items-center cursor-pointer hover:bg-green-700 transition-all duration-300">
                    <span className="text-white text-[14px] font-bold">
                      Dùng mã
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* new products */}
        <div className="w-full lg:py-10! lg:px-[10rem]! pt-[32px]! pl-[32px]! ">
          <h2 className="lg:text-[36px] text-[20px] text-[#333f48] font-bold text-start">
            SẢN PHẨM MỚI
          </h2>
          <div className="w-full flex  lg:gap-[32px]! gap-[6px]! mt-[16px]! lg:flex-row items-center">
            <div
              className={`cursor-pointer text-[#333f48] font-bold border-[1px]! border-solid! lg:min-w-[100px] min-w-[80px]! py-[10px]! flex justify-center transition-all duration-300 ${activeTab === "all" ? "text-white bg-[#333f48]" : "hover:bg-[#ebeff1]"} `}
              onClick={() => setActiveTab("all")}
            >
              TẤT CẢ
            </div>
            <div
              className={`cursor-pointer text-[#333f48] font-bold border-[1px]! border-solid! lg:min-w-[100px] min-w-[80px]! py-[10px]! flex justify-center transition-all duration-300 ${activeTab === "woman" ? "text-white bg-[#333f48]" : "hover:bg-[#ebeff1]"}`}
              onClick={() => setActiveTab("woman")}
            >
              NỮ
            </div>
            <div
              className={`cursor-pointer text-[#333f48] font-bold border-[1px]! border-solid! lg:min-w-[100px] min-w-[80px]! py-[10px]! flex justify-center transition-all duration-300 ${activeTab === "man" ? "text-white bg-[#333f48]" : "hover:bg-[#ebeff1]"} `}
              onClick={() => setActiveTab("man")}
            >
              NAM
            </div>
            <div
              className={`cursor-pointer text-[#333f48] font-bold border-[1px]! border-solid! lg:min-w-[100px] min-w-[80px]! py-[10px]! flex justify-center transition-all duration-300 ${activeTab === "girl" ? "text-white bg-[#333f48]" : "hover:bg-[#ebeff1]"}`}
              onClick={() => setActiveTab("girl")}
            >
              BÉ GÁI
            </div>
            <div
              className={`cursor-pointer text-[#333f48] font-bold border-[1px]! border-solid! lg:min-w-[100px] min-w-[80px]! py-[10px]! flex justify-center transition-all duration-300 ${activeTab === "boy" ? "text-white bg-[#333f48]" : "hover:bg-[#ebeff1]"}`}
              onClick={() => setActiveTab("boy")}
            >
              BÉ TRAI
            </div>

            <div className="flex cursor-pointer  lg:ml-auto! lg:block  hidden">
              <span className="text-[#333f48] font-bold">XEM THÊM</span>
              <ArrowRightOutlined
                style={{
                  fontSize: "20px",
                  color: "#333f48",
                  lineHeight: "24px",
                  marginLeft: "10px",
                }}
              />{" "}
            </div>
          </div>
          <CardProductList products={products} />
        </div>

        {/* promotion banner */}
        <div className="w-full lg:py-10! relative ">
          {width > 1024 ? (
            <img
              src={
                "https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/homepage_collection_desktop-140426.webp"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={
                "https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/homepage_collection_mobile-140426.webp"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          )}

          <div className="  absolute top-[58%] left-[10%] z-10 text-[white] flex flex-col gap-[22px] ">
            <div className=" text-[36px] font-bold ">HOMEWEAR</div>
            <div className=" lg:max-w-[500px] text-[16px] ">
              Bộ sưu tập đồ mặc nhà với những thiết kế độc đáo, giúp bạn thoải
              mái thể hiện phong cách riêng, tự tin thể hiện dấu ấn cá nhân
              trong mỗi khoảnh khắc.
            </div>
          </div>
        </div>
        <div className="w-full lg:py-10! lg:px-[10rem]! pt-[32px]! pl-[32px]! lg:mt-[-10rem]! ">
          <CardProductList products={productsDiscounted} />
        </div>

        {/* promotion brand  */}
        <div className="w-full lg:py-10! flex flex-col lg:flex-row gap-[5px]! ">
          <div className="w-full lg:w-1/3 relative overflow-hidden group">
            <img
              src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/doraemon_bst_homepage-140426.webp"
              alt=""
              className="w-full object-cover group-hover:scale-125 transition-all duration-300 "
            />
            <div className="absolute bottom-10 left-[50%] translate-x-[-50%] text-white flex flex-col items-start w-[90%] lg:w-max">
              <div className="lg:text-[34px] text-[24px] font-bold ">
                DORAEMON
              </div>
              <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out w-full">
                <div className="overflow-hidden flex flex-col items-start gap-[22px] opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-[14px] font-[500] lg:w-[480px] pt-4 whitespace-normal">
                    Cùng Doraemon mang tuổi thơ trở lại – diện ngay những thiết
                    kế dễ thương, năng động và tràn đầy năng lượng tích cực cho
                    mùa đông thêm vui!
                  </div>
                  <div className="rounded-sm text-[16px] font-[500] bg-white text-[#333f48] px-[2rem]! py-[8px]! cursor-pointer">
                    Xem thêm <ArrowRightOutlined />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 relative overflow-hidden group">
            <img
              src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/canifas_bst_homepage-140426.webp"
              alt=""
              className="w-full object-cover group-hover:scale-125 transition-all duration-300 "
            />
            <div className="absolute bottom-10 left-[50%] translate-x-[-50%] text-white flex flex-col items-start w-[90%] lg:w-max">
              <div className="lg:text-[34px] text-[24px] font-bold ">
                NICKFASHION - TỰ HÀO VIỆT NAM
              </div>
              <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out w-full">
                <div className="overflow-hidden flex flex-col items-start gap-[22px] opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-[14px] font-[500] lg:w-[480px] pt-4 whitespace-normal">
                    Nịck Fashion tự hào là thương hiệu thời trang Việt Nam, mang
                    đến những sản phẩm chất lượng cao với giá cả phải chăng.
                  </div>
                  <div className="rounded-sm text-[16px] font-[500] bg-white text-[#333f48] px-[2rem]! py-[8px]! cursor-pointer">
                    Xem thêm <ArrowRightOutlined />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 relative overflow-hidden group">
            <img
              src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/disney_bst_homepage-140426.webp"
              alt=""
              className="w-full object-cover group-hover:scale-125 transition-all duration-300 "
            />
            <div className="absolute bottom-10 left-[50%] translate-x-[-50%] text-white flex flex-col items-start w-[90%] lg:w-max">
              <div className="lg:text-[34px] text-[24px] font-bold ">
                DISNEY
              </div>
              <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out w-full">
                <div className="overflow-hidden flex flex-col items-start gap-[22px] opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-[14px] font-[500] lg:w-[480px] pt-4 whitespace-normal">
                    Khám phá thế giới diệu kỳ của Disney cùng BST mới tại Nick
                    Fashion! Với những nhân vật quen thuộc và thiết kế đáng yêu,
                    bạn sẽ tìm thấy phong cách độc đáo cho riêng mình.
                  </div>
                  <div className="rounded-sm text-[16px] font-[500] bg-white text-[#333f48] px-[2rem]! py-[8px]! cursor-pointer">
                    Xem thêm <ArrowRightOutlined />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="w-full flex flex-col lg:flex-row mt-[10px]!">
          <div className="w-full lg:w-1/2">
            <img
              src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/Gemini_Generated_Image_ihs5usihs5usihs5.png"
              alt=""
              className="w-full h-full object-cover group-hover:scale-125 transition-all duration-300"
            />
          </div>
          <div className="w-full lg:w-1/2 bg-[#333f48] relative p-8 lg:p-0">
            <div className="relative lg:absolute lg:bottom-20 max-w-[480px] flex flex-col gap-[20px] lg:gap-[26px] lg:mb-[60px] lg:pl-[40px]! px-[20px]! py-[50px]! ">
              <div className="text-[24px] lg:text-[36px] font-bold text-white">
                NICKFASHION - MUA SẮM THỜI TRANG TRỰC TUYẾN
              </div>
              <div className="text-[14px] font-[500] text-white">
                Tính năng mua sắm mới trên website NickFashion sẽ hỗ trợ khách
                hàng có những trải nghiệm tốt hơn khi mua sắm online.
              </div>
              <div className="bg-white w-min rounded-sm flex flex-col items-center justify-center p-2">
                <QRCode value="https://www.nickfashion.vn/" />
                <div className="text-[14px] font-bold text-[#333f48] whitespace-nowrap">
                  TRUY CẬP NGAY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
