import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification, Steps } from "antd";
import { useState } from "react";
import { authService } from "@/services";

type FieldType = {
  email?: string;
  otp?: string;
  newPassword?: string;
};

const ForgotPasswordPage: React.FC = () => {
  const { t, i18n } = useTranslation("translation");
  const navigate = useNavigate();
  const [form] = Form.useForm<FieldType>();
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      {contextHolder}
      <div className="auth-login">
        <div className="auth-background">
          <div className="text-white  flex flex-col !justify-start !items-center w-[50%] title-login ">
            <h2 className="text-4xl font-bold">NICKFASHION</h2>
            <span className="text-[1.5rem] w-[40%] text-center">
              {t("login.description")}
            </span>
          </div>
          <div className="form-container">
            {current !== 0 && (
              <div
                className="cursor-pointer bg-[#4780d6] text-white  w-[5rem]  rounded-md text-center !p-1 !mb-[1.5rem]"
                onClick={() => {
                  setCurrent(current - 1);
                  setIsOtpVerified(false);
                  form.resetFields();
                }}
              >
                Quay Lại
              </div>
            )}
            <Steps current={current} className="!hidden" />
            <Form
              name="basic"
              layout="vertical"
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              form={form}
              autoComplete="off"
              requiredMark={false}
            >
              {current === 0 && (
                <>
                  <Form.Item<FieldType>
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        pattern:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email!",
                      },
                    ]}
                  >
                    <Input
                      placeholder={"Email"}
                      className="w-[17rem]! h-[2.5rem] text-[1rem]! bg-white!"
                    />
                  </Form.Item>

                  <Form.Item label={null} className="!mb-0">
                    <Button
                      htmlType="submit"
                      className="!w-[17rem] !h-[2.5rem] !bg-[#4780d6] !text-white !border-none"
                      onClick={async () => {
                        setIsLoading(true);
                        try {
                          const response = await authService.forgotPassword(
                            form.getFieldValue("email"),
                          );
                          if (response) {
                            setIsLoading(false);
                            setCurrent(1);
                            api.success({
                              title: t("forgotPassword.sendOtpSuccess"),
                              description: response.message,
                            });
                          }
                        } catch (error: any) {
                          api.error({
                            title: t("forgotPassword.sendOtpFailed"),
                            description:
                              error?.response?.data?.message ||
                              t("forgotPassword.sendOtpFailed"),
                          });
                        }
                      }}
                      loading={isLoading}
                    >
                      {i18n.language == "vi" ? "Gửi mã" : "Send OTP"}
                    </Button>
                  </Form.Item>
                </>
              )}
              {current === 1 && (
                <>
                  <Form.Item<FieldType>
                    name="otp"
                    rules={[
                      { required: true, message: "Please input your OTP!" },
                    ]}
                  >
                    <Input
                      placeholder="OTP"
                      className="w-[17rem]! h-[2.5rem] text-[1rem]! bg-white!"
                    />
                  </Form.Item>
                  <Form.Item label={null} className="!mb-0">
                    <Button
                      htmlType="submit"
                      className="!w-[17rem] !h-[2.5rem] !bg-[#4780d6] !text-white !border-none"
                      onClick={async () => {
                        setIsLoading(true);
                        try {
                          const response =
                            await authService.verifyOtpForgotPassword(
                              form.getFieldValue("email"),
                              form.getFieldValue("otp"),
                            );
                          if (response) {
                            setIsLoading(false);
                            setCurrent(2);
                           api.success({
                            title: t("forgotPassword.verifyOtpSuccess"),
                            description: response.message,
                           })
                            setIsOtpVerified(true);
                          }
                        } catch (error: any) {
                          api.error({
                            title: t("forgotPassword.verifyOtpFailed"),
                            description:
                              error?.response?.data?.message ||
                              t("forgotPassword.verifyOtpFailed"),
                          });
                          setIsLoading(false);
                        }
                      }}
                      loading={isLoading}
                    >
                      {i18n.language == "vi" ? "Xác nhận" : "Confirm"}
                    </Button>
                  </Form.Item>
                </>
              )}
              {current === 2 && isOtpVerified && (
                <>
                  <Form.Item<FieldType>
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="New Password"
                      className="w-[17rem]! h-[2.5rem] text-[1rem]! bg-white!"
                    />
                  </Form.Item>
                  <Form.Item label={null} className="!mb-0">
                    <Button
                      htmlType="submit"
                      className="!w-[17rem] !h-[2.5rem] !bg-[#4780d6] !text-white !border-none"
                      loading={isLoading}
                      onClick={async () => {
                        setIsLoading(true);
                        try {
                          const response = await authService.resetPassword(
                            form.getFieldValue("email"),
                            form.getFieldValue("otp"),
                            form.getFieldValue("newPassword"),
                          );
                          if (response) {
                            api.success({
                              title: t("forgotPassword.resetPasswordSuccess"),
                              description: response.message,
                            });
                            setIsLoading(false);
                            setCurrent(0);
                            setIsOtpVerified(false);
                            form.resetFields();
                            navigate("/buyer/login");
                          }
                        } catch (error: any) {
                          api.error({
                            title: t("forgotPassword.resetPasswordFailed"),
                            description:
                              error?.response?.data?.message ||
                              t("forgotPassword.resetPasswordFailed"),
                          });
                        }
                      }}
                    >
                      {i18n.language == "vi" ? "Xác nhận" : "Confirm"}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
