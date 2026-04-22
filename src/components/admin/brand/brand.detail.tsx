import { Brand } from "@/types";
import { Drawer, Descriptions, DescriptionsProps, Badge } from "antd";

const DetailBrand = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  brand: Brand;
}) => {
  const { isOpen, setIsOpen, brand } = props;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên thương hiệu",
      children: brand?.name,
    },
    {
      key: "2",
      label: "Slug",
      children: brand?.slug,
    },
    {
      key: "3",
      label: "Mô tả",
      children: brand?.description || "-",
      span: 2,
    },
    {
      key: "4",
      label: "Email liên hệ",
      children: brand?.contactEmail || "-",
    },
    {
      key: "5",
      label: "Hiển thị trang chủ",
      children: brand?.isFeatured ? (
        <Badge status="success" text="Nổi bật" />
      ) : (
        <Badge status="default" text="Bình thường" />
      ),
    },
    {
      key: "6",
      label: "Trạng thái",
      children: brand?.isActive ? (
        <Badge status="success" text="Active" />
      ) : (
        <Badge status="error" text="Inactive" />
      ),
    },
  ];

  return (
    <>
      <Drawer
        title="Chi tiết thương hiệu"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={800}
      >
        <Descriptions
          title="Thông tin thương hiệu"
          items={items}
          bordered
          column={2}
        />
      </Drawer>
    </>
  );
};

export default DetailBrand;
