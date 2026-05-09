import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Badge, Breadcrumb, Image, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useUserStore from "@/store/useUserStore";
import { formatDate } from "@/utils";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { authService } from "@/services";
import useGlobal from "@/hooks/useGlobal";
import useCartStore from "@/store/useCartStore";
import { ROUTES } from "@/constants";
import uploadService from "@/services/uploadService";
import userService from "@/services/userService";
const CustomerLayout = () => {
  const { api, contextHolder } = useGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const removeCart = useCartStore((state) => state.removeCart);
  const setUser = useUserStore((state) => state.setUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  return (
    <>
      <div className="w-full lg:px-[6rem]! px-[1rem]!">
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
        <div className="flex gap-[2rem]! lg:flex-row flex-col ">
          <div className="lg:w-[30%]! w-full! p-[1rem]! border-[1px] border-[#e5eaf0] rounded-1!  flex flex-col gap-[1rem]!">
            {/* account image and name and */}
            <div className="w-full flex flex-col gap-3 p-[1rem]! bg-linear-to-r from-[#61a678] to-[#73b863]">
              <div className="w-full flex justify-center">
                <div
                  className="w-20! h-20! rounded-full! object-cover! overflow-hidden! cursor-pointer relative group"
                  onClick={() => setIsOpenAvatar(true)}
                >
                  <Image
                    src={
                      user?.avatar ||
                      "https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/images/avatar/13579866.png"
                    }
                    preview={false}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <PlusOutlined style={{ color: "white", fontSize: 20 }} />
                  </div>
                </div>
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
            <div
              className="w-full flex items-center justify-between group cursor-pointer border-b-[1px] border-[#e5eaf0] pb-[1rem]!"
              onClick={() => {
                navigate(ROUTES.PROFILE);
              }}
            >
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
            <div
              onClick={() => {
                navigate(ROUTES.ORDER_HISTORY);
              }}
              className="w-full flex items-center justify-between group cursor-pointer border-b-[1px] border-[#e5eaf0] pb-[1rem]!"
            >
              <div>
                <Badge dot={true}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M5.52 2.64L3.96 4.72c-.309.412-.463.618-.46.79a.5.5 0 00.192.384C3.828 6 4.085 6 4.6 6h14.8c.515 0 .773 0 .908-.106a.5.5 0 00.192-.384c.003-.172-.151-.378-.46-.79l-1.56-2.08m-12.96 0c.176-.235.264-.352.376-.437a1 1 0 01.33-.165C6.36 2 6.505 2 6.8 2h10.4c.293 0 .44 0 .575.038a1 1 0 01.33.165c.111.085.199.202.375.437m-12.96 0L3.64 5.147c-.237.316-.356.475-.44.649a2 2 0 00-.163.487C3 6.473 3 6.671 3 7.067V18.8c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C4.52 22 5.08 22 6.2 22h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C21 20.48 21 19.92 21 18.8V7.067c0-.396 0-.594-.037-.784a1.998 1.998 0 00-.163-.487c-.084-.174-.203-.333-.44-.65L18.48 2.64M16 10a4 4 0 11-8 0"
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
                    Đơn hàng
                  </span>
                  <span className="text-[#da291c] p-[2px]! bg-[#fceae9] text-[11px] font-bold">
                    cập nhật ngay
                  </span>
                </div>
                <div className="text-[#c8e5c7]">Tra cứu thông tin đơn hàng</div>
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
      <Modal
        title="Cập nhật ảnh đại diện"
        open={isOpenAvatar}
        onCancel={() => {
          setIsOpenAvatar(false);
          setSelectedFile(null);
          setPreviewImage("");
        }}
        footer={null}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#e5eaf0]">
            <Image
              src={
                previewImage ||
                user?.avatar ||
                "https://nickfashion-db.s3.ap-southeast-1.amazonaws.com/images/avatar/13579866.png"
              }
              preview={false}
            />
          </div>
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              const url = URL.createObjectURL(file);
              setPreviewImage(url);
              setSelectedFile(file);
              return false;
            }}
          >
            <div className="px-4 py-2 border border-[#e5eaf0] rounded cursor-pointer hover:bg-[#f5f5f5] transition-colors">
              Chọn ảnh mới
            </div>
          </Upload>
          {selectedFile && (
            <button
              className="w-full py-2 bg-[#61a678] text-white font-semibold rounded hover:bg-[#4f8c62] transition-colors disabled:opacity-50"
              disabled={uploading}
              onClick={async () => {
                if (!user?._id || !selectedFile) return;
                setUploading(true);
                try {
                  const uploadRes = await uploadService.uploadSingle(
                    selectedFile,
                    "avatar",
                  );
                  if (uploadRes.success) {
                    const updateRes = await userService.updateImageUser(
                      user._id,
                      { avatarUrl: uploadRes.data.url },
                    );
                    if (updateRes.success && updateRes.data) {
                      setUser(updateRes.data);
                      api.success({
                        message: "Cập nhật ảnh đại diện thành công",
                      });
                      setIsOpenAvatar(false);
                      setSelectedFile(null);
                      setPreviewImage("");
                    }
                  }
                } catch {
                  api.error({ message: "Cập nhật ảnh đại diện thất bại" });
                } finally {
                  setUploading(false);
                }
              }}
            >
              {uploading ? "Đang tải lên..." : "Xác nhận"}
            </button>
          )}
        </div>
      </Modal>
      {contextHolder}
    </>
  );
};

export default CustomerLayout;
