import React from "react";
import { Outlet } from "react-router-dom";
import { FooterAuth, HeaderAuth } from "@/components/common";
interface AuthLayoutProps {
  children?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderAuth />
      {children || <Outlet />}
      <FooterAuth />
    </>
  );
};

export default AuthLayout;
