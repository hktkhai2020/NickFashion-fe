import React, { useEffect, useCallback } from "react";
import socketService from "@/lib/socket";
import useUserStore from "@/store/useUserStore";

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);

  const connect = useCallback(() => {
    socketService.connect();
  }, []);

  const disconnect = useCallback(() => {
    socketService.disconnect();
  }, []);

  useEffect(() => {
    if (user) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [user, connect, disconnect]);

  return <>{children}</>;
};

export default SocketProvider;
