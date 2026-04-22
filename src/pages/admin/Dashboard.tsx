import React, { useEffect, useState } from "react";
import "@/styles/admin/dashboard.scss";
import adminService from "@/services/adminService";
import { DashboardData } from "@/types/admin";
import { Spin, message } from "antd";
import { motion, useInView } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  StockOutlined,
  StarOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({
  value,
  suffix,
}) => {
  const spring = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { tension: 60, friction: 20 },
  });

  return (
    <animated.span>
      {spring.number.to((n) => {
        if (suffix === "đ") {
          return n >= 1000
            ? `${Math.round(n).toLocaleString("vi-VN")}${suffix}`
            : `${Math.round(n)}${suffix}`;
        }
        if (!Number.isInteger(value) && value > 0) {
          return `${(Math.round(n * 10) / 10).toFixed(1)}`;
        }
        return n >= 1000
          ? Math.round(n).toLocaleString("vi-VN")
          : Math.round(n);
      })}
    </animated.span>
  );
};

const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  accentColor: string;
  suffix?: string;
  index: number;
}> = ({ title, value, icon, accentColor, suffix, index }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="stat-card-wrapper"
      initial={{ opacity: 0, scale: 0.88, y: 32 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.88, y: 32 }
      }
      transition={{
        delay: index * 0.06,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover="hover"
    >
      <motion.div
        className="stat-card"
        variants={{
          hover: {
            y: -6,
            transition: { duration: 0.25, ease: "easeOut" },
          },
        }}
      >
        <motion.div
          className="stat-card__accent-bar"
          style={{ backgroundColor: accentColor }}
          variants={{
            hover: {
              scaleX: 1,
              transition: { duration: 0.25, ease: "easeOut" },
            },
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: index * 0.06 + 0.3, duration: 0.4 }}
        />
        <div className="stat-card__inner">
          <motion.div
            className="stat-card__icon"
            style={{
              background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor}88)`,
              color: "#fff",
            }}
            variants={{
              hover: {
                scale: 1.15,
                rotate: 5,
                transition: { duration: 0.25, ease: "easeOut" },
              },
            }}
          >
            {icon}
          </motion.div>
          <div className="stat-card__body">
            <p className="stat-card__title">{title}</p>
            <p className="stat-card__value">
              {typeof value === "number" ? (
                <AnimatedNumber value={value} suffix={suffix} />
              ) : (
                <>
                  {value}
                  {suffix && (
                    <span className="stat-card__suffix">{suffix}</span>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await adminService.getDashboard();
        if (response.success) {
          setData(response.data);
        }
      } catch {
        message.error("Không thể tải dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) return null;

  const { users, orders, financial, monthlyFinancial, products, reviews } = data;

  const statCards = [
    {
      title: "Tổng sản phẩm",
      value: products.total,
      icon: <ShoppingOutlined />,
      accentColor: "#1890ff",
    },
    {
      title: "Tổng đơn hàng",
      value: orders.total,
      icon: <ShoppingCartOutlined />,
      accentColor: "#fa8c16",
    },
    {
      title: "Tổng người dùng",
      value: users.total,
      icon: <UserOutlined />,
      accentColor: "#52c41a",
    },
    {
      title: "Tổng doanh thu",
      value: financial.totalRevenue,
      icon: <DollarOutlined />,
      accentColor: "#f5222d",
      suffix: "đ",
    },
    {
      title: "Doanh thu tháng",
      value: monthlyFinancial.revenue,
      icon: <RiseOutlined />,
      accentColor: "#722ed1",
      suffix: "đ",
    },
    {
      title: "Lợi nhuận tháng",
      value: monthlyFinancial.profit,
      icon: <SafetyCertificateOutlined />,
      accentColor: "#13c2c2",
      suffix: "đ",
    },
    {
      title: "Giá trị tồn kho",
      value: financial.inventoryValue,
      icon: <StockOutlined />,
      accentColor: "#faad14",
      suffix: "đ",
    },
    {
      title: "Đơn chờ xử lý",
      value: orders.pending,
      icon: <ClockCircleOutlined />,
      accentColor: "#fa8c16",
    },
    {
      title: "Đơn đã giao",
      value: orders.completed,
      icon: <CheckCircleOutlined />,
      accentColor: "#52c41a",
    },
    {
      title: "Đơn đã hủy",
      value: orders.cancelled,
      icon: <StopOutlined />,
      accentColor: "#ff4d4f",
    },
    {
      title: "Tổng lượt xem",
      value: products.totalViews,
      icon: <EyeOutlined />,
      accentColor: "#1890ff",
    },
    {
      title: "Đánh giá TB",
      value:
        reviews.avgRating > 0 ? Number(reviews.avgRating.toFixed(1)) : 0,
      icon: <StarOutlined />,
      accentColor: "#fa8c16",
    },
  ];

  return (
    <div className="dashboard">
      <motion.div
        className="dashboard__header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="dashboard__title">Tổng quan</h2>
        <p className="dashboard__subtitle">
          Chào mừng bạn quay trở lại trang quản trị
        </p>
      </motion.div>

      <div className="dashboard__cards">
        {statCards.map((card, index) => (
          <StatCard key={card.title} {...card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
