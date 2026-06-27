import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState } from "react";
import useAdminNotifications from "@/hooks/useAdminNotification";
const OptionNotification: React.FC<{
  notificationId: string;
  index: number;
}> = ({ notificationId, index }) => {
  const { deleteNotificationAdmin } = useAdminNotifications();
  const [isOpenOptionsNotification, setIsOpenOptionsNotification] =
    useState(false);
  const itemsOptionsNotification = (notificationId: string, index: number) => {
    return [
      {
        key: index,
        label: (
          <div
            className="flex items-center gap-2"
            onClick={() => deleteNotificationAdmin(notificationId)}
          >
            <DeleteOutlined className="text-[20px]" />
            <span>Xóa thông báo này</span>
          </div>
        ),
      },
    ];
  };
  return (
    <>
      <div
        className={`p-2! bg-gray-200 rounded-[50%] hover:bg-gray-300 group-hover:block ${isOpenOptionsNotification ? "block" : "hidden"} `}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Dropdown
          placement="bottomCenter"
          trigger={["click"]}
          menu={{
            items: itemsOptionsNotification(notificationId, index),
          }}
          onOpenChange={(open) => {
            setIsOpenOptionsNotification(open);
          }}
        >
          <EllipsisOutlined className="text-[20px]" />
        </Dropdown>
      </div>
    </>
  );
};
export default OptionNotification;
