import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Badge, Breadcrumb, Modal } from "antd";
import useUserStore from "@/store/useUserStore";
import { formatDate } from "@/utils";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { authService } from "@/services";
import useGlobal from "@/hooks/useGlobal";
import useCartStore from "@/store/useCartStore";
import { ROUTES } from "@/constants";
const CustomerLayout = () => {
  const { api, contextHolder } = useGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const removeCart = useCartStore((state) => state.removeCart);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full px-[6rem]!">
        <div className="w-full pb-[2rem]!">
          <Breadcrumb
            items={[
              {
                title: <Link to={"/nickfashion"}>Trang chủ</Link>,
              },
              {
                title: <Link to={"/nickfashion/customer"}>Tài khoản</Link>,
              },

              {
                title: (
                  <>
                    {location.pathname.split("/").pop() === "account"
                      ? "Thông tin tài khoản"
                      : location.pathname.split("/").pop() === "orders"
                        ? "Mã ưu đãi"
                        : location.pathname.split("/").pop() === "wishlist"
                          ? "Đơn hàng"
                          : location.pathname.split("/").pop() === "contact"
                            ? "Liên hệ"
                            : ""}
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="flex gap-[2rem]! ">
          <div className="w-[30%]! p-[1rem]! border-[1px] border-[#e5eaf0] rounded-1!  flex flex-col gap-[1rem]!">
            {/* account image and name and */}
            <div className="w-full flex flex-col gap-3 p-[1rem]! bg-linear-to-r from-[#61a678] to-[#73b863]">
              <div className="w-full flex justify-center">
                <img
                  src={user?.avatar || "https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/images/avatar/13579866.png"}
                  alt=""
                  className="w-20! h-20! rounded-full!"
                />
              </div>
              <div>
                <span className="text-[#c8e5c7]">Xin chào! </span>
                <span className="font-semibold! text-white!">{user?.name}</span>
              </div>
              <div>
                <span className="text-[#c8e5c7]">Tài khoản được tạo vào: </span>
                <span className="font-semibold! text-white!">
                  {user?.createdAt && formatDate(user.createdAt)}
                </span>
              </div>
            </div>
            {/* account info */}
            <div className="w-full flex items-center justify-between group cursor-pointer border-b-[1px] border-[#e5eaf0] pb-[1rem]!" onClick={() => {
              navigate(ROUTES.PROFILE);
            }}>
              <div>
                <Badge dot={true}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M9 15.5H7.5c-1.396 0-2.093 0-2.661.172a4 4 0 00-2.667 2.667C2 18.907 2 19.604 2 21M14.5 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM11 21l3.101-.886c.149-.043.223-.064.292-.096a.998.998 0 00.175-.102c.061-.045.116-.1.225-.21l6.457-6.456a1.768 1.768 0 10-2.5-2.5l-6.457 6.457a2.12 2.12 0 00-.209.225.998.998 0 00-.102.175 2.07 2.07 0 00-.096.292L11 21z"
                      stroke="#333F48"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Badge>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-1 items-center">
                  <span className="text-[#333f48] text-[15px] font-bold">
                    Thông tin tài khoản
                  </span>
                  <span className="text-[#da291c] p-[2px]! bg-[#fceae9] text-[11px] font-bold">
                    cập nhật ngay
                  </span>
                </div>
                <div className="text-[#c8e5c7]">
                  Cập nhật thông tin tài khoản
                </div>
              </div>
              <div className="text-[#da291c] group-hover:translate-x-[10px] duration-300 transition-all ease-in-out cursor-pointer">
                <ArrowRightOutlined />
              </div>
            </div>
            {/* Order history */}
            <div className="w-full flex items-center justify-between group cursor-pointer border-b-[1px] border-[#e5eaf0] pb-[1rem]!">
              <div>
                <Badge dot={true}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M9 15.5H7.5c-1.396 0-2.093 0-2.661.172a4 4 0 00-2.667 2.667C2 18.907 2 19.604 2 21M14.5 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM11 21l3.101-.886c.149-.043.223-.064.292-.096a.998.998 0 00.175-.102c.061-.045.116-.1.225-.21l6.457-6.456a1.768 1.768 0 10-2.5-2.5l-6.457 6.457a2.12 2.12 0 00-.209.225.998.998 0 00-.102.175 2.07 2.07 0 00-.096.292L11 21z"
                      stroke="#333F48"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Badge>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-1 items-center">
                  <span className="text-[#333f48] text-[15px] font-bold">
                    Thông tin tài khoản
                  </span>
                  <span className="text-[#da291c] p-[2px]! bg-[#fceae9] text-[11px] font-bold">
                    cập nhật ngay
                  </span>
                </div>
                <div className="text-[#c8e5c7]">
                  Cập nhật thông tin tài khoản
                </div>
              </div>
              <div className="text-[#da291c] group-hover:translate-x-[10px] duration-300 transition-all ease-in-out cursor-pointer">
                <ArrowRightOutlined />
              </div>
            </div>
            {/*  Logout*/}
            <div
              className="w-full flex items-center justify-between group cursor-pointer border-b-[1px] border-[#e5eaf0] pb-[1rem]!"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    d="M16 17l5-5m0 0l-5-5m5 5H9m0-9H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C5.28 21 6.12 21 7.8 21H9"
                    stroke="#333F48"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-1 items-center">
                  <span className="text-[#333f48] text-[15px] font-bold">
                    Đăng xuất
                  </span>
                </div>
              </div>
              <div className="text-[#da291c] group-hover:translate-x-[10px] duration-300 transition-all ease-in-out cursor-pointer">
                <ArrowRightOutlined />
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <Modal
        title="Đăng xuất"
        styles={{
          header: {
            display: "flex",
            justifyContent: "center",
          },
        }}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        footer={
          <div className="w-full flex gap-3">
            <div
              className="w-1/2 py-[13px]! text-[15px] text-[#333f48] border-[1px] border-[#e5eaf0] font-bold text-center cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <span>Hủy bỏ</span>
            </div>
            <div
              className="w-1/2 py-[13px]! text-[15px] text-white bg-[#da291c] font-bold text-center cursor-pointer"
              onClick={async () => {
                try {
                  const responseLogout = await authService.logout();
                  if (responseLogout) {
                    api.success({
                      message: "Đăng xuất thành công",
                    });
                    removeUser();
                    removeCart();
                    setTimeout(() => {
                      navigate("/nickfashion");
                    }, 1500);
                    setIsOpen(false);
                  } else {
                    api.error(responseLogout.message);
                  }
                } catch (error: any) {
                  console.error(error.response.data.message);
                  setIsOpen(false);
                }
              }}
            >
              <span>Xác nhận</span>
            </div>
          </div>
        }
        onCancel={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center">
          <span className="text-[#333f48] text-[16px]  text-center">
            Bạn có chắc muốn đăng xuất không?
          </span>
        </div>
      </Modal>
      {contextHolder}
    </>
  );
};

export default CustomerLayout;
