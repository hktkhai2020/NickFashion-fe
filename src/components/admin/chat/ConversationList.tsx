import { Conversation } from "@/types/adminMessage";
import { formatDateTime } from "utils/format";
import { Avatar, Badge, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { UserOutlined, CheckCircleFilled, StopFilled } from "@ant-design/icons";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string | null;
  onSelect: (conversationId: string) => void;
  isLoading: boolean;
}

const ConversationList = ({
  conversations,
  selectedId,
  onSelect,
  isLoading,
}: ConversationListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingOutlined style={{ fontSize: 24 }} />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-4!">
        <Empty
          description="Chưa có cuộc trò chuyện nào"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }
console.log(conversations);
  return (
    <div className="flex flex-col">
      {conversations.map((conv) => {
        const user = conv.userId;
        const isSelected = selectedId === conv._id;
        const isClosed = conv.status === "closed";
        const lastMessagePreview = conv.lastMessage?.content || "Chưa có tin nhắn";
        const isFromAdmin = conv.lastMessageBy === "admin";

        return (
          <div
            key={conv._id}
            onClick={() => !isClosed && onSelect(conv._id)}
            className={`
              flex items-center gap-3 px-4! py-3! cursor-pointer border-b border-[#f0f0f0]
              transition-colors duration-150
              ${isSelected ? "bg-[#e6f4ff]" : "hover:bg-[#fafafa]"}
              ${isClosed ? "opacity-60" : ""}
            `}
          >
            <Badge dot={!isClosed} color="#52c41a" offset={[-2, 2]}>
              <Avatar
                size={44}
                src={user.avatar}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff" }}
              />
            </Badge>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-semibold text-sm truncate ${
                    isClosed ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  {user.name || user.email || "Người dùng"}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  {isClosed ? (
                    <StopFilled className="text-[10px] text-gray-400" />
                  ) : (
                    <CheckCircleFilled className="text-[10px] text-gray-400" />
                  )}
                  <span className="text-[11px] text-gray-400">
                    {conv.lastMessageAt
                      ? formatDateTime(conv.lastMessageAt)
                      : ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span
                  className={`text-xs truncate ${
                    isClosed ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {isFromAdmin ? "Bạn: " : ""}
                  {lastMessagePreview}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
