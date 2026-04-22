import { Category } from "@/types";
import { Drawer, Descriptions, DescriptionsProps, Badge } from "antd";

const DetailCategory = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: Category;
}) => {
  const { isOpen, setIsOpen, category } = props;
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "name",
      children: category?.name,
    },
    {
      key: "2",
      label: "slug",
      children: category?.slug,
    },
    {
      key: "3",
      label: "isActive",
      children: category?.isActive ? (
        <Badge status="success" text="Active" />
      ) : (
        <Badge status="processing" text="Inactive" />
      ),
    },
    {
      key: "4",
      label: "isFeatured",
      children: category?.isFeatured ? "Featured" : "Not Featured",
    },
    {
      key: "5",
      label: "isShowOnHome",
      children: category?.isShowOnHome ? "Show on Home" : "Not Show on Home",
      span: 2,
    },
    {
      key: "6",
      label: "metaTitle",
      children: category?.metaTitle,
      span: 3,
    },
    {
      key: "7",
      label: "metaDescription",
      children: category?.metaDescription,
    },
  ];
  return (
    <>
      <Drawer
        title="Detail Category"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        width={800}
      >
        <Descriptions
          title="Category Information"
          items={items}
          bordered
          column={2}
        />
      </Drawer>
    </>
  );
};

export default DetailCategory;
