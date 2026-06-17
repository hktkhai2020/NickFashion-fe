import {
  SearchOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Carousel, Input, Badge } from "antd";
import "@/styles/layout/header.scss";
import logoNickFashion from "@/assets/logoNickFashion.svg";
import { useNavigate, useLocation } from "react-router-dom";
import useWindowSize from "@/hooks/useWindowSize";
import React, { useState } from "react";
import useCartStore from "@/store/useCartStore";
import CartDrawer from "@/components/cart/CartDrawer";
import useUserStore from "@/store/useUserStore";
import useGlobal from "@/hooks/useGlobal";
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#333f48",
};

const Header = () => {
  const { api } = useGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const setIsShowCart = useCartStore((state) => state.setIsShowCart);
  const toggleMenu = (menuName: string) => {
    if (width < 1024) {
      setActiveMenu(activeMenu === menuName ? null : menuName);
    }
  };
  return (
    <>
      <div className="header-main w-full flex flex-col relative lg:contents ">
        {/*banner promotion */}
        <div className="header-promotion w-full bg-[#519656] relative lg:sticky lg:top-0 lg:z-20 z-10">
          <p className="text-center text-[25px] font-bold text-[#f3e14a] py-2! hover:cursor-pointer hover:text-[#fae500]">
            GIẢM GIÁ 50% ÁO PHÔNG 1/5 - 1/6
          </p>
        </div>
        {/* info carousel */}
        {location.pathname === "/" && (
          <div className="header-sub w-full bg-[#f4f6f9] hidden lg:block  lg:flex lg:justify-center lg:items-center lg:py-2!">
            <Carousel
              dots={false}
              arrows
              autoplay={true}
              autoplaySpeed={2000}
              className="w-[620px] lg:block hidden"
            >
              <div>
                <h3 style={contentStyle}>BẠN ĐƯỢC VẬN CHUYỂN MIỄN PHÍ</h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  ĐỔI HÀNG MIỄN PHÍ - TẠI TẤT CẢ CỬA HÀNG TRONG 30 NGÀY
                </h3>
              </div>
            </Carousel>
          </div>
        )}
        {/* header app */}
        <div className="header-app w-full flex justify-between items-center px-[5rem]!   lg:py-0! py-4! ">
          <div
            className="logo flex items-center cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={logoNickFashion}
              alt="NickFashion"
              className="w-[100px] lg:block hidden"
            />
            <span className="text-[20px] font-bold text-red-500 lg:mt-0!  mt-auto! ">
              NickFashion
            </span>
          </div>
          <div className="menu flex gap-[30px]!">
            <div className="search lg:w-[350px] hidden lg:block">
              <Input
                placeholder="Tìm kiếm"
                prefix={<SearchOutlined style={{ color: "#4d575f" }} />}
                className=" !outline-none text-[#4d575f] py-[0.7rem]!  pl-[20px]!"
                onPressEnter={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  navigate(`/search?q=${value.trim()}`);
                }}
              />
            </div>
            <div className="search  lg:hidden block">
              <SearchOutlined style={{ color: "#4d575f" }} />
            </div>
            {/* shop */}
            <div
              className="shop cursor-pointer flex flex-col items-center"
              onClick={() => {
                navigate("/nickfashion/asd");
              }}
            >
              <ShopOutlined style={{ fontSize: 25, color: "#4d575f" }} />
              <span className="hidden lg:block  text-center">Cửa hàng</span>
            </div>
            {/* account */}
            <div
              className="account cursor-pointer flex flex-col items-center"
              onClick={() => {
                if (user?._id && user?.role) {
                  navigate("/customer/account");
                } else {
                  navigate("/buyer/login");
                  api.error({
                    message: "Vui lòng đăng nhập",
                    description: "Vui lòng đăng nhập để sử dụng chức năng này",
                  });
                }
              }}
            >
              <UserOutlined style={{ fontSize: 25, color: "#4d575f" }} />
              <span className="hidden   lg:block  text-center">Tài khoản</span>
            </div>
            {/* cart */}
            <div
              className="cart cursor-pointer flex flex-col items-center"
              onClick={() => {
                if (user?._id && user?.role) {
                  setIsShowCart(true);
                } else {
                  navigate("/buyer/login");
                  api.error({
                    message: "Vui lòng đăng nhập",
                    description: "Vui lòng đăng nhập để sử dụng chức năng này",
                  });
                }
              }}
            >
              <Badge count={cart?.itemCount} className="absolute top-0 right-0">
                <ShoppingCartOutlined
                  style={{ fontSize: 25, color: "#4d575f" }}
                />
              </Badge>

              <span className="hidden  lg:block text-center">Giỏ hàng</span>
            </div>
          </div>
        </div>

        {/* menu*/}
        <div className="header-menu w-full bg-[#333f48] flex items-center shadow-sm lg:px-[5rem]! px-[0.5rem]! relative z-2 text-nowrap overflow-x-auto overflow-y-hidden lg:overflow-visible  lg:sticky lg:top-12 [&::-webkit-scrollbar]:hidden">
          <ul className="flex items-center font-semibold text-white text-[13px] h-[45px]">
            <li className=" group h-full flex items-center cursor-pointer">
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center  px-[20px]!">
                DIỆN HÈ ĐA SẮC
              </span>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              onClick={() => toggleMenu("NU")}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                NỮ
              </span>
              {/* Mega Menu Dropdown */}
              <div
                className={`fixed inset-0 lg:absolute lg:inset-auto lg:left-0 lg:top-[45px] w-full h-[100dvh] lg:h-auto overflow-y-auto lg:overflow-visible bg-white shadow-xl transition-all duration-300 z-[100] lg:z-50 text-black border-t border-gray-100 lg:border-t-0 ${activeMenu === "NU" ? "opacity-100 visible" : "opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible"}`}
              >
                {/* Mobile Header with Close Button */}
                <div className="flex lg:hidden items-center justify-between px-[1.5rem] py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <span className="font-bold text-[18px]">NỮ</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu("NU");
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <CloseOutlined className="text-[20px]" />
                  </button>
                </div>
                <div className="w-full flex flex-col lg:flex-row px-[1.5rem]! lg:px-[5rem]! py-6! lg:py-8! gap-[20px] lg:gap-[80px]">
                  {/* Cột 1 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      Danh mục sản phẩm
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/ao-phong-ao-thun`)}
                      >
                        Áo phông / Áo thun
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/ao-polo`)}
                      >
                        Áo polo
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/chong-nang`)}
                      >
                        Áo chống nắng
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/quan-ao-the-thao`)}
                      >
                        Quần áo thể thao
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/quan-shorts`)}
                      >
                        Quần shorts
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/quan-dai-and-quan-jeans`)}
                      >
                        Quần dài & Quần jeans
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/vay`)}
                      >
                        Váy
                      </li>
                    </ul>
                  </div>
                  {/* Cột 2 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      ㅤ
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/bo-quan-ao`)}
                      >
                        Bộ quần áo
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/do-mac-nha-and-do-ngu`)}
                      >
                        Đồ mặc nhà đồ ngủ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/ao-len`)}
                      >
                        Áo len
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/ao-ni-and-quan-ni`)}
                      >
                        Áo nỉ & Quần nỉ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/ao-khoac-and-giu-nhiet`)}
                      >
                        Áo khoác
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/do-lot`)}
                      >
                        Đồ lót
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/tat-vo`)}
                      >
                        Tất / vớ
                      </li>
                    </ul>
                  </div>
                  {/* Cột 3 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      Phụ kiện
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/chan`)}
                      >
                        Chăn
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/khan-mat`)}
                      >
                        Khăn mặt
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/khan-tam`)}
                      >
                        Khăn tắm
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/khan-quang-co`)}
                      >
                        Khăn quàng cổ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/mu`)}
                      >
                        Mũ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/khau-trang`)}
                      >
                        Khẩu trang
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nu/tui-xach`)}
                      >
                        Túi xách
                      </li>
                    </ul>
                  </div>
                  {/* Banner Ảnh */}
                  <div className="flex-1 flex justify-start lg:justify-end gap-3 pb-6 lg:pb-0">
                    <div className="w-[150px] h-[210px] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
                      <img
                        src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/menu/nu_1-030426.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[150px] h-[210px] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
                      <img
                        src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/menu/nu_2-030426.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              onClick={() => toggleMenu("NAM")}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                Nam
              </span>
              <div
                className={`fixed inset-0 lg:absolute lg:inset-auto lg:left-0 lg:top-[45px] w-full h-[100dvh] lg:h-auto overflow-y-auto lg:overflow-visible bg-white shadow-xl transition-all duration-300 z-[100] lg:z-50 text-black border-t border-gray-100 lg:border-t-0 ${activeMenu === "NAM" ? "opacity-100 visible" : "opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible"}`}
              >
                {/* Mobile Header with Close Button */}
                <div className="flex lg:hidden items-center justify-between px-[1.5rem] py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <span className="font-bold text-[18px]">NAM</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu("NAM");
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <CloseOutlined className="text-[20px]" />
                  </button>
                </div>
                <div className="w-full flex flex-col lg:flex-row px-[1.5rem]! lg:px-[5rem]! py-6! lg:py-8! gap-[20px] lg:gap-[80px]">
                  {/* Cột 1 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      Danh mục sản phẩm
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/ao-phong-ao-thun`)}
                      >
                        Áo phông / Áo thun
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/ao-polo`)}
                      >
                        Áo polo
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/chong-nang`)}
                      >
                        Áo chống nắng
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/quan-ao-the-thao`)}
                      >
                        Quần áo thể thao
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/quan-shorts`)}
                      >
                        Quần shorts
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/quan-dai-and-quan-jeans`)}
                      >
                        Quần dài & Quần jeans
                      </li>
                    </ul>
                  </div>
                  {/* Cột 2 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      ㅤ
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/bo-quan-ao`)}
                      >
                        Bộ quần áo
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/do-mac-nha-and-do-ngu`)}
                      >
                        Đồ mặc nhà đồ ngủ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/ao-len`)}
                      >
                        Áo len
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/ao-ni-and-quan-ni`)}
                      >
                        Áo nỉ & Quần nỉ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/ao-khoac-and-giu-nhiet`)}
                      >
                        Áo khoác
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/do-lot`)}
                      >
                        Đồ lót
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/tat-vo`)}
                      >
                        Tất / vớ
                      </li>
                    </ul>
                  </div>
                  {/* Cột 3 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      Phụ kiện
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/chan`)}
                      >
                        Chăn
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/khan-mat`)}
                      >
                        Khăn mặt
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/khan-tam`)}
                      >
                        Khăn tắm
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/khan-quang-co`)}
                      >
                        Khăn quàng cổ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/mu`)}
                      >
                        Mũ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/khau-trang`)}
                      >
                        Khẩu trang
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/nam/tui-xach`)}
                      >
                        Túi xách
                      </li>
                    </ul>
                  </div>
                  {/* Banner Ảnh */}
                  <div className="flex-1 flex justify-start lg:justify-end gap-3 pb-6 lg:pb-0">
                    <div className="w-[150px] h-[210px] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
                      <img
                        src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/menu/nam_2-030426.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[150px] h-[210px] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
                      <img
                        src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/menu/nam_1-030426.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              onClick={() => toggleMenu("BEGAI")}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                Bé gái
              </span>
              <div
                className={`fixed inset-0 lg:absolute lg:inset-auto lg:left-0 lg:top-[45px] w-full h-[100dvh] lg:h-auto overflow-y-auto lg:overflow-visible bg-white shadow-xl transition-all duration-300 z-[100] lg:z-50 text-black border-t border-gray-100 lg:border-t-0 ${activeMenu === "BEGAI" ? "opacity-100 visible" : "opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible"}`}
              >
                {/* Mobile Header with Close Button */}
                <div className="flex lg:hidden items-center justify-between px-[1.5rem] py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <span className="font-bold text-[18px]">BÉ GÁI</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu("BEGAI");
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <CloseOutlined className="text-[20px]" />
                  </button>
                </div>
                <div className="w-full flex flex-col lg:flex-row px-[1.5rem]! lg:px-[5rem]! py-6! lg:py-8! gap-[20px] lg:gap-[80px]">
                  {/* Cột 1 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      Danh mục sản phẩm
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/ao-phong-ao-thun`)}
                      >
                        Áo phông / Áo thun
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/ao-polo`)}
                      >
                        Áo polo
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/chong-nang`)}
                      >
                        Áo chống nắng
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/quan-ao-the-thao`)}
                      >
                        Quần áo thể thao
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/quan-shorts`)}
                      >
                        Quần shorts
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() =>
                          navigate(`/be-gai/quan-dai-and-quan-jeans`)
                        }
                      >
                        Quần dài & Quần jeans
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/vay`)}
                      >
                        Váy
                      </li>
                    </ul>
                  </div>
                  {/* Cột 2 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      ㅤ
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/bo-quan-ao`)}
                      >
                        Bộ quần áo
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() =>
                          navigate(`/be-gai/do-mac-nha-and-do-ngu`)
                        }
                      >
                        Đồ mặc nhà đồ ngủ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/ao-len`)}
                      >
                        Áo len
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/ao-ni-and-quan-ni`)}
                      >
                        Áo nỉ & Quần nỉ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() =>
                          navigate(`/be-gai/ao-khoac-and-giu-nhiet`)
                        }
                      >
                        Áo khoác
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/do-lot`)}
                      >
                        Đồ lót
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/tat-vo`)}
                      >
                        Tất / vớ
                      </li>
                    </ul>
                  </div>
                  {/* Cột 3 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      Phụ kiện
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/chan`)}
                      >
                        Chăn
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/khan-mat`)}
                      >
                        Khăn mặt
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/khan-tam`)}
                      >
                        Khăn tắm
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/khan-quang-co`)}
                      >
                        Khăn quàng cổ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/mu`)}
                      >
                        Mũ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/khau-trang`)}
                      >
                        Khẩu trang
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-gai/tui-xach`)}
                      >
                        Túi xách
                      </li>
                    </ul>
                  </div>
                  {/* Banner Ảnh */}
                  <div className="flex-1 flex justify-start lg:justify-end gap-3 pb-6 lg:pb-0">
                    <div className="w-[150px] h-[210px] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
                      <img
                        src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/menu/girl_1-030426.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[150px] h-[210px] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
                      <img
                        src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/menu/girl_2-030426.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              onClick={() => toggleMenu("BETRAI")}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                BÉ TRAI
              </span>
              <div
                className={`fixed inset-0 lg:absolute lg:inset-auto lg:left-0 lg:top-[45px] w-full h-[100dvh] lg:h-auto overflow-y-auto lg:overflow-visible bg-white shadow-xl transition-all duration-300 z-[100] lg:z-50 text-black border-t border-gray-100 lg:border-t-0 ${activeMenu === "BETRAI" ? "opacity-100 visible" : "opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible"}`}
              >
                {/* Mobile Header with Close Button */}
                <div className="flex lg:hidden items-center justify-between px-[1.5rem] py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <span className="font-bold text-[18px]">BÉ TRAI</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu("BETRAI");
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <CloseOutlined className="text-[20px]" />
                  </button>
                </div>
                <div className="w-full flex flex-col lg:flex-row px-[1.5rem]! lg:px-[5rem]! py-6! lg:py-8! gap-[20px] lg:gap-[80px]">
                  {/* Cột 1 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      Danh mục sản phẩm
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/ao-phong-ao-thun`)}
                      >
                        Áo phông / Áo thun
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/ao-polo`)}
                      >
                        Áo polo
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/chong-nang`)}
                      >
                        Áo chống nắng
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/quan-ao-the-thao`)}
                      >
                        Quần áo thể thao
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/quan-shorts`)}
                      >
                        Quần shorts
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() =>
                          navigate(`/be-trai/quan-dai-and-quan-jeans`)
                        }
                      >
                        Quần dài & Quần jeans
                      </li>
                    </ul>
                  </div>
                  {/* Cột 2 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      ㅤ
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/bo-quan-ao`)}
                      >
                        Bộ quần áo
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() =>
                          navigate(`/be-trai/do-mac-nha-and-do-ngu`)
                        }
                      >
                        Đồ mặc nhà đồ ngủ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/ao-len`)}
                      >
                        Áo len
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/ao-ni-and-quan-ni`)}
                      >
                        Áo nỉ & Quần nỉ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() =>
                          navigate(`/be-trai/ao-khoac-and-giu-nhiet`)
                        }
                      >
                        Áo khoác
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/do-lot`)}
                      >
                        Đồ lót
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/tat-vo`)}
                      >
                        Tất / vớ
                      </li>
                    </ul>
                  </div>
                  {/* Cột 3 */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#333f48] mb-2 text-[14px] uppercase">
                      Phụ kiện
                    </h4>
                    <ul className="flex flex-col gap-3 font-normal text-[#4d575f] text-[14px]">
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/chan`)}
                      >
                        Chăn
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/khan-mat`)}
                      >
                        Khăn mặt
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/khan-tam`)}
                      >
                        Khăn tắm
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/khan-quang-co`)}
                      >
                        Khăn quàng cổ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/mu`)}
                      >
                        Mũ
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/khau-trang`)}
                      >
                        Khẩu trang
                      </li>
                      <li
                        className="hover:text-red-500 hover:translate-x-1 transition-transform"
                        onClick={() => navigate(`/be-trai/tui-xach`)}
                      >
                        Túi xách
                      </li>
                    </ul>
                  </div>
                  {/* Banner Ảnh */}
                  <div className="flex-1 flex justify-start lg:justify-end gap-3 pb-6 lg:pb-0">
                    <div className="w-[150px] h-[210px] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
                      <img
                        src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/menu/boy_2-030426.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[150px] h-[210px] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
                      <img
                        src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/menu/boy_1-030426.webp"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              tabIndex={0}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                SẢN PHẨM MỚI
              </span>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              tabIndex={0}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                NICKFASHION S
              </span>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              tabIndex={0}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                LICENSE
              </span>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              tabIndex={0}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                SCHOOL
              </span>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              tabIndex={0}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                ĐỒNG PHỤC
              </span>
            </li>

            <li
              className="group h-full flex items-center cursor-pointer"
              tabIndex={0}
              onClick={() => navigate("/runawaycollection")}
            >
              <span className="hover:text-[#333f48] hover:bg-white transition-colors uppercase h-full flex items-center px-[20px]!">
                RUNAWAY COLLECTION
              </span>
            </li>
          </ul>
        </div>

        {/* banner carousel */}
        {location.pathname === "/" && (
          <div className="header-banner-carousel w-full">
            <Carousel
              dots={width > 1024 ? true : false}
              arrows
              autoplay={true}
              autoplaySpeed={2000}
              className="w-full"
            >
              <div>
                {width < 1024 ? (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/banner-mobile/dhds_topbanner_desktop-220426.jpg"
                    alt=""
                    className="w-full h-[250px] md:h-[400px] object-fill"
                  />
                ) : (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/dhds_topbanner_desktop-220426.webp"
                    alt=""
                    className="w-full h-[600px] "
                  />
                )}
              </div>
              <div>
                {width < 1024 ? (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/banner-mobile/aophong-desk-210326.jpg"
                    alt=""
                    className="w-full h-[250px] md:h-[400px] object-fill"
                  />
                ) : (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/aophong-desk-210326.webp"
                    alt=""
                    className="w-full h-[600px] "
                  />
                )}
              </div>
              <div>
                {width < 1024 ? (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/banner-mobile/Gemini_Generated_Image_2ug2892ug2892ug2.png"
                    alt=""
                    className="w-full h-[250px] md:h-[400px] object-fill"
                  />
                ) : (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/Gemini_Generated_Image_2ug2892ug2892ug2.png"
                    alt=""
                    className="w-full h-[600px] "
                  />
                )}
              </div>
              <div>
                {width < 1024 ? (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/banner-mobile/Gemini_Generated_Image_74dn9974dn9974dn.png"
                    alt=""
                    className="w-full h-[250px] md:h-[400px] object-fill"
                  />
                ) : (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/Gemini_Generated_Image_74dn9974dn9974dn.png"
                    alt=""
                    className="w-full h-[600px] "
                  />
                )}
              </div>
              <div>
                {width < 1024 ? (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/banner-mobile/new-season_topbanner_desktop-310326a.jpg"
                    alt=""
                    className="w-full h-[250px] md:h-[400px] object-fill"
                  />
                ) : (
                  <img
                    src="https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/products/banner/new-season_topbanner_desktop-310326a.webp"
                    alt=""
                    className="w-full h-[600px] "
                  />
                )}
              </div>
            </Carousel>
          </div>
        )}
      </div>
      '
      <CartDrawer />
    </>
  );
};

export default Header;
