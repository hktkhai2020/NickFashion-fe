import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HeaderAdmin, FooterAdmin } from "@/components/common";
import "@/styles/admin/adminPage.scss";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DollarCircleOutlined,
  LineChartOutlined,
  RiseOutlined,
  StockOutlined,
  AppstoreAddOutlined,
  ShoppingOutlined,
  ShopOutlined,
  TagOutlined,
  SnippetsOutlined,
  ScissorOutlined,
  BgColorsOutlined,
  SkinOutlined,
  SwitcherOutlined,
  PhoneOutlined,
  ContainerOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import logo from "@/assets/logoNickFashion.svg";
import { motion } from "framer-motion";

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    if (location.pathname === "/admin/dashboard") {
      setActiveMenu("dashboard");
      setOpenKeys(["statistical"]);
    }
    if (location.pathname === "/admin/statistical") {
      setActiveMenu("sellData");
      setOpenKeys(["statistical"]);
    }
    if (location.pathname === "/admin/import-goods") {
      setActiveMenu("importData");
      setOpenKeys(["statistical"]);
    }

    if (location.pathname === "/admin/products") {
      setActiveMenu("product");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/categories") {
      setActiveMenu("category");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/supplier") {
      setActiveMenu("supplier");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/brand") {
      setActiveMenu("brand");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/size") {
      setActiveMenu("size");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/color") {
      setActiveMenu("color");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/variants") {
      setActiveMenu("variant");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/coupon") {
      setActiveMenu("coupon");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/blog") {
      setActiveMenu("blog");
      setOpenKeys(["manager"]);
    }
    if (location.pathname === "/admin/chat") {
      setActiveMenu("chat");
      setOpenKeys(["manager"]);
    }

    if (location.pathname === "/admin/sell-invoice") {
      setActiveMenu("sellInvoice");
      setOpenKeys(["invoice"]);
    }
    if (location.pathname === "/admin/goods-receipt") {
      setActiveMenu("goodsReceipt");
      setOpenKeys(["invoice"]);
    }
  }, [location.pathname]);

  const items: MenuProps["items"] = [
    {
      label: <h2 className="text-xl ">Thống kê</h2>,
      key: "statistical",
      children: [
        {
          label: <Link to="/admin/dashboard">Tổng quan</Link>,
          key: "dashboard",
          icon: <LineChartOutlined />,
        },
        {
          label: <Link to="/admin/statistical">Bán hàng</Link>,
          key: "sellData",
          icon: <RiseOutlined />,
        },
        {
          label: <Link to="/admin/import-goods">Nhập hàng</Link>,
          key: "importData",
          icon: <StockOutlined />,
        },
      ],
    },
    { type: "divider" },
    {
      label: <h2 className="text-xl ">Quản lý</h2>,
      key: "manager",
      children: [
        {
          label: <Link to="/admin/products">Sản phẩm</Link>,
          key: "product",
          icon: <ShoppingOutlined />,
        },
        {
          label: <Link to="/admin/categories">Loại </Link>,
          key: "category",
          icon: <AppstoreAddOutlined />,
        },
        {
          label: <Link to="/admin/supplier">Nhà cung cấp</Link>,
          key: "supplier",
          icon: <ShopOutlined />,
        },
        {
          label: <Link to="/admin/brand">Nhãn hiệu</Link>,
          key: "brand",
          icon: <TagOutlined />,
        },
        {
          label: <Link to="/admin/size">Size</Link>,
          key: " size",
          icon: <ScissorOutlined />,
        },
        {
          label: <Link to="/admin/color">Màu sắc</Link>,
          key: " color",
          icon: <BgColorsOutlined />,
        },
        {
          label: <Link to="/admin/variants">Sản phẩm biến thể</Link>,
          key: " variant",
          icon: <SkinOutlined />,
        },
        {
          label: <Link to="/admin/coupon">Mã giảm giá</Link>,
          key: " coupon",
          icon: <SwitcherOutlined />,
        },
        {
          label: <Link to="/admin/blog">Blog</Link>,
          key: " blog",
          icon: <ContainerOutlined />,
        },
        {
          label: <Link to="/admin/chat">Trò chuyện</Link>,
          key: " chat",
          icon: <PhoneOutlined />,
        },
      ],
    },
    { type: "divider" },
    {
      label: <h2 className="text-xl ">Hóa đơn</h2>,
      key: "invoice",
      children: [
        {
          label: <Link to="/admin/sell-invoice">Hóa đơn bán hàng</Link>,
          key: "sellInvoice",
          icon: <DollarCircleOutlined />,
        },
        {
          label: <Link to="/admin/goods-receipt"> Phiếu nhập hàng </Link>,
          key: "goodsReceipt",
          icon: <SnippetsOutlined />,
        },
      ],
    },
  ];

  return (
    <>
      <div className="container-admin">
        <div className={`sidebar ${isSidebarOpen ? "open-sidebar" : " "}`}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="brand">
              <div className="logo-container" style={{ marginBottom: "-15px" }}>
                <img src={logo} alt="logo" />
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginLeft: "-30px",
                }}
                className="title-logo"
              >
                NickFashion
              </div>
              <div className="toggle-sidebar">
                <Button
                  icon={<RollbackOutlined />}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
              </div>
            </div>
            <Menu
              mode="inline"
              selectedKeys={[activeMenu]}
              openKeys={openKeys}
              onOpenChange={setOpenKeys}
              style={{ height: "100%" }}
              items={items}
              onClick={(e) => {
                setActiveMenu(e.key);
              }}
            />
          </motion.div>
        </div>
        <div className="content">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <HeaderAdmin setIsSidebarOpen={setIsSidebarOpen} />
          </motion.div>
          <div className="outlet">
            <Outlet />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
