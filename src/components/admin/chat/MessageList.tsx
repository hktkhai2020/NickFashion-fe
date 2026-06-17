import { useEffect, useRef } from "react";
import { Message } from "@/types/adminMessage";
import { formatDateTime } from "utils/format";
import { Empty, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isOtherTyping: boolean;
  otherTypingName?: string;
  currentUserId?: string;
}

const MessageList = ({
  messages,
  isLoading,
  isOtherTyping,
  otherTypingName = "Người dùng",
  currentUserId,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);
  const isOwnMessage = (msg: Message) => {
    if (msg.senderId.role === "admin") return true;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <Empty
          description="Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto px-6! py-4! flex flex-col gap-3"
    >
      {messages.map((msg, index) => {
        const isOwn = isOwnMessage(msg);
        const prevMsg = messages[index - 1];
        const nextMsg = messages[index + 1];
        const showAvatar =
          !nextMsg || nextMsg.senderId._id !== msg.senderId._id;
        const showName = !prevMsg || prevMsg.senderId._id !== msg.senderId._id;

        return (
          <div
            key={msg._id}
            className={`flex items-end gap-2 ${
              isOwn ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="w-8 shrink-0">
              {showAvatar && !isOwn ? (
                <img
                  src={msg.senderId.avatar || undefined}
                  alt={msg.senderId.name}
                  className="w-8 h-8 rounded-full object-cover bg-gray-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-8" />
              )}
            </div>

            <div
              className={`flex flex-col gap-0.5 max-w-[70%] ${
                isOwn ? "items-end" : "items-start"
              }`}
            >
              {showName && !isOwn && (
                <span className="text-[12px] text-gray-500 ml-1!">
                  {msg.senderId.name || msg.senderId.email}
                </span>
              )}

              <div
                className={`px-3! py-2! text-sm leading-relaxed ${
                  isOwn
                    ? "bg-[#333f48] text-white rounded-2xl rounded-br-md"
                    : "bg-[#f1f1f1] text-gray-800 rounded-2xl rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>

              <div
                className={`flex items-center gap-1 text-[11px] text-gray-400 px-1! ${
                  isOwn ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <span>{formatDateTime(msg.createdAt)}</span>
                {msg.isEdited && <span className="italic">(đã sửa)</span>}
              </div>
            </div>
          </div>
        );
      })}

      {isOtherTyping && (
        <div className="flex items-end gap-2">
          <div className="w-8 shrink-0">
            <UserOutlined className="text-lg text-gray-400" />
          </div>
          <div className="bg-[#f1f1f1] px-3! py-2! rounded-2xl rounded-bl-md">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
