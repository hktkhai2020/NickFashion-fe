import { Routes, Route } from "react-router-dom";
import { BUYER_ROUTES } from "@/constants/routes";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { AuthLayout } from "@/components/layout";
const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path={BUYER_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={BUYER_ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default LoginRoutes;
