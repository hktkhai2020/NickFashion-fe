import { Routes, Route } from "react-router-dom";
import { BUYER_ROUTES } from "@/constants/routes";
import { LoginPage, RegisterPage, ForgotPasswordPage, NotFoundPage } from "@/pages";
import { AuthLayout } from "@/components/layout";
const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path={BUYER_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={BUYER_ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={BUYER_ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default LoginRoutes;
