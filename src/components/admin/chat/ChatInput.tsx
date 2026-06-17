import { useState, useRef, KeyboardEvent } from "react";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";

interface ChatInputProps {
  onSend: (content: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
  isSending: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput = ({
  onSend,
  onTyping,
  onStopTyping,
  isSending,
  disabled = false,
  placeholder = "Nhập tin nhắn...",
}: ChatInputProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 0) {
      onTyping();

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        onStopTyping();
      }, 2000);
    } else {
      onStopTyping();
    }

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 120);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleSend = () => {
    if (!value.trim() || isSending || disabled) return;

    onSend(value.trim());
    setValue("");

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    onStopTyping();

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isSending && !disabled;

  return (
    <div className="w-full px-4! py-3! bg-white border-t border-[#e8e8e8]">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isSending}
            rows={1}
            className="
              w-full resize-none outline-none bg-[#f5f5f5] rounded-2xl px-4! py-3!
              text-[14px] text-gray-800 placeholder:text-gray-400
              border border-transparent focus:border-[#1890ff]
              transition-colors duration-200
              disabled:bg-gray-100 disabled:cursor-not-allowed
              max-h-[120px] overflow-y-auto
            "
            style={{ minHeight: "44px" }}
          />
        </div>

        <div className="flex items-center gap-2 pb-0.5">
          <button
            type="button"
            className="
              p-2! text-gray-400 hover:text-gray-600 hover:bg-gray-100
              rounded-full transition-colors duration-150
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={disabled}
            title="Đính kèm file"
          >
            <PaperClipOutlined className="text-[18px]" />
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className={`p-2.5! rounded-full transition-all duration-150 ${
              canSend
                ? "bg-[#1890ff] text-white hover:bg-[#40a9ff] shadow-sm"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            title="Gửi tin nhắn"
          >
            <SendOutlined className="text-[16px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
