import React from "react";
import AdminService from "@/services/adminService";
import { useEffect, useState } from "react";
import { message, TabsProps } from "antd";
import {
  DailyRevenueItem,
  MonthlyRevenueItem,
  TopRevenueVariant,
  TopSellingVariant,
} from "@/types";
import { Tabs } from "antd";
import { DualAxes } from "@ant-design/charts";
const AdminSellingData: React.FC = () => {
  const [topSellingVariants, setTopSellingVariants] = useState<
    TopSellingVariant[]
  >([]);
  const [topRevenueVariants, setTopRevenueVariants] = useState<
    TopRevenueVariant[]
  >([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenueItem[]>(
    [],
  );
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenueItem[]>([]);

  useEffect(() => {
    const fetchSellingData = async () => {
      const [
        topSellingVariants,
        topRevenueVariants,
        monthlyRevenue,
        dailyRevenue,
      ] = await Promise.all([
        AdminService.getTopSellingVariants(),
        AdminService.getTopRevenueVariants(),
        AdminService.getMonthlyRevenue(),
        AdminService.getDailyRevenue(),
      ]);
      if (
        topSellingVariants.success &&
        topRevenueVariants.success &&
        monthlyRevenue.success &&
        dailyRevenue.success
      ) {
        setTopSellingVariants(topSellingVariants.data);
        setTopRevenueVariants(topRevenueVariants.data);
        setMonthlyRevenue(monthlyRevenue.data);
        setDailyRevenue(dailyRevenue.data);
      } else {
        message.error("Không thể tải dữ liệu");
      }
    };
    fetchSellingData();
  }, []);

  const topSellingVariantsConfig = {
    xField: "productName", // Trục X hiển thị tên sản phẩm
    data: topSellingVariants.map((variant) => ({
      productName:
        variant?.productName + " - " + variant?.size + " - " + variant?.color,
      sold: variant.totalQuantity,
    })),
    legend: {
      color: {
        position: "top",
        layout: {
          justifyContent: "flex-start", // Top-aligned
        },
      },
    },
    // scale: { y: { domainMax: 500 } }, // Bỏ comment nếu cần giới hạn trục Y
    scale: {
      color: {
        range: [
          "#1890ff",
          "#36cfc9",
          "#73d13d",
          "#ffd666",
          "#ff7875",
          "#9254de",
          "#fa8c16",
          "#52c41a",
          "#2f54eb",
          "#eb2f96",
        ],
      },
    },
    children: [
      {
        type: "interval",
        yField: "sold",
        colorField: "sold",
      },
    ],
    title: "Top 10 sản phẩm bán chạy nhất theo số lượng",
    grid: true,
    axis: {
      x: {
        position: "bottom",
        title: "Tên sản phẩm",
        titleFontWeight: "500",
        grid: true,
        gridLineWidth: 2,
        line: true,
        lineLineWidth: 5,
        lineStroke: "#f50",
        tick: true,
        tickLineWidth: 5,
        tickLength: 10,
        tickStroke: "#3366ff",
        label: true,
        labelFontSize: 15,
        labelFill: "#009900",
        labelFontWeight: 500,
      },
      y: {
        position: "left",
        title: "Số lượng bán",
        titleFontWeight: 500,
        grid: true,
        gridLineWidth: 2,
        line: true,
        lineLineWidth: 5,
        lineStroke: "#f50",
        tick: true,
        tickLineWidth: 5,
        tickLength: 10,
        tickStroke: "#3366ff",
        label: true,
        labelFontSize: 15,
        labelFill: "#009900",
        labelFontWeight: 500,
      },
    },
  };
  const topRevenueVariantsConfig = {
    xField: "productName", // Trục X hiển thị tên sản phẩm
    data: topRevenueVariants.map((variant) => ({
      productName:
        variant?.productName + " - " + variant?.size + " - " + variant?.color,
      revenue: variant.totalRevenue,
    })),
    legend: {
      color: {
        position: "top",
        layout: {
          justifyContent: "flex-start", // Top-aligned
        },
      },
    },
    // scale: { y: { domainMax: 500 } }, // Bỏ comment nếu cần giới hạn trục Y
    children: [
      {
        type: "interval",
        yField: "revenue",
        style: {
          fill: "#1890ff",
        },
      },
    ],
    title: "Top 10 sản phẩm có doanh số cao nhất",
    grid: true,
    axis: {
      x: {
        position: "bottom",
        title: "Tên sản phẩm",
        titleFontWeight: "500",
        grid: true,
        gridLineWidth: 2,
        line: true,
        lineLineWidth: 5,
        lineStroke: "#f50",
        tick: true,
        tickLineWidth: 5,
        tickLength: 10,
        tickStroke: "#3366ff",
        label: true,
        labelFontSize: 15,
        labelFill: "#009900",
        labelFontWeight: 500,
      },
      y: {
        position: "left",
        title: "Doanh số",
        titleFontWeight: 500,
        grid: true,
        gridLineWidth: 2,
        line: true,
        lineLineWidth: 5,
        lineStroke: "#f50",
        tick: true,
        tickLineWidth: 5,
        tickLength: 10,
        tickStroke: "#3366ff",
        label: true,
        labelFontSize: 15,
        labelFill: "#009900",
        labelFontWeight: 500,
      },
    },
  };
  const monthlyRevenueConfig = {
    xField: "month", // Trục X hiển thị tháng
    data: monthlyRevenue.map((item) => ({
      month: item.month,
      revenue: item.revenue,
    })),
    legend: false,
    children: [
      {
        type: "interval",
        yField: "revenue",
        style: {
          fill: "#1890ff",
        },
      },
    ],
    title: "Doanh số hàng tháng trong năm",
    grid: true,
    axis: {
      x: {
        position: "bottom",
        title: "Tháng",
        titleFontWeight: "500",
        grid: true,
        gridLineWidth: 2,
        line: true,
        lineLineWidth: 5,
        lineStroke: "#f50",
        tick: true,
        tickLineWidth: 5,
        tickLength: 10,
        tickStroke: "#3366ff",
        label: true,
        labelFontSize: 15,
        labelFill: "#009900",
        labelFontWeight: 500,
      },
      y: {
        position: "left",
        title: "Doanh số",
        titleFontWeight: 500,
        grid: true,
        gridLineWidth: 2,
        line: true,
        lineLineWidth: 5,
        lineStroke: "#f50",
        tick: true,
        tickLineWidth: 5,
        tickLength: 10,
        tickStroke: "#3366ff",
        label: true,
        labelFontSize: 15,
        labelFill: "#009900",
        labelFontWeight: 500,
      },
    },
  };
  const dailyRevenueConfig = {
    xField: "date", // Trục X hiển thị ngày
    data: dailyRevenue.map((item) => ({
      date: item.date,
      revenue: item.revenue,
    })),

    legend: false,
    scale: {
      color: {
        range: [
          "#1890ff",
          "#36cfc9",
          "#73d13d",
          "#ffd666",
          "#ff7875",
          "#9254de",
          "#fa8c16",
          "#52c41a",
          "#2f54eb",
          "#eb2f96",
        ],
      },
    },
    children: [
      {
        type: "interval",
        yField: "revenue",
        colorField: "revenue",
      },
    ],
    title: "Doanh số hàng ngày trong tháng",
    grid: true,
    axis: {
      x: {
        position: "bottom",
        title: "Ngày",
        titleFontWeight: "500",
        grid: true,
        gridLineWidth: 2,
        line: true,
        lineLineWidth: 5,
        lineStroke: "#f50",
        tick: true,
        tickLineWidth: 5,
        tickLength: 10,
        tickStroke: "#3366ff",
        label: true,
        labelFontSize: 12,
        labelFill: "#009900",
        labelFontWeight: 500,
      },
      y: {
        position: "left",
        title: "Doanh số",
        titleFontWeight: 500,
        grid: true,
        gridLineWidth: 2,
        line: true,
        lineLineWidth: 5,
        lineStroke: "#f50",
        tick: true,
        tickLineWidth: 5,
        tickLength: 10,
        tickStroke: "#3366ff",
        label: true,
        labelFontSize: 12,
        labelFill: "#009900",
        labelFontWeight: 500,
      },
    },
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Top 10 sản phẩm bán chạy",
      children: <DualAxes {...topSellingVariantsConfig} />,
    },
    {
      key: "2",
      label: "Thống kê sản phẩm đạt top doanh số cao nhất",
      children: <DualAxes {...topRevenueVariantsConfig} />,
    },
    {
      key: "3",
      label: "Doanh số hàng tháng trong năm 2026",
      children: <DualAxes {...monthlyRevenueConfig} />,
    },
    {
      key: "4",
      label: "Doanh số hàng ngày",
      children: <DualAxes {...dailyRevenueConfig} />,
    },
  ];
  return (
    <div>
      <Tabs items={items} defaultActiveKey="1" />
    </div>
  );
};
export default AdminSellingData;
