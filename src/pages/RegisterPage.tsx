import React, { useRef, useState } from "react";
import { Button, Divider, Form, Input, notification, Select, Spin } from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { authService, cartService } from "@/services";
import "@/styles/auth/registerPage.scss";
import type { FormProps } from "antd";
import { motion } from "framer-motion";
import useUserStore from "@/store/useUserStore";
import useCartStore from "@/store/useCartStore";
import { User } from "@/types";
type FieldType = {
  otp?: string;
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
  const { setUser } = useUserStore();
  const { setCart } = useCartStore();
  const [form] = Form.useForm<FieldType>();
  const [api, contextHolder] = notification.useNotification();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [showInputOtp, setShowInputOtp] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      if (!allowSubmit) {
        api.error({
          message: t("register.registerFailed"),
          description: t("register.otpVerifyFailed"),
        });
        return;
      }
      const response = await authService.register({
        name: values.username!,
        email: values.email!,
        password: values.password!,
        gender: values.gender as "male" | "female",
      });
      if (response) {
        api.success({
          message: t("register.registerSuccess"),
          description: response.message,
        });
        navigate("/buyer/login");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        t("register.descriptionRegisterFailed");

      const description =
        errorMessage === "Email already exists"
          ? t("register.emailAlreadyExists")
          : t("register.descriptionRegisterFailed");

      api.error({
        message: t("register.registerFailed"),
        description,
      });
    }
  };
  return (
    <>
      {contextHolder}
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
              onFinish={onFinish}
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
                    min: 2,
                    message: "Username must be at least 2 characters long",
                  },
                  {
                    max: 100,
                    message: "Username must be at most 100 characters long",
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
                  {
                    validator: async (_, value) => {
                      if (
                        !value ||
                        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          value,
                        )
                      ) {
                        return Promise.resolve();
                      }

                      return new Promise((resolve, reject) => {
                        if (timerRef.current) clearTimeout(timerRef.current);

                        timerRef.current = setTimeout(async () => {
                          try {
                            const response = await authService.checkEmail(
                              value as string,
                            );
                            if (response.exists) {
                              setIsEmailValid(false);
                              reject(new Error(response.message));
                            } else {
                              setIsEmailValid(true);
                              resolve(undefined);
                            }
                          } catch {
                            resolve(undefined);
                          }
                        }, 500);
                      });
                    },
                  },
                ]}
              >
                <Input
                  placeholder={t("register.email")}
                  className="w-[17rem]! h-[2.5rem] text-[1rem]! bg-white!"
                  suffix={
                    <Button
                      size="small"
                      type="link"
                      disabled={!isEmailValid || otpCountdown > 0}
                      className="!text-[#4780d6] !text-[0.75rem] !p-0 !h-auto"
                      onClick={async () => {
                        const email = form.getFieldValue("email");
                        try {
                          setOtpCountdown(60);
                          await authService.sendVerifyEmail(email);
                          api.success({
                            message: t("register.otpSent"),
                            description: t("register.descriptionOtpSent"),
                          });
                          setShowInputOtp(true);
                          const interval = setInterval(() => {
                            setOtpCountdown((prev) => {
                              if (prev <= 1) {
                                clearInterval(interval);
                                return 0;
                              }
                              return prev - 1;
                            });
                          }, 1000);
                        } catch (error: any) {
                          setOtpCountdown(0);
                          api.error({
                            message:
                              error?.response?.data?.message ||
                              t("register.otpSendFailed"),
                          });
                        }
                      }}
                    >
                      {otpCountdown > 0
                        ? `${otpCountdown}s`
                        : t("register.getOtp")}
                    </Button>
                  }
                />
              </Form.Item>

              {showInputOtp && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Form.Item<FieldType>
                    name="otp"
                    rules={[
                      { required: true, message: "Please input your OTP!" },
                      {
                        pattern: /^\d{6}$/,
                        message: "Please enter a valid OTP!",
                      },
                    ]}
                    className="!mb-[1.5rem]"
                  >
                    <Input
                      className="w-[17rem]! h-[2.5rem] bg-white! text-[#ccc6c6]!"
                      placeholder={t("register.otp")}
                      onChange={(e) => {
                        const email = form.getFieldValue("email");
                        return new Promise((resolve, reject) => {
                          if (timerRef.current) {
                            clearTimeout(timerRef.current);
                            setIsOtpVerified(false);
                            setAllowSubmit(false);
                            setIsOtpLoading(true);
                          }

                          timerRef.current = setTimeout(async () => {
                            try {
                              const response = await authService.verifyEmail(
                                email as string,
                                e.target.value,
                              );
                              if (response.success) {
                                setIsOtpLoading(false);
                                setIsOtpVerified(true);
                                setAllowSubmit(true);
                                resolve(undefined);
                              } else {
                                reject(new Error(response.message));
                              }
                            } catch {
                              reject(new Error(t("register.otpVerifyFailed")));
                            }
                          }, 500);
                        });
                      }}
                      suffix={
                        isOtpVerified ? (
                          <CheckCircleOutlined className="!text-green-500" />
                        ) : isOtpLoading ? (
                          <Spin
                            indicator={<LoadingOutlined spin />}
                            size="small"
                          />
                        ) : null
                      }
                    />
                  </Form.Item>
                </motion.div>
              )}
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
                  onClick={() => {
                    form.submit();
                  }}
                >
                  {t("login.register")}
                </Button>
              </Form.Item>
            </Form>
            <Divider className="!text-white !border-amber-50 ">or</Divider>
            {/* Sign up with Google */}
            <div className="">
            <GoogleOAuthProvider
                clientId={
                  import.meta.env.VITE_GOOGLE_CLIENT_ID
                }
              >
                <GoogleLogin
                  onSuccess={async (event) => {
                    const { credential } = event;
                    try {
                      const response = await authService.loginGoogle(
                        credential!,
                      );
                      const cartResponse = await cartService.getCart(response.user._id);
                      if (cartResponse) {
                        setCart(cartResponse.data);
                      }
                      if (response) {
                        api.success({
                          message: t("login.loginSuccess"),
                          description: response.message,
                        });
                        localStorage.setItem(
                          "accessToken",
                          response.accessToken,
                        );
                        setUser(response.user as unknown as User);
                        if (response.user.role === "admin") {
                          navigate("/admin/dashboard");
                        } else {
                          navigate("/");
                        }
                      }
                    } catch (error) {
                      console.log("Error Login Google:", error);
                      api.error({
                        message: t("login.loginFailed"),
                        description: t("login.descriptionLoginFailed"),
                      });
                    }
                  }}
                  onError={() => {
                    api.error({
                      message: t("login.loginFailed"),
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
    </>
  );
};

export default RegisterPage;
