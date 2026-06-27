import { BellOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import useNotifications from "@/hooks/useNotification";
import { formatDateTime } from "@/utils";
import OptionNotification from "@/components/notification/user/optionNotification";
import useUserStore from "@/store/useUserStore";

const Notification = () => {
  const {
    dataNotifications,
    fetchNextPage,
    isFetchingNextPage,
    markAllAsReadNotification,
    context,
    _api,
    navigate
   
  } = useNotifications();
  const { user } = useUserStore();
  const allNotifications =
    dataNotifications?.pages.flatMap((p) => p.data.notifications) ?? [];
  const itemNotifications = allNotifications.map((item, index) => {
    return {
      key: index,
      label: (
        <div className="flex gap-3 group " onClick={() => {
          navigate(`/customer/order/${item.relatedId}/detail`);
        }}>
          <div className="flex items-center justify-center">
            <ShoppingOutlined style={{ fontSize: 25, color: "#4d575f" }} />
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
    <div className="notification cursor-pointer flex flex-col items-center">
      {context}
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
          if (!user) {
            return;
          }
          if (!open) {
            markAllAsReadNotification();
          }
        }}
        disabled={user ? false : true}
      >
        {user ? (
          <Badge
            count={allNotifications.reduce(
              (accumulator, currentItem) =>
                !currentItem.isRead ? accumulator + 1 : accumulator,
              0,
            )}
          >
            <BellOutlined
              className="bell-icon"
              style={{ fontSize: 25, color: "#4d575f" }}
            />
          </Badge>
        ) : (
          <BellOutlined
            className="bell-icon"
            style={{ fontSize: 25, color: "#4d575f" }}
            onClick={() => {
              console.log("Cần đăng nhập để sử dụng chức năng này");
              _api.info({
                message: "Vui lòng đăng nhập để sử dụng chức năng này",
                type: "info",
                duration: 22,
              });
            }}
          />
        )}
      </Dropdown>
      <span className="hidden lg:block text-center">Thông báo</span>
    </div>
  );
};
export default Notification;
