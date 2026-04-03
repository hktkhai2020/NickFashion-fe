import React from "react";
import "styles/auth/loginPage.scss";
import { Button, Form, Input, Divider, notification } from "antd";
import type { FormProps } from "antd";
import { useTranslation } from "react-i18next";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { authService } from "@/services";
import { useNavigate } from "react-router-dom";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("translation");
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const { username, password } = values;

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const payload = emailPattern.test(username!)
        ? { email: username, password: password! }
        : { phone: username, password: password! };

      const response = await authService.login(payload);
      if (response) {
        notification.success({
          title: t("login.loginSuccess"),
          description: response.message,
        });
        navigate("/nickfashion");
      }
    } catch (error) {
      console.log("Error Login:", error);
      notification.error({
        title: t("login.loginFailed"),
        description: t("login.descriptionLoginFailed"),
      });
    }
  };
  const onFinishFailed = () => {};
  return (
    <div className="auth-login">
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
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
                placeholder={t("login.nameInput")}
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
              className="!mb-2"
            >
              <Input.Password
                className="w-[17rem]! h-[2.5rem] bg-white! text-[#ccc6c6]!"
                placeholder={t("login.passwordInput")}
              />
            </Form.Item>
            <div className=" !mb-2 text-right  ">
              <a href="" className="!text-white !underline">
                {t("login.forget")}
              </a>
            </div>
            <Form.Item label={null} className="!mb-0">
              <Button
                htmlType="submit"
                className="!w-[17rem] !h-[2.5rem] !bg-[#4780d6] !text-white !border-none"
              >
                {t("login.signIn")}
              </Button>
            </Form.Item>
          </Form>
          <Divider className="!text-white !border-amber-50 ">or</Divider>
          <div className="">
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
            >
              <GoogleLogin
                onSuccess={async (event) => {
                  const { credential } = event;
                  try {
                    const response = await authService.loginGoogle(credential!);
                    if (response) {
                      notification.success({
                        title: t("login.loginSuccess"),
                        description: response.message,
                      });
                      navigate("/nickfashion");
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
              ? "Bạn chưa có tài khoản? "
              : "Are you new? "}
            <a href="/buyer/register" className=" !underline">
              {i18n.language == "vi" ? "Tạo tài khoản" : "Create an Account"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
