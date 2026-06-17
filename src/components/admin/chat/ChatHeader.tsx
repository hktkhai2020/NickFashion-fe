import { Conversation } from "@/types/adminMessage";
import { Avatar, Button, Tag, Dropdown, Popconfirm } from "antd";
import {
  ArrowLeftOutlined,
  MoreOutlined,
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

interface ChatHeaderProps {
  conversation: Conversation;
  onBack?: () => void;
  onClose: (conversationId: string) => void;
  isClosing: boolean;
  showBackButton?: boolean;
}

const ChatHeader = ({
  conversation,
  onBack,
  onClose,
  isClosing,
  showBackButton = false,
}: ChatHeaderProps) => {
  const user = conversation.userId;
  const isClosed = conversation.status === "closed";

  const menuItems: MenuProps["items"] = [
    {
      key: "view-profile",
      icon: <UserOutlined />,
      label: "Xem thông tin người dùng",
      disabled: true,
    },
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Liên hệ người dùng",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "close",
      icon: <CloseOutlined />,
      label: (
        <Popconfirm
          title="Đóng cuộc trò chuyện"
          description="Bạn có chắc muốn đóng cuộc trò chuyện này? Người dùng sẽ không thể nhắn tin tiếp."
          onConfirm={(e) => {
            e?.stopPropagation();
            onClose(conversation._id);
          }}
          okText="Đóng cuộc trò chuyện"
          cancelText="Hủy"
          okButtonProps={{ danger: true, loading: isClosing }}
        >
          <span onClick={(e) => e.stopPropagation()}>Đóng cuộc trò chuyện</span>
        </Popconfirm>
      ),
      danger: true,
      disabled: isClosed,
    },
  ];

  return (
    <div className="flex items-center justify-between px-4! py-3! bg-white border-b border-[#e8e8e8]">
      <div className="flex items-center gap-3 min-w-0">
        {showBackButton && (
          <button
            onClick={onBack}
            className="p-1! hover:bg-gray-100 rounded-full transition-colors duration-150 shrink-0"
          >
            <ArrowLeftOutlined className="text-[16px] text-gray-600" />
          </button>
        )}

        <Avatar
          size={40}
          src={user.avatar}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1890ff" }}
        />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[15px] text-gray-800 truncate">
              {user.name || user.email || "Người dùng"}
            </span>
            {isClosed && (
              <Tag color="default" className="text-[11px] m-0">
                Đã đóng
              </Tag>
            )}
          </div>
          <span className="text-[12px] text-gray-500 truncate block">
            {user.email}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {isClosed && (
          <Button
            size="small"
            danger
            icon={<CloseOutlined />}
            onClick={() => onClose(conversation._id)}
            loading={isClosing}
          >
            Đóng
          </Button>
        )}
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <button className="p-2! hover:bg-gray-100 rounded-full transition-colors duration-150">
            <MoreOutlined className="text-[16px] text-gray-600" />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default ChatHeader;
