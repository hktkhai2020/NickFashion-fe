import { DualAxes } from "@ant-design/charts";
import { Tabs, message } from "antd";
import { TabsProps } from "antd/lib";
import AdminService from "@/services/adminService";
import { useEffect, useState } from "react";
import type { ImportQuantityItem, ImportStatisticsItem } from "@/types";
const AdminImportStatistics = () => {
  const [importStatistics, setImportStatistics] = useState<
    ImportStatisticsItem[]
  >([]);
  const [importQuantity, setImportQuantity] = useState<ImportQuantityItem[]>(
    [],
  );

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchImportStatistics = async () => {
      const response = await AdminService.getImportStatistics();
      if (response.success) {
        setImportStatistics(response.data.suppliers);
      } else {
        messageApi.error("Không thể tải dữ liệu");
      }
    };
    const fetchImportQuantity = async () => {
      const response = await AdminService.getImportQuantity();
      if (response.success) {
        setImportQuantity(response.data.suppliers);
      } else {
        messageApi.error("Không thể tải dữ liệu");
      }
    };
    fetchImportStatistics();
    fetchImportQuantity();
  }, []);
  const importValueConfig = {
    xField: "supplierName", // Trục X hiển thị ngày
    data: importStatistics.map((item) => ({
      supplierName: item.supplierName,
      totalImportValue: item.totalImportValue,
    })),

    legend: true,
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
        yField: "totalImportValue",
        colorField: "supplierName",
      },
    ],
    title: "Giá trị nhập hàng theo nhà cung cấp",
    grid: true,
    axis: {
      x: {
        position: "bottom",
        title: "Nhà cung cấp",
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
        title: "Giá trị nhập hàng",
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

  const importQuantityConfig = {
    xField: "supplierName", // Trục X hiển thị ngày
    data: importQuantity.map((item) => ({
      supplierName: item.supplierName,
      totalQuantity: item.totalQuantity,
    })),

    legend: true,
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
        yField: "totalQuantity",
        colorField: "supplierName",
      },
    ],
    title: "Số lượng nhập hàng theo nhà cung cấp",
    grid: true,
    axis: {
      x: {
        position: "bottom",
        title: "Nhà cung cấp",
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
        title: "Số lượng nhập hàng",
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
      label: "Giá trị nhập hàng theo nhà cung cấp",
      children: <DualAxes {...importValueConfig} />,
    },
    {
      key: "2",
      label: "Số lượng nhập hàng theo nhà cung cấp",
      children: <DualAxes {...importQuantityConfig} />,
    },
  ];
  return (
    <>
      {contextHolder}
      <div>
        <Tabs items={items} defaultActiveKey="1" />
      </div>
    </>
  );
};
export default AdminImportStatistics;
