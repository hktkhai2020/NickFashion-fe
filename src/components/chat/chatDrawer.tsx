import { CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Conversation } from "@/components/chat/conversation";
import useMessage from "@/hooks/useMessage";
import { useEffect } from "react";

const ChatDrawer = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { joinConversation, leaveConversation, dataConversations } = useMessage();

  useEffect(() => {
    if (dataConversations?.data?._id) {
      joinConversation();
    }
  }, [dataConversations?._id, joinConversation]);

  const handleClose = () => {
    leaveConversation();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-[10%] right-[2rem] z-50 w-[400px] h-[600px]"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="w-full h-[8%] flex justify-end items-center mb-1!">
          <div
            className="bg-[#8992a4] py-2! px-3! cursor-pointer rounded-full hover:bg-[#333f48] transition-colors"
            onClick={handleClose}
          >
            <CloseOutlined className="text-white!" />
          </div>
        </div>

        <div className="w-full h-[92%] shadow-2xl rounded-md overflow-hidden flex flex-col">
          <div className="w-full bg-[#333f48] p-4! flex flex-col gap-2">
            <div className="text-white text-[22px] font-bold">
              Xin chào 👋🏻
            </div>
            <div className="text-[#ffffffcc] text-[13px]">
              Hãy hỏi bất cứ điều gì hoặc chia sẻ phản hồi của bạn liên quan
              đến SP &amp; DV của NickFashion.
            </div>
          </div>

          <div className="w-full flex-1 bg-white overflow-hidden">
            <Conversation />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatDrawer;
