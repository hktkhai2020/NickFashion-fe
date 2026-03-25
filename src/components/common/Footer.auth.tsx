import "styles/auth/footerAuth.scss";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
const FooterAuth = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className=" containers">
      <motion.div
        className="footer-auth"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="info-address !flex !flex-col  !justify-center !gap-[0.5rem] !max-w-[500px]">
          <div className="">
            <h2 className="nickFashion !font-bold bg-gradient-to-r from-[black] to-[#d49f50] text-transparent bg-clip-text">
              {i18n.language == "vi"
                ? "CÔNG TY CỔ PHẦN NICKFASHION"
                : "NICKFASHION JOINT STOCK COMPANY"}
            </h2>
          </div>
          <div className=" ">
            {i18n.language == "vi"
              ? "Số ĐKKD:12345678, ngày cấp: 23/09/2013 Nơi cấp: Sở Kế hoạch và đầu tư Hà Nội"
              : "Business Registration Number: 12345678, Date of Issue: September 23, 2013, Issuing Authority: Hanoi Department of Planning and Investment"}
          </div>

          <div className="info-address-description">
            <p className="">{t("login.footer-description")}</p>
          </div>
          <div className="firm-address">
            <p>{t("login.address")}</p>
          </div>
        </div>
        <div className="service-deliver ">
          <div className="">
            <h2 className="!font-bold">
              {i18n.language == "vi"
                ? "DỊCH VỤ KHÁCH HÀNG"
                : "SERVICE CUSTOMER"}
            </h2>
          </div>
          <span className="">
            {i18n.language == "vi"
              ? "Giao hàng & Trả hàng"
              : "Shipping & Returns"}
          </span>
          <span className="">
            {i18n.language == "vi" ? "Theo dõi đơn hàng" : "Track your order"}
          </span>
          <span className="">
            {i18n.language == "vi"
              ? "Bảo hành & Sữa chữa"
              : "Warranty & Repair"}
          </span>
          <span>FAQs</span>
        </div>
        <div className="policy">
          <div className="">
            <h2 className="!font-bold">
              {i18n.language == "vi" ? "CHÍNH SÁCH" : "POLICY"}
            </h2>
          </div>
          <span className="">
            {i18n.language ? "Chính sách bảo mật" : "Privacy Policy"}
          </span>
          <span className="">
            {i18n.language ? "Điều khoản sử dụng" : "Terms of Use"}
          </span>
          <span className="">
            {i18n.language
              ? "Chính sách đổi trả"
              : "Return and exchange policy"}
          </span>
        </div>
        <div className="network">
          <div className="">
            <h2 className="!font-bold">
              {i18n.language == "vi" ? "KẾT NỐI VỚI CHÚNG TÔI" : "NETWORK"}
            </h2>
          </div>

          <a className="" href="">
            <FacebookOutlined /> Facebook
          </a>
          <a className="" href="">
            <TwitterOutlined /> Twitter
          </a>
          <a className="" href="">
            <InstagramOutlined /> Instagram
          </a>
        </div>
        <div className=""></div>
      </motion.div>
    </div>
  );
};

export default FooterAuth;
