import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components/common";
import { ChatButton as ChatButtonComponent } from "@/components/chat";
import useNotifications from "@/hooks/useNotification";
interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {context}=useNotifications();
  return (
    
    <div className="relative min-h-screen flex flex-col ">
      {context}
      <Header />
      <main className="w-full">{children || <Outlet />}</main>
      <Footer />
      <ChatButtonComponent />
    </div>
  );
};

export default MainLayout;
