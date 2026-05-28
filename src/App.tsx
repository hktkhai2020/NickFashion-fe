import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import enUS from "antd/locale/en_US";
import { AppRoutes, AdminRoutes, AuthRoutes } from "@/routes";
import useAuthInit from "@/hooks/useAuthInit";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckoutPage, NotFoundPage } from "@/pages";
import { QueryProvider } from "@/providers/queryProvider";
function App() {
  const { loading } = useAuthInit();

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Flex>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
      locale={enUS}
    >
      <AntApp>
        <QueryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<AppRoutes />} />
              <Route path="/buyer/*" element={<AuthRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </QueryProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
