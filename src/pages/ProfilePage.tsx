import React, { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";
import { DatePicker, Form, Input, Select, message } from "antd";
import { t } from "i18next";
import { userService } from "@/services/userService";
import { formatDate } from "@/utils";
import dayjs from "dayjs";
type FieldType = {
  name?: string;
  gender?: string;
  phone?: string;
  email?: string;
  dateOfBirth?: string;
  address?: string;
};
const ProfilePage: React.FC = () => {
  const { user ,setUser} = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm<FieldType>();
  const [isFieldsValidating, setIsFieldsValidating] = useState(false);
  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      gender: user?.gender,
      phone: user?.phone,
      email: user?.email,
      dateOfBirth: user?.dateOfBirth,
      address: user?.address,
    });
  }, [user]);
  return (
    <div className="w-[70%]! border-[1px] border-[#e5eaf0] rounded-1! p-[2rem]!">
      {contextHolder}
      <div className="w-full flex flex-col gap-[1rem]">
        <h1 className="text-[24px] font-bold  text-[#333f48]">
          THÔNG TIN TÀI KHOẢN
        </h1>
        <div className="text-[#333f48] text-[15px]">
          Cập nhật thông tin cá nhân để hoàn tất thông tin tài khoản tại
          NickFashion
        </div>

        {!isEditing ? (
          <>
            <div className="flex gap-[1rem]  text-[15px] text-[#74869b]">
              <span>Họ và tên:</span>{" "}
              <span className="text-[#333f48]">{user?.name || "-"}</span>
            </div>

            <div className="flex gap-[1rem]  text-[15px] text-[#74869b]">
              <span>Giới tính:</span>{" "}
              <span className="text-[#333f48]">{user?.gender || "-"}</span>
            </div>

            <div className="flex gap-[1rem]  text-[15px] text-[#74869b]">
              <span>Số điện thoại:</span>{" "}
              <span className="text-[#333f48]">{user?.phone || "-"}</span>
            </div>

            <div className="flex gap-[1rem]  text-[15px] text-[#74869b]">
              <span>Email:</span>{" "}
              <span className="text-[#333f48]">{user?.email || "-"}</span>
            </div>

            <div className="flex gap-[1rem]  text-[15px] text-[#74869b]">
              <span>Ngày sinh:</span>{" "}
              <span className="text-[#333f48]">
                {formatDate(user?.dateOfBirth || "-")}
              </span>
            </div>

            <div className="flex gap-[1rem]  text-[15px] text-[#74869b]">
              <span>Địa chỉ:</span>{" "}
              <span className="text-[#333f48]">{user?.address || "-"}</span>
            </div>

            <div
              className="w-[175px] flex gap-2 items-center justify-center px-[6px]! py-[12px]! border-1! border-[black]  cursor-pointer"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <div className="text-[#333f48]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  fill="none"
                >
                  <path
                    d="M9.164 3.834h-3.5c-1.4 0-2.1 0-2.635.273a2.5 2.5 0 00-1.092 1.092c-.273.535-.273 1.235-.273 2.635v7c0 1.4 0 2.1.273 2.635a2.5 2.5 0 001.092 1.093c.535.272 1.235.272 2.635.272h7c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 001.093-1.093c.272-.535.272-1.235.272-2.635v-3.5m-10 2.5h1.395c.408 0 .612 0 .804-.046.17-.04.332-.108.482-.2.168-.102.312-.247.6-.535l7.97-7.969a1.768 1.768 0 00-2.5-2.5l-7.97 7.97c-.288.287-.432.431-.535.6-.092.149-.16.311-.2.482-.046.191-.046.395-.046.803v1.395z"
                    stroke="#333F48"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="text-[#333f48] text-[15px] font-bold">
                Sửa thông tin
              </div>
            </div>
          </>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onValuesChange={(_, allFields) => {
              const requiredFields: (keyof FieldType)[] = [
                "name",
                "gender",
                "phone",
                "email",
                "dateOfBirth",
                "address",
              ];
              console.log(allFields);
              const allRequiredFilled = requiredFields.every(
                (field) =>
                  allFields[field] && String(allFields[field]).trim() !== "",
              );
              if (allRequiredFilled) {
                setTimeout(() => {
                  setIsFieldsValidating(true);
                }, 1000);
              } else {
                setTimeout(() => {
                  setIsFieldsValidating(false);
                }, 1000);
              }
            }}
            className="lg:w-[50%] w-full"
          >
            <Form.Item<FieldType>
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <div className="flex flex-col ">
                <span className="text-[#333f48] text-[15px]! mb-[5px]! font-bold!">
                  Họ và tên
                </span>
                <Input
                  defaultValue={user?.name}
                  type="text"
                  placeholder="Nhập họ và tên"
                  className=" border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! text-[15px]! "
                />
              </div>
            </Form.Item>

            <span className="text-[#333f48] text-[15px]! mb-[5px]! font-bold! block">
              Giới tính
            </span>
            <Form.Item<FieldType>
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Select
                defaultValue={user?.gender}
                placeholder={t("register.gender")}
                options={[
                  { label: t("register.male"), value: "male" },
                  { label: t("register.female"), value: "female" },
                ]}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <div className="flex flex-col ">
                <span className="text-[#333f48] text-[15px]! mb-[5px]! font-bold!">
                  Số điện thoại
                </span>
                <Input
                  defaultValue={user?.phone}
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! text-[15px]! "
                />
              </div>
            </Form.Item>

            <Form.Item<FieldType>
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <div className="flex flex-col ">
                <span className="text-[#333f48] text-[15px]! mb-[5px]! font-bold!">
                  Email
                </span>
                <Input
                  defaultValue={user?.email}
                  type="text"
                  placeholder="Nhập email"
                  className=" border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! text-[15px]! "
                  disabled
                />
              </div>
            </Form.Item>

            <Form.Item<FieldType>
              name="dateOfBirth"
              rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
            >
              <div className="flex flex-col ">
                <span className="text-[#333f48] text-[15px]! mb-[5px]! font-bold!">
                  Ngày sinh
                </span>
                <DatePicker
                  defaultValue={dayjs(user?.dateOfBirth, "YYYY/MM/DD")}
                  format={"YYYY/MM/DD"}
                  onChange={(date) => {
                    const newDate = date?.toISOString() || "";
                    form.setFieldValue("dateOfBirth", newDate);
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item<FieldType>
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <div className="flex flex-col ">
                <span className="text-[#333f48] text-[15px]! mb-[5px]! font-bold!">
                  Địa chỉ
                </span>
                <Input
                  defaultValue={user?.address}
                  type="text"
                  placeholder="Nhập địa chỉ"
                  className=" border border-[#a6b5c4] pl-[10px]! py-[5px]! outline-none rounded-[4px]! text-[15px]! "
                />
              </div>
            </Form.Item>
            <div className="w-full flex gap-[1rem]">
              <div className="w-[70%]">
                <button
                  className={`w-full h-[40px]   text-[15px] font-bold border border-[#a6b5c4] rounded-[4px]!  ${isFieldsValidating ? " bg-[#da291c] cursor-pointer text-[#ffffff] " : "bg-[#f3f5f6] cursor-not-allowed text-[#a6b5c4]"}`}
                  onClick={async () => {
                    if (isFieldsValidating) {
                      try {
                        const res = await userService.updateProfile({
                          userId: user?._id,
                          name: form.getFieldValue("name"),
                          gender: form.getFieldValue("gender"),
                          phone: form.getFieldValue("phone"),
                          email: form.getFieldValue("email"),
                          dateOfBirth: form.getFieldValue("dateOfBirth"),
                          address: form.getFieldValue("address"),
                        });
                        api.success("Cập nhật thông tin thành công");
                        setUser(res.data);
                        setIsEditing(false);
                      } catch (error: any) {
                        api.success(error.response.data.message);
                        console.error(error);
                      }
                    }
                  }}
                >
                  THANH TOÁN
                </button>
              </div>
              <div className="w-[30%] flex items-center justify-between">
                <button
                  className=" cursor-pointer border border-black w-full h-[40px] flex items-center justify-center  text-[#333f48] text-[15px] font-bold rounded-[4px]"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  HỦY
                </button>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
