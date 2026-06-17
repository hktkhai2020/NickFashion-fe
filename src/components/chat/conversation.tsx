import { useEffect, useRef, KeyboardEvent } from "react";
import {
  LoadingOutlined,
  PaperClipOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Empty } from "antd";
import useMessage from "@/hooks/useMessage";
import { ChatMessage, ChatUser } from "@/types/message";
import useUserStore from "@/store/useUserStore";
import { formatDateTime } from "utils/format";

const isUserObject = (senderId: ChatMessage["senderId"]): senderId is ChatUser => {
  return typeof senderId === "object" && senderId !== null;
};

const getRole = (senderId: ChatMessage["senderId"]): string => {
  if (isUserObject(senderId)) return senderId.role;
  return "user";
};

const getName = (senderId: ChatMessage["senderId"], fallback = "Nhân viên hỗ trợ"): string => {
  if (isUserObject(senderId)) return senderId.name;
  return fallback;
};

const getAvatar = (senderId: ChatMessage["senderId"]): string | null => {
  if (isUserObject(senderId) && senderId.avatar) return senderId.avatar;
  return null;
};

export const Conversation = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const user = useUserStore((state) => state.user);

  const {
    messages,
    isPendingMessages,
    isErrorMessages,
    dataConversations,
    isPendingConversations,
    isTyping,
    setIsTyping,
    isOtherTyping,
    typingMessage,
    stopTypingMessage,
    setIsOpenSmile,
    valueMessage,
    setValueMessage,
    submitMessage,
    isSending,
    contextHolder,
  } = useMessage();

  const currentUserId = user?._id || (user as { id?: string })?.id || "";

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages.length, isOtherTyping]);

  useEffect(() => {
    return () => {
      stopTypingMessage();
    };
  }, [stopTypingMessage]);

  const handleChange = (value: string) => {
    setValueMessage(value);
    if (value.length > 0) {
      if (!isTyping) {
        setIsTyping(true);
        typingMessage();
      }
    } else {
      if (isTyping) {
        setIsTyping(false);
        stopTypingMessage();
      }
    }
  };

  const handleSend = async () => {
    if (!valueMessage.trim() || isSending) return;
    const content = valueMessage;
    setValueMessage("");
    setIsTyping(false);
    stopTypingMessage();
    if (textareaRef.current) textareaRef.current.value = "";
    await submitMessage(content);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isMyMessage = (item: ChatMessage): boolean => {
    if (isUserObject(item.senderId)) {
      return item.senderId._id === currentUserId;
    }
    return item.senderId === currentUserId || item.senderId === "self";
  };

  const renderMessageContent = (item: ChatMessage, index: number) => {
    const mine = isMyMessage(item);
    const next = messages[index + 1];
    const prev = messages[index - 1];
    const sameSenderNext = next && isMyMessage(next) === mine;
    const sameSenderPrev = prev && isMyMessage(prev) === mine;
    const role = getRole(item.senderId);

    if (mine) {
      return (
        <div className="flex flex-col gap-1 items-end">
          <div className="bg-[#333f48] p-2! max-w-[205px] text-white rounded-2xl break-words">
            {item.content}
          </div>
          <div className="text-[#bebbbb] text-[11px]">
            {formatDateTime(item.createdAt)}
          </div>
        </div>
      );
    }

    const showAvatar = !sameSenderNext;
    const showName = !sameSenderPrev;
    const avatar = getAvatar(item.senderId);

    return (
      <div className="flex gap-3 items-end">
        {showAvatar ? (
          avatar ? (
            <img
              src={avatar}
              alt=""
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#333f48] text-white flex items-center justify-center text-[12px] flex-shrink-0">
              {getName(item.senderId).charAt(0).toUpperCase()}
            </div>
          )
        ) : (
          <div className="w-8 h-8 flex-shrink-0" />
        )}
        <div className="flex flex-col gap-1">
          {showName && role !== "user" && (
            <div className="text-[#7a7a7a] text-[11px] font-medium">
              {getName(item.senderId)}
            </div>
          )}
          <div className="bg-[#e1e6e9] p-2! max-w-[205px] text-black rounded-2xl break-words">
            {item.content}
          </div>
          <div className="text-[#bebbbb] text-[11px]">
            {formatDateTime(item.createdAt)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {contextHolder}
      <div className="w-full h-full flex flex-col">
        <div
          ref={messagesRef}
          className="w-full h-[85%] border-b border-[#e4e2e2cc] p-4! flex flex-col gap-3 overflow-y-auto"
        >
          {isPendingMessages || isPendingConversations ? (
            <div className="w-full h-full flex justify-center items-center">
              <LoadingOutlined className="text-[42px]" />
            </div>
          ) : isErrorMessages ? (
            <div className="w-full h-full flex justify-center items-center text-gray-500">
              Không thể tải tin nhắn
            </div>
          ) : !dataConversations?.data ? (
            <div className="w-full h-full flex justify-center items-center">
              <Empty description="Hãy bắt đầu cuộc trò chuyện với nhà bán hàng" />
            </div>
          ) : messages.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              <Empty description="Hãy bắt đầu cuộc trò chuyện với nhà bán hàng" />
            </div>
          ) : (
            <>
              {messages.map((item, index) => (
                <div
                  key={item._id}
                  className={`w-full flex ${
                    isMyMessage(item) ? "justify-end" : "justify-start"
                  }`}
                >
                  {renderMessageContent(item, index)}
                </div>
              ))}
              {isOtherTyping && (
                <div className="w-full flex justify-start">
                  <div className="bg-[#e1e6e9] text-black rounded-2xl px-3! py-2! flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-full h-[15%] flex">
          <div className="w-3/4 h-full p-3!">
            <textarea
              ref={textareaRef}
              className="outline-none w-full h-full overflow-y-hidden resize-none px-2! text-[14px]"
              placeholder="Nhập tin nhắn..."
              value={valueMessage}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
            />
          </div>
          <div className="w-1/4 h-full flex justify-center items-center gap-3">
            <PaperClipOutlined className="text-[20px] text-[#D0D3DB] cursor-pointer" />
            <SmileOutlined
              className="text-[20px] text-[#D0D3DB] cursor-pointer"
              onClick={() => setIsOpenSmile(true)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              style={{ cursor: isSending ? "not-allowed" : "pointer", opacity: isSending ? 0.5 : 1 }}
              onClick={handleSend}
            >
              <path
                d="M0.00855804 0.500732L0 6.50072L12.8571 8.21502L0 9.92932L0.00855804 15.9293L18 8.21502L0.00855804 0.500732Z"
                fill="#333f48"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
