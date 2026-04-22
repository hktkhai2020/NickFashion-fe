import { Supplier } from "@/types";
import { Drawer, Descriptions, DescriptionsProps, Badge } from "antd";

const DetailSupplier = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  supplier: Supplier;
}) => {
  const { isOpen, setIsOpen, supplier } = props;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Mã nhà cung cấp",
      children: supplier?.code || "-",
    },
    {
      key: "2",
      label: "Tên nhà cung cấp",
      children: supplier?.name,
    },
    {
      key: "3",
      label: "Email",
      children: supplier?.email || "-",
    },
    {
      key: "4",
      label: "Số điện thoại",
      children: supplier?.phone || "-",
    },
    {
      key: "5",
      label: "Địa chỉ",
      children: supplier?.address || "-",
    },
    {
      key: "6",
      label: "Công nợ",
      children: supplier?.debt?.toLocaleString() + " đ" || "0 đ",
    },
    {
      key: "7",
      label: "Trạng thái",
      children: supplier?.isActive ? (
        <Badge status="success" text="Active" />
      ) : (
        <Badge status="error" text="Inactive" />
      ),
    },
    {
      key: "8",
      label: "Thông tin thêm",
      children: supplier?.information || "-",
      span: 2,
    },
  ];

  return (
    <>
      <Drawer
        title="Chi tiết nhà cung cấp"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={800}
      >
        <Descriptions
          title="Thông tin nhà cung cấp"
          items={items}
          bordered
          column={2}
        />
      </Drawer>
    </>
  );
};

export default DetailSupplier;
