import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AppRoutes, AdminRoutes, LoginRoutes } from "@/routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/nickfashion" element={<AppRoutes />} />
          <Route path="/buyer/*" element={<LoginRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
