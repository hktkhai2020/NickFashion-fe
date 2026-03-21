import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAuth from "@/components/common/header.auth";
interface AuthLayoutProps {
  children?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderAuth />
      {children || <Outlet />}
    </>
  );
};

export default AuthLayout;
