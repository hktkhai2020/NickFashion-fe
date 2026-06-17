import { MessageOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useUserStore from "@/store/useUserStore";
import ChatDrawer from "@/components/chat/chatDrawer";
import socketService from "@/lib/socket";
import useGlobal from "@/hooks/useGlobal";
export const ChatButton: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const { api, contextHolder } = useGlobal();
  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      if (!socketService.getSocket()?.connected) {
        socketService.connect();
      }
    }
  };
  if (user?.role === "admin") {
    return null;
  }
  return user && (user.role === "user" || user.role === "customer") ? (
    <div className="fixed bottom-[10%] right-[2rem] z-50">
      {!isOpen && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-[#333f48]/30"
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ margin: "-6px" }}
          />
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative bg-[#333f48] rounded-full p-3! shadow-lg cursor-pointer z-10"
            onClick={handleToggle}
          >
            <MessageOutlined className="text-white! text-[1.5rem]" />
          </motion.div>
        </>
      )}
      {isOpen && <ChatDrawer setIsOpen={setIsOpen} />}
    </div>
  ) : (
    <>
      <div className="fixed bottom-[10%] right-[2rem] z-50">
        {contextHolder}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-[#333f48]/30"
              animate={{
                scale: [1, 1.5],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ margin: "-6px" }}
            />
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative bg-[#333f48] rounded-full p-3! shadow-lg cursor-pointer z-10"
              onClick={() => {
                api.error({
                  message: "Vui lòng đăng nhập để sử dụng chức năng này",
                  description: "Hãy liên hệ cho chúng tôi sau khi đăng nhập",
                });
              }}
            >
              <MessageOutlined className="text-white! text-[1.5rem]" />
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};
