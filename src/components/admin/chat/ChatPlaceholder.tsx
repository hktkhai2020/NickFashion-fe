import { MessageOutlined } from "@ant-design/icons";

interface ChatPlaceholderProps {
  selectedCount?: number;
}

const ChatPlaceholder = ({ selectedCount }: ChatPlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-[#fafafa]">
      <div className="w-20 h-20 rounded-full bg-[#e6f4ff] flex items-center justify-center">
        <MessageOutlined className="text-3xl text-[#1890ff]" />
      </div>
      <div className="text-center">
        <h3 className="text-[16px] font-semibold text-gray-700 mb-1">
          Chào mừng đến với Chat Admin
        </h3>
        <p className="text-[13px] text-gray-500 max-w-[260px]">
          Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu trả lời
          khách hàng
        </p>
      </div>
      {selectedCount !== undefined && (
        <span className="text-[12px] text-gray-400">
          {selectedCount} cuộc trò chuyện đang chờ
        </span>
      )}
    </div>
  );
};

export default ChatPlaceholder;
