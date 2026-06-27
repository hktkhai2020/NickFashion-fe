import useUserStore from "@/store/useUserStore";
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatDateTime } from "@/utils/format";
import useAdminNotifications from "@/hooks/useAdminNotification";
import useNotifications from "@/hooks/useNotification";
import { Avatar, Badge, Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services";
import OptionNotification from "@/components/notification/admin/optionNotificationAdmin";
import useCartStore from "@/store/useCartStore";
const HeaderAdmin: React.FC<{
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}> = (props) => {
  const navigate = useNavigate();
  const { setIsSidebarOpen } = props;
  const { removeUser } = useUserStore();
  const { removeCart } = useCartStore();
  const user = useUserStore((state) => state.user);
  const {
    dataNotifications,
    context,
    fetchNextPage,
    isFetchingNextPage,
    markAllAsReadAdmin,
    clearNotifications
  } = useAdminNotifications();
  const {clearNotifications: clearNotificationsUser} = useNotifications();
  const item = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            navigate("/customer/account");
          }}
        >
          Profile
        </div>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: (
        <div
          onClick={async () => {
            await authService.logout();
            removeUser();
            removeCart();
            clearNotifications();
            clearNotificationsUser();
            navigate("/");
          }}
        >
          Logout
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ];
  

  const allNotifications =
    dataNotifications?.pages.flatMap((p) => p.data.notifications) ?? [];
  const itemNotifications = allNotifications.map((item, index) => {
    return {
      key: index,
      label: (
        <div className="flex gap-3 group ">
          <div>
            <img
              src={item.senderId.avatar}
              alt=""
              className="w-[4rem] rounded-[50%] overflow-hidden object-cover"
            />
          </div>
          <div className=" flex flex-col justify-between max-w-[300px]">
            <div className={`${item.isRead ? "text-gray-500" : "text-black"}`}>
              {item.content}
            </div>
            <div className={`${item.isRead ? "text-gray-500" : "text-black"}`}>
              {formatDateTime(item.createdAt)}
            </div>
          </div>
          <div
            className=" flex items-center "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {!item.isRead ? (
              <div className="w-1 h-1 bg-blue-400 p-2! rounded-[50%] flex items-center justify-center group-hover:p-0! group-hover:w-0! group-hover:h-0!  ">
                <OptionNotification notificationId={item._id} index={index} />
              </div>
            ) : (
              <div className="w-1 h-1  p-2!  flex items-center justify-center">
                <OptionNotification notificationId={item._id} index={index} />
              </div>
            )}
          </div>
        </div>
      ),
    };
  });
  itemNotifications?.push({
    key: itemNotifications.length,
    label: (
      <div
        className="flex items-center justify-center py-3!"
        onClick={(e) => {
          e.stopPropagation();
          fetchNextPage();
        }}
      >
        <div className="">
          {isFetchingNextPage ? "Đang tải ..." : "Xem thêm thông tin trước  đó"}
        </div>
      </div>
    ),
  });
  return (
    <header className="header">
      {context}
      <Button
        icon={<MenuOutlined />}
        onClick={() => setIsSidebarOpen(true)}
        className="toggle-sidebar"
      />
      <div className="header-left">
        <SearchOutlined />
        <input type="text" placeholder="Search for something ... " />
      </div>
      <div className="header-right">
        <div className="notification">
          <Dropdown
            placement="bottomCenter"
            trigger={["click"]}
            menu={{
              items: itemNotifications,
              style: {
                maxHeight: "400px",
                overflowY: "auto",
                overflowX: "hidden",
              },
            }}
            onOpenChange={(open) => {
              if (!open) {
                markAllAsReadAdmin();
              }
            }}
          >
            <Badge
              count={allNotifications.reduce(
                (accumulator, currentItem) =>
                  !currentItem.isRead ? accumulator + 1 : accumulator,
                0,
              )}
            >
              <BellOutlined className="bell-icon" />
            </Badge>
          </Dropdown>
        </div>
        <div className="user">
          <Dropdown
            menu={{ items: item }}
            trigger={["click"]}
            placement="bottom"
          >
            <div className="user-info">
              <Avatar
                src={
                  <img
                    draggable={false}
                    src={user?.avatar ? user?.avatar : ""}
                    alt="avatar"
                  />
                }
                size={40}
              />
              <span className="hidden md:block">
                {user?.name ? user?.name : "Nguyễn Băng Băng"}
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
