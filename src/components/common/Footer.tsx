import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { ROUTES } from "@/constants";

const infoLink = (section: string) => `${ROUTES.INFORMATION}?section=${section}`;
export const Footer: React.FC = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <footer className="w-full font-['Montserrat',sans-serif] text-[#333f48]">
      {/* Subscribe & Store block */}
      <div className="w-full bg-[#ffffff] border-t border-[#e5eaf0]">
        <div className="w-full  flex flex-col lg:flex-row ">
          {/* Store locator */}
          <div className="lg:w-1/2 flex flex-row items-center justify-between! lg:justify-start lg:gap-[30px] px-[30px]! py-[40px]!  lg:px-[100px] lg:py-[20px] lg:border-r border-[#e5eaf0] border-b lg:border-b-0 ">
            <div className="flex items-center gap-[16px] lg:gap-[20px]">
              <div className="w-[48px] h-[48px] shrink-0">
                <svg
                  width="48"
                  height="49"
                  viewBox="0 0 48 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12.9C6 10.6598 6 9.53968 6.43597 8.68404C6.81947 7.93139 7.43139 7.31947 8.18404 6.93597C9.03968 6.5 10.1598 6.5 12.4 6.5H35.6C37.8402 6.5 38.9603 6.5 39.816 6.93597C40.5686 7.31947 41.1805 7.93139 41.564 8.68404C42 9.53968 42 10.6598 42 12.9V36.1C42 38.3402 42 39.4603 41.564 40.316C41.1805 41.0686 40.5686 41.6805 39.816 42.064C38.9603 42.5 37.8402 42.5 35.6 42.5H12.4C10.1598 42.5 9.03968 42.5 8.18404 42.064C7.43139 41.6805 6.81947 41.0686 6.43597 40.316C6 39.4603 6 38.3402 6 36.1V12.9Z"
                    fill="white"
                  ></path>
                  <path
                    d="M30 42.5V31.7C30 30.5799 30 30.0198 29.782 29.592C29.5903 29.2157 29.2843 28.9097 28.908 28.718C28.4802 28.5 27.9201 28.5 26.8 28.5H21.2C20.0799 28.5 19.5198 28.5 19.092 28.718C18.7157 28.9097 18.4097 29.2157 18.218 29.592C18 30.0198 18 30.5799 18 31.7V42.5M6 14.5C6 17.8137 8.68629 20.5 12 20.5C15.3137 20.5 18 17.8137 18 14.5C18 17.8137 20.6863 20.5 24 20.5C27.3137 20.5 30 17.8137 30 14.5C30 17.8137 32.6863 20.5 36 20.5C39.3137 20.5 42 17.8137 42 14.5M12.4 42.5H35.6C37.8402 42.5 38.9603 42.5 39.816 42.064C40.5686 41.6805 41.1805 41.0686 41.564 40.316C42 39.4603 42 38.3402 42 36.1V12.9C42 10.6598 42 9.53968 41.564 8.68404C41.1805 7.93139 40.5686 7.31947 39.816 6.93597C38.9603 6.5 37.8402 6.5 35.6 6.5H12.4C10.1598 6.5 9.03968 6.5 8.18404 6.93597C7.43139 7.31947 6.81947 7.93139 6.43597 8.68404C6 9.53968 6 10.6598 6 12.9V36.1C6 38.3402 6 39.4603 6.43597 40.316C6.81947 41.0686 7.43139 41.6805 8.18404 42.064C9.03968 42.5 10.1598 42.5 12.4 42.5Z"
                    stroke="#333F48"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[16px] lg:text-[20px] font-[800]">
                  Hệ thống cửa hàng
                </h4>
                <div className="text-[14px]">Tìm kiếm cửa hàng gần bạn!</div>
              </div>
            </div>
            <a
              onClick={() => {
                // navigate(`/store-locator`);
              }}
              className="text-[#2e90fa] text-[14px] font-[700] hover:opacity-80 transition-opacity"
            >
              XEM DANH SÁCH
            </a>
          </div>
          {/* Subscribe */}
          <div className="lg:w-1/2 flex flex-row items-center justify-between! lg:justify-start lg:gap-[30px] px-[30px]! py-[40px]!  lg:px-[100px] lg:py-[20px] lg:border-r border-[#e5eaf0] border-b lg:border-b-0">
            <div className="flex items-center gap-[16px] lg:gap-[20px]">
              <div className="w-[48px] h-[48px] shrink-0">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 14L20.3298 25.4309C21.6522 26.3565 22.3134 26.8193 23.0325 26.9986C23.6678 27.157 24.3322 27.157 24.9675 26.9986C25.6866 26.8193 26.3478 26.3565 27.6702 25.4309L44 14M13.6 40H34.4C37.7603 40 39.4405 40 40.7239 39.346C41.8529 38.7708 42.7708 37.8529 43.346 36.7239C44 35.4405 44 33.7603 44 30.4V17.6C44 14.2397 44 12.5595 43.346 11.2761C42.7708 10.1471 41.8529 9.2292 40.7239 8.65396C39.4405 8 37.7603 8 34.4 8H13.6C10.2397 8 8.55953 8 7.27606 8.65396C6.14708 9.2292 5.2292 10.1471 4.65396 11.2761C4 12.5595 4 14.2397 4 17.6V30.4C4 33.7603 4 35.4405 4.65396 36.7239C5.2292 37.8529 6.14708 38.7708 7.27606 39.346C8.55953 40 10.2397 40 13.6 40Z"
                    stroke="#333F48"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[16px] lg:text-[20px] font-[800]">
                  Đăng ký nhận bản tin
                </h4>
                <div className="text-[14px] hidden lg:block">
                  Cập nhật những thông tin mới nhất về ưu đãi,
                  <br />
                  thời trang và phong cách sống.
                </div>
              </div>
            </div>
            <a
              onClick={() => {
                if (user) {
                  navigate(`/customer/account`);
                } else {
                  navigate(`/buyer/login`);
                }
              }}
              className="text-[#2e90fa] text-[14px] font-[700] hover:opacity-80 transition-opacity"
            >
              ĐĂNG KÝ NGAY
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full bg-[#333f48] text-[#ffffff]">
        <div className="w-full mx-auto px-[16px] lg:px-[100px] py-[40px] lg:pt-[50px] lg:pb-[30px]">
          <h4 className="text-[32px] font-[800] py-[50px]! lg:pl-[30px]! pl-[16px]!">
            CÔNG TY CỔ PHẦN NICKFASHION
          </h4>

          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[50px] lg:pl-[30px]! pl-[16px]!">
            {/* Address */}
            <div className="flex-[2] text-[14px] font-[400] leading-[21px] space-y-3  ">
              <div>Số ĐKKD: 0107574310, ngày cấp: 23/09/2016</div>
              <p>Nơi cấp: Sở Kế hoạch và đầu tư Hà Nội.</p>
              <p>
                Trụ sở chính: số 688 Đường Quang Trung, <br />
                P. Hà Đông, TP. Hà Nội.
              </p>
              <p>
                Địa chỉ liên hệ: Phòng 301, tầng 3, tòa nhà GP Invest, <br />
                số 170 La Thành, P. Ô Chợ Dừa, TP. Hà Nội.
              </p>
              <div>Điện thoại: 024 - 7303.0222</div>
              <div>Fax: 024 - 6277.6419</div>
              <div>Email: hello@nickfashion.vn</div>
            </div>

            {/* Link groups */}
            <div className="flex-1 ">
              <h4 className="font-[600] text-[14px] mb-[15px] uppercase text-[#adb6c9]">
                Thương hiệu
              </h4>
              <ul className="space-y-3 text-[14px] font-[400] leading-[21px]">
                <li>
                  <Link to={infoLink("gioi-thieu")} className="hover:text-gray-300">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("he-thong-cua-hang")} className="hover:text-gray-300">
                    Hệ thống cửa hàng
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("tin-tuc")} className="hover:text-gray-300">
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("tuyen-dung")} className="hover:text-gray-300">
                    Tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("voi-cong-dong")} className="hover:text-gray-300">
                    Với cộng đồng
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("lien-he")} className="hover:text-gray-300">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-1">
              <h4 className="font-[600] text-[14px] mb-[15px] uppercase text-[#adb6c9]">
                Hỗ trợ
              </h4>
              <ul className="space-y-3 text-[14px] font-[400] leading-[21px]">
                <li>
                  <Link to={infoLink("hoi-dap")} className="hover:text-gray-300">
                    Hỏi đáp
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("dieu-kien-dieu-khoan")} className="hover:text-gray-300">
                    Điều kiện - Điều khoản KHTT
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("chinh-sach-khtt")} className="hover:text-gray-300">
                    Chính sách KHTT
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("chinh-sach-van-chuyen")} className="hover:text-gray-300">
                    Chính sách vận chuyển
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("chinh-sach-bao-mat")} className="hover:text-gray-300">
                    Chính sách bảo mật thông tin KH
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("tra-cuu-don-hang")} className="hover:text-gray-300">
                    Tra cứu đơn hàng
                  </Link>
                </li>
                <li>
                  <Link to={infoLink("bang-kich-co")} className="hover:text-gray-300">
                    Bảng kích cỡ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-1">
              <h4 className="font-[600] text-[14px] mb-[15px] uppercase text-[#adb6c9]">
                Tài khoản
              </h4>
              <ul className="space-y-3 text-[14px] font-[400] leading-[21px] ">
                <li>
                  <Link to="#" className="hover:text-gray-300">
                    Đăng nhập/ Đăng ký
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-300">
                    Mã ưu đãi
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-300">
                    Lịch sử đặt hàng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Payment */}
            <div className="flex flex-col space-y-6 gap-5! ">
              <div>
                <h4 className="font-[600] text-[14px] mb-[15px] uppercase text-[#adb6c9] mb-4!">
                  Theo dõi chúng tôi
                </h4>
                <div className="flex gap-4 text-[24px]">
                  <a
                    href="#"
                    className="hover:text-gray-300 border border-white rounded-full w-[40px] h-[40px] flex items-center justify-center bg-white! "
                  >
                    <FacebookOutlined className=" text-[#333f48]!" />
                  </a>
                  <a
                    href="#"
                    className="hover:text-gray-300 border border-white rounded-full w-[40px] h-[40px] flex items-center justify-center bg-white! "
                  >
                    <InstagramOutlined className=" text-[#333f48]!" />
                  </a>
                  <a
                    href="#"
                    className="hover:text-gray-300 border border-white rounded-full w-[40px] h-[40px] flex items-center justify-center bg-white! "
                  >
                    <YoutubeOutlined className=" text-[#333f48]!" />
                  </a>
                  <a
                    href="#"
                    className="hover:text-gray-300 border border-white rounded-full w-[40px] h-[40px] flex items-center justify-center bg-white! "
                  >
                    <TikTokOutlined className=" text-[#333f48]!" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-[600] text-[14px] mb-[15px] uppercase mb-4!">
                  Phương thức thanh toán
                </h4>
                <picture>
                  <source
                    media="(max-width: 1023px)"
                    srcSet="https://canifa.com/_nuxt/img/footer-pay-mb.a1ab694.webp"
                  />
                  <img
                    src="https://canifa.com/_nuxt/img/footer-pay.0179506.webp"
                    alt="Payment methods"
                    className="h-[40px] lg:h-[60px]"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full bg-[#333f48] border-t border-[rgba(116,134,155,0.3)]">
          <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[100px] py-[12px] flex flex-col lg:flex-row items-center justify-between">
            <div className="text-[12px] font-[600]">
              © {new Date().getFullYear()} NICKFASHION
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <img
                src="https://canifa.com/_nuxt/img/bocongthuong.d5706d7.webp"
                alt="Bo cong thuong"
                className="h-[40px] object-contain"
              />
              <img
                src="https://canifa.com/_nuxt/img/dmca_protected_16_120.3d408b4.webp"
                alt="DMCA"
                className="h-[40px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
