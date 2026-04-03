import React from "react";
import { Button, Divider, Form, Input, notification, Select } from "antd";
import { useTranslation } from "react-i18next";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services";
import "@/styles/auth/registerPage.scss";
type FieldType = {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  remember?: string;
  gender?: string;
};
const RegisterPage: React.FC = () => {
  const { t, i18n } = useTranslation("translation");
  const navigate = useNavigate();
  const [form] = Form.useForm<FieldType>();
  return (
    <div className="auth-register">
      <div className="auth-background">
        <div className="text-white  flex flex-col !justify-start !items-center w-[50%] title-login ">
          <h2 className="text-4xl font-bold">NICKFASHION</h2>
          <span className="text-[1.5rem] w-[40%] text-center">
            {t("login.description")}
          </span>
        </div>
        <div className="form-container">
          <Form
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            form={form}
          >
            <Form.Item<FieldType>
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
                {
                  pattern:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^\d{10,11}$/,
                  message: "Please enter a valid email or phone number!",
                },
              ]}
            >
              <Input
                placeholder={t("register.name")}
                className="w-[17rem]! h-[2.5rem] text-[1rem]! bg-white!"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                placeholder={t("register.email")}
                className="w-[17rem]! h-[2.5rem] text-[1rem]! bg-white!"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long",
                },
              ]}
              className="!mb-[1.5rem]"
            >
              <Input.Password
                className="w-[17rem]! h-[2.5rem] bg-white! text-[#ccc6c6]!"
                placeholder={t("login.passwordInput")}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                {
                  validator: (_, value) => {
                    if (value !== form.getFieldValue("password")) {
                      return Promise.reject(
                        new Error("Passwords do not match"),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              className="!mb-[1.5rem]"
            >
              <Input.Password
                className="w-[17rem]! h-[2.5rem] bg-white! text-[#ccc6c6]!"
                placeholder={t("register.confirmPassword")}
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="gender"
              rules={[
                { required: true, message: "Please Select your gender!" },
              ]}
              className="!mb-[1.5rem]"
            >
              <Select
                placeholder={t("register.gender")}
                options={[
                  { label: t("register.male"), value: "male" },
                  { label: t("register.female"), value: "female" },
                ]}
                className="w-[17rem]! h-[2.5rem] text-[1rem]! "
              />
            </Form.Item>

            <Form.Item label={null} className="!mb-0">
              <Button
                htmlType="submit"
                className="!w-[17rem] !h-[2.5rem] !bg-[#4780d6] !text-white !border-none"
              >
                {t("login.register")}
              </Button>
            </Form.Item>
          </Form>
          <Divider className="!text-white !border-amber-50 ">or</Divider>
          <div className="">
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
            >
              <GoogleLogin
                text={"signup_with"}
                onSuccess={async (event) => {
                  const { credential } = event;
                  try {
                    const response = await authService.registerGoogle(
                      credential!,
                    );
                    if (response) {
                      notification.success({
                        title: t("login.loginSuccess"),
                        description: response.message,
                      });
                      navigate("/buyer/login");
                    }
                  } catch (error) {
                    console.log("Error Login Google:", error);
                    notification.error({
                      title: t("login.loginFailed"),
                      description: t("login.descriptionLoginFailed"),
                    });
                  }
                }}
                onError={() => {
                  notification.error({
                    title: t("login.loginFailed"),
                    description: t("login.descriptionLoginFailed"),
                  });
                }}
              />
            </GoogleOAuthProvider>
          </div>

          <div className=" text-center !pt-[2rem] text-[1rem]">
            {i18n.language == "vi"
              ? "Bạn đã có tài khoản? "
              : "Do you have an account? "}
            <a href="/buyer/login" className=" !underline">
              {i18n.language == "vi" ? "Đăng nhập" : "Login"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
