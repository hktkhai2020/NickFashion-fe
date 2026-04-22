import { Size } from "@/types";
import { Drawer, Descriptions, DescriptionsProps, Badge } from "antd";

const DetailSize = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size: Size;
}) => {
  const { isOpen, setIsOpen, size } = props;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên size",
      children: size?.name,
    },
    {
      key: "2",
      label: "Loại danh mục",
      children: size?.type?.name || "-",
    },
    {
      key: "3",
      label: "Trạng thái",
      children: size?.isActive ? (
        <Badge status="success" text="Active" />
      ) : (
        <Badge status="error" text="Inactive" />
      ),
    },
  ];

  return (
    <>
      <Drawer
        title="Chi tiết size"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={600}
      >
        <Descriptions
          title="Thông tin size"
          items={items}
          bordered
          column={1}
        />
      </Drawer>
    </>
  );
};

export default DetailSize;
