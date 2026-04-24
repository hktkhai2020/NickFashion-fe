import { Color } from "@/types";
import { Drawer, Descriptions, DescriptionsProps, Badge } from "antd";

const DetailColor = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  color: Color;
}) => {
  const { isOpen, setIsOpen, color } = props;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên màu",
      children: color?.name,
    },
    {
      key: "2",
      label: "Mã màu",
      children: color?.hexCode ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-block",
              width: 24,
              height: 24,
              backgroundColor: color.hexCode,
              border: "1px solid #d9d9d9",
              borderRadius: 4,
            }}
          />
          <span style={{ fontFamily: "monospace" }}>{color.hexCode}</span>
        </div>
      ) : (
        "-"
      ),
    },
    {
      key: "3",
      label: "Mô tả",
      children: color?.description || "-",
      span: 2,
    },
    {
      key: "4",
      label: "Trạng thái",
      children: color?.isActive ? (
        <Badge status="success" text="Active" />
      ) : (
        <Badge status="error" text="Inactive" />
      ),
    },
  ];

  return (
    <>
      <Drawer
        title="Chi tiết màu"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={600}
      >
        <Descriptions
          title="Thông tin màu"
          items={items}
          bordered
          column={2}
        />
      </Drawer>
    </>
  );
};

export default DetailColor;
